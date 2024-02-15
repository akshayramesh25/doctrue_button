import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DocProfileData,
  HospitalProfileData,
  LoginData,
  QueueData,
} from "./types";
import { toast } from "react-toastify";
import {
  getDoctorListByHospitalId,
  getHosptialDetails,
  hitRefreshToken,
  hosptialLogin,
} from "./apis";
import moment from "moment";
import { deleteCookie, getCookie, setCookie } from "./funcs";

interface DataContextInterface {
  handleLogin: ({ email, password }: LoginData, event: any) => Promise<void>;
  hospitalID: number;
  accessToken: string;
  refreshToken: string;
  handleLogout: () => Promise<any>;
  hospData: HospitalProfileData | undefined;
  setHospData: React.Dispatch<
    React.SetStateAction<HospitalProfileData | undefined>
  >;
  doctorsData: Array<DocProfileData> | undefined;
  setDoctorsData: React.Dispatch<
    React.SetStateAction<DocProfileData[] | undefined>
  >;
  docDetails: DocProfileData | undefined;
  setDocDetails: React.Dispatch<
    React.SetStateAction<DocProfileData | undefined>
  >;
  inClinicData: Array<QueueData> | undefined;
  setInClinicData: React.Dispatch<
    React.SetStateAction<QueueData[] | undefined>
  >;
  bookedData: Array<QueueData> | undefined;
  setBookedData: React.Dispatch<React.SetStateAction<QueueData[] | undefined>>;
  index: number | undefined;
  setIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  SelectedDate: string | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = createContext({} as DataContextInterface);

type DataProviderProps = {
  children?: React.ReactNode;
};

const Context = ({ children }: DataProviderProps) => {
  const navigate = useNavigate();
  const accessToken = String(getCookie("accessToken"));
  const refreshToken = String(getCookie("refreshToken"));
  const hospitalID = Number(getCookie("hospID"));

  const [hospData, setHospData] = useState<HospitalProfileData>();
  const [doctorsData, setDoctorsData] = useState<Array<DocProfileData>>();
  const [docDetails, setDocDetails] = useState<DocProfileData>();
  const [inClinicData, setInClinicData] = useState<Array<QueueData>>();
  const [bookedData, setBookedData] = useState<Array<QueueData>>();
  const [index, setIndex] = useState<number | undefined>(moment().day() + 1);
  const [SelectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

  useEffect(() => {
    const onAuthStateChanged = async () => {
      if (!accessToken || !refreshToken || !hospitalID) {
        console.log("Cookies not present, will logout.");
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("hospID");
        navigate("/");
      } else if (accessToken && refreshToken && hospitalID) {
        const hosp_data = await getHosptialDetails(hospitalID);

        if (hosp_data?.status === 200) {
          setHospData(hosp_data.data.result);

          const doc_data = await getDoctorListByHospitalId(hospitalID);
          if (doc_data?.status === 200) setDoctorsData(doc_data.data.result);
        } else if (hosp_data?.status === 401) {
          const refresh_data = await hitRefreshToken(accessToken, refreshToken);
          if (refresh_data?.status === 200) {
            console.log("Refresh");
            setCookie("accessToken", refresh_data.data.result.access_token, 30);
            setCookie(
              "refreshToken",
              refresh_data.data.result.refresh_token,
              30
            );
            const hosp_data = await getHosptialDetails(hospitalID);
            if (hosp_data?.status === 200) setHospData(hosp_data.data.result);

            const doc_data = await getDoctorListByHospitalId(hospitalID);
            if (doc_data?.status === 200) setDoctorsData(doc_data.data.result);
          } else {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            deleteCookie("hospID");
            navigate("/");
          }
        }
      } else console.error("Hospital ID invalid or not present.");
    };

    onAuthStateChanged();
  }, [, accessToken, refreshToken, hospitalID, navigate]);

  const handleLogin = async ({ email, password }: LoginData, event: any) => {
    event.preventDefault();
    if (!email) {
      toast.error("Invalid email.");
    } else if (password.length <= 7) {
      toast.error("Password needs to have more than 8 characters.");
    } else {
      const res = await hosptialLogin({ email, password });
      if (res?.status === 200) {
        toast.success("Sign in successful!");
        setCookie("accessToken", res.data.result.access_token, 30);
        setCookie("refreshToken", res.data.result.refresh_token, 30);
        setCookie("hospID", res.data.result.hospital_id.toString(), 30);
        navigate("/tvscreen");
      } else toast.error("Wrong email/password entered.");
    }
  };

  const handleLogout = async () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("hospID");
    setHospData(undefined);
    navigate("/");
  };

  return (
    <DataContext.Provider
      value={{
        handleLogin,
        hospitalID,
        accessToken,
        refreshToken,
        handleLogout,
        hospData,
        setHospData,
        doctorsData,
        setDoctorsData,
        docDetails,
        setDocDetails,
        inClinicData,
        setInClinicData,
        bookedData,
        setBookedData,
        SelectedDate,
        setSelectedDate,
        index,
        setIndex,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}

export default Context;
