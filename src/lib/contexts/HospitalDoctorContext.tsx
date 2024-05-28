import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "../utils/cookies";
import { useUserData } from "./UserContext";
import { getHospitalListByUserId, getHosptialDetails } from "../apis/hospital";
import { hitRefreshToken } from "../apis/user";
import { Doctor, Hospital } from "../utils/types";
import { getDoctorListByHospitalId } from "../apis/doctor";
import { getRouteSegment } from "../utils/funcs";
import { useNavigate } from "react-router-dom";
import moment from "moment";

interface HospDocDataContextInterface {
  hospitalID: string | undefined;
  setHospitalID: React.Dispatch<React.SetStateAction<string>>;
  allHospData: Hospital[] | undefined;
  setAllHospData: React.Dispatch<React.SetStateAction<Hospital[] | undefined>>;
  hospData: Hospital | undefined;
  setHospData: React.Dispatch<React.SetStateAction<Hospital | undefined>>;
  allDoctorsData: Doctor[] | undefined;
  setAllDoctorsData: React.Dispatch<React.SetStateAction<Doctor[] | undefined>>;
  doctors: Doctor[] | undefined;
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[] | undefined>>;
  docDetails: Doctor | undefined;
  setDocDetails: React.Dispatch<React.SetStateAction<Doctor | undefined>>;
}

export const HospDocDataContext = createContext(
  {} as HospDocDataContextInterface
);

type HospDocDataProviderProps = {
  children?: React.ReactNode;
};

const HospDocContext = ({ children }: HospDocDataProviderProps) => {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  const hospital_id = getRouteSegment(1);
  const { userData } = useUserData();

  const [hospitalID, setHospitalID] = useState<string>(hospital_id);
  const [allHospData, setAllHospData] = useState<Hospital[]>();
  const [hospData, setHospData] = useState<Hospital>();
  const [allDoctorsData, setAllDoctorsData] = useState<Doctor[]>();
  const [doctors, setDoctors] = useState<Doctor[]>();
  const [docDetails, setDocDetails] = useState<Doctor>();

  useEffect(() => {
    const fetchHospDocData = async () => {
      setHospitalID(hospital_id);
      if (accessToken && refreshToken && userData) {
        const all_hosp_data = await getHospitalListByUserId(userData.user_id);
        if (all_hosp_data?.status === 200) {
          setAllHospData(all_hosp_data.data.result);

          if (hospitalID) {
            const hosp_data = await getHosptialDetails(hospitalID);

            if (hosp_data?.status === 200) {
              setHospData(hosp_data.data.result);
              const doc_data = await getDoctorListByHospitalId(hospitalID);
              if (doc_data?.status === 200) {
                const docs: Doctor[] = doc_data.data.result;
                setAllDoctorsData(
                  docs?.sort(
                    (a, b) =>
                      moment(a.created_at).valueOf() -
                      moment(b.created_at).valueOf()
                  )
                );
              }
            }
          }
        } else if (all_hosp_data?.status === 401) {
          const refresh_data = await hitRefreshToken(accessToken, refreshToken);
          if (refresh_data?.status === 200) {
            console.log("Refresh");
            setCookie("accessToken", refresh_data.data.result.access_token, 30);
            setCookie(
              "refreshToken",
              refresh_data.data.result.refresh_token,
              30
            );
            const all_hosp_data = await getHospitalListByUserId(
              userData.user_id
            );
            if (all_hosp_data?.status === 200) {
              setAllHospData(all_hosp_data.data.result);
              const hosp_data = await getHosptialDetails(hospitalID);
              if (hosp_data?.status === 200) setHospData(hosp_data.data.result);
              const doc_data = await getDoctorListByHospitalId(hospitalID);
              if (doc_data?.status === 200) {
                const docs: Doctor[] = doc_data.data.result;
                setAllDoctorsData(
                  docs?.sort(
                    (a, b) =>
                      moment(a.created_at).valueOf() -
                      moment(b.created_at).valueOf()
                  )
                );
              }
            }
          }
        }
      } else if (userData === undefined) {
        setAllHospData(undefined);
        setHospData(undefined);
        setAllDoctorsData(undefined);
      }
    };

    fetchHospDocData();
  }, [, accessToken, refreshToken, userData, hospital_id, navigate]);

  return (
    <HospDocDataContext.Provider
      value={{
        hospitalID,
        setHospitalID,
        allHospData,
        setAllHospData,
        hospData,
        setHospData,
        allDoctorsData,
        setAllDoctorsData,
        doctors,
        setDoctors,
        docDetails,
        setDocDetails,
      }}
    >
      {children}
    </HospDocDataContext.Provider>
  );
};

export function useHospDocData() {
  return useContext(HospDocDataContext);
}

export default HospDocContext;
