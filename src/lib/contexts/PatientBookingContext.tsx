import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "../utils/cookies";
import { hitRefreshToken } from "../apis/user";
import { Booking, TotalPatients } from "../utils/types";
import moment from "moment";
import { useUserData } from "./UserContext";
import { useHospDocData } from "./HospitalDoctorContext";
import { getBookingListByHospitalId } from "../apis/booking";

interface PatientBookingContextInterface {
  bookings: Array<Booking> | undefined;
  setBookings: React.Dispatch<React.SetStateAction<Booking[] | undefined>>;
  appointmentsData: Booking[] | undefined;
  setAppointmentsData: React.Dispatch<
    React.SetStateAction<Booking[] | undefined>
  >;
  patientsData: TotalPatients | undefined;
  setPatientsData: React.Dispatch<
    React.SetStateAction<TotalPatients | undefined>
  >;
  index: number | undefined;
  setIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  SelectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}

export const PatientBookingDataContext = createContext(
  {} as PatientBookingContextInterface
);

type PatientBookingProviderProps = {
  children?: React.ReactNode;
};

const PatientBookingContext = ({ children }: PatientBookingProviderProps) => {
  const { userData } = useUserData();
  const { hospitalID } = useHospDocData();

  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  const [bookings, setBookings] = useState<Booking[]>();
  const [appointmentsData, setAppointmentsData] = useState<Booking[]>();
  const [patientsData, setPatientsData] = useState<TotalPatients>();
  const [index, setIndex] = useState<number | undefined>(moment().day() + 1);
  const [SelectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

  useEffect(() => {
    const fetchPatientBookingData = async () => {
      if (accessToken && refreshToken && userData && hospitalID) {
        const appointment_data = await getBookingListByHospitalId(hospitalID);
        if (appointment_data?.status === 200) {
          setAppointmentsData(appointment_data.data.result);
        } else if (appointment_data?.status === 401) {
          const refresh_data = await hitRefreshToken(accessToken, refreshToken);
          if (refresh_data?.status === 200) {
            console.log("Refresh");
            setCookie("accessToken", refresh_data.data.result.access_token, 30);
            setCookie(
              "refreshToken",
              refresh_data.data.result.refresh_token,
              30
            );
            const res = await getBookingListByHospitalId(hospitalID);
            if (res?.status === 200) setAppointmentsData(res.data.result);
          }
        }
      } else if (userData === undefined) {
        setAppointmentsData(undefined);
        setBookings(undefined);
        setPatientsData(undefined);
      }
    };

    fetchPatientBookingData();
  }, [, accessToken, refreshToken, userData, hospitalID]);

  return (
    <PatientBookingDataContext.Provider
      value={{
        bookings,
        setBookings,
        appointmentsData,
        setAppointmentsData,
        patientsData,
        setPatientsData,
        index,
        setIndex,
        SelectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </PatientBookingDataContext.Provider>
  );
};

export function usePatientBooking() {
  return useContext(PatientBookingDataContext);
}

export default PatientBookingContext;
