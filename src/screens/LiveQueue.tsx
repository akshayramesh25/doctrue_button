import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import Patient from "../components/Patient";
import { deleteCookie, getCookie, setCookie } from "../lib/utils/cookies";
import { useHospDocData } from "../lib/contexts/HospitalDoctorContext";
import { getDoctorAvailability } from "../lib/apis/doctor";
import { hitRefreshToken } from "../lib/apis/user";
import {
  getBookingListByAvailabilityId,
  updateBookingStatus,
} from "../lib/apis/booking";
import { Booking, DocAvailability, Doctor } from "../lib/utils/types";
import { useInterval } from "../lib/utils/useInterval";
import { toast } from "react-toastify";

const LiveQueue = ({ mapping_id }: { mapping_id: string }) => {
  const { hospData } = useHospDocData();
  const accessToken = String(getCookie("accessToken"));
  const refreshToken = String(getCookie("refreshToken"));
  const navigate = useNavigate();

  const [docDetails, setDocDetails] = useState<Doctor>();
  const [docAvail, setDocAvail] = useState<DocAvailability[]>();
  const [SelectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [index, setIndex] = useState<number | undefined>(moment().day() + 1);
  const [inClinicData, setInClinicData] = useState<Booking[]>();
  const [session, setSession] = useState<{
    label: string;
    value: string;
    start_time: moment.Moment;
    end_time: moment.Moment;
    queue_type: string;
  }>();

  const fetchQueueData = async () => {
    console.log("fetch");
    const res = await getBookingListByAvailabilityId(
      session?.value,
      SelectedDate
    );
    if (res?.status === 200) {
      // console.log(res.data.result);
      const data: Booking[] = res.data.result;
      setInClinicData(
        data
          .sort((a, b) => a.token_number - b.token_number)
          .filter((item: Booking) => item.status === 1 || item.status === 2)
      );
    } else if (res?.status === 401) {
      const refresh_data = await hitRefreshToken(accessToken, refreshToken);
      if (refresh_data?.status === 200) {
        console.log("Refresh");
        setCookie("accessToken", refresh_data.data.result.access_token, 30);
        setCookie("refreshToken", refresh_data.data.result.refresh_token, 30);
        const api_data = await getBookingListByAvailabilityId(
          session?.value,
          SelectedDate
        );
        if (api_data?.status === 200)
          setInClinicData(
            api_data.data.result.filter(
              (item: Booking) => item.status === 1 || item.status === 2
            )
          );
      } else {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("userID");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    setSelectedDate(moment().format("YYYY-MM-DD"));
    setIndex(moment().day() + 1);
  }, []);

  useEffect(() => {
    const fetchDocAvailability = async () => {
      const res = await getDoctorAvailability(mapping_id);
      if (res?.status === 200) {
        // console.log(res.data.result);
        setDocAvail(res.data.result.doctor_availability);
        setDocDetails(res.data.result.doctor_details);
      } else if (res?.status === 401) {
        const refresh_data = await hitRefreshToken(accessToken, refreshToken);
        if (refresh_data?.status === 200) {
          console.log("Refresh");
          setCookie("accessToken", refresh_data.data.result.access_token, 30);
          setCookie("refreshToken", refresh_data.data.result.refresh_token, 30);
          const res = await getDoctorAvailability(mapping_id);
          if (res?.status === 200) {
            setDocAvail(res.data.result.doctor_availability);
            setDocDetails(res.data.result.doctor_details);
          }
        }
      }
    };
    fetchDocAvailability();
  }, [mapping_id, hospData]);

  useEffect(() => {
    if (docAvail !== undefined) {
      // const now = moment();
      const now = moment().set({ hour: 10, minute: 0 });
      const currSession = docAvail
        .filter((i) => i.day_of_week === index)
        .filter((item) => {
          const startTime = moment(item.start_time, "HH:mm:ss").subtract(
            30,
            "minutes"
          ); // Subtract 30 minutes from start time
          const endTime = moment(item.end_time, "HH:mm:ss").add(30, "minutes"); // Add 30 minutes to end time

          return now.isBetween(startTime, endTime); // Check if current time is within the modified range
        })
        .map((item) => {
          return {
            value: String(item.availability_id),
            label: `${moment(item.start_time, "HH:mm:ss").format(
              "hh:mmA"
            )} - ${moment(item.end_time, "HH:mm:ss").format("hh:mmA")}`,
            start_time: moment(item.start_time, "HH:mm:ss").subtract(
              30,
              "minutes"
            ),
            end_time: moment(item.end_time, "HH:mm:ss").add(30, "minutes"),
            queue_type: item.queue_type,
          };
        });
      // console.log("currSession", currSession);
      setSession(currSession && currSession[0]);
      fetchQueueData();
    }
  }, [, SelectedDate, docAvail]);

  useInterval(async () => {
    if (
      moment()
        .set({ hour: 10, minute: 0 })
        .isBetween(session?.start_time, session?.end_time)
    ) {
      fetchQueueData();
    }
  }, 5000);

  // console.log(inClinicData);

  return (
    <div>
      <p className="mt-3 text-black font-semibold text-xl lg:text-3xl">
        Dr. {docDetails?.full_name}
      </p>
      <p>{session?.label}</p>
      {moment()
        .set({ hour: 10, minute: 0 })
        .isBetween(session?.start_time, session?.end_time) ? (
        <>
          {inClinicData?.length ? (
            <>
              <p
                className={`${
                  inClinicData?.filter((item) => item.status === 2).length !== 0
                    ? "text-green"
                    : "text-darkBlue"
                } mt-5 font-semibold text-xl`}
              >
                On Going
              </p>
              <div>
                {inClinicData?.filter((item) => item.status === 2).length !==
                0 ? (
                  inClinicData
                    ?.filter((item) => item.status === 2)
                    .map((item, index) => {
                      return (
                        <Patient
                          onGoing
                          key={index}
                          pos={item.token_number}
                          name={item.full_name}
                          queue_type={session?.queue_type}
                        />
                      );
                    })
                ) : (
                  <Patient notStarted />
                )}
              </div>
              <p className=" font-semibold text-xl">Next in Queue</p>
              <div className="flex flex-col">
                {inClinicData?.filter((item) => item.status === 1).length !==
                0 ? (
                  <>
                    {inClinicData
                      ?.filter(
                        (item) =>
                          item.status === 1 &&
                          item.availability_id === session?.value
                      )
                      .slice(0, 3)
                      .map((item, index) => (
                        <Patient
                          key={index}
                          pos={item.token_number}
                          name={item.full_name}
                          queue_type={session?.queue_type}
                        />
                      ))}

                    <button
                      className="bg-nextPatient flex justify-center items-center p-5 my-10 mx-5 lg:mx-36 rounded-xl text-white text-xl lg:text-2xl"
                      onClick={async () => {
                        const onGoingPatient = inClinicData.filter(
                          (booking) => booking.status === 2
                        );
                        if (onGoingPatient.length !== 0) {
                          const onGoingID = onGoingPatient[0].booking_id;
                          console.log(onGoingID);
                          await updateBookingStatus({
                            bookingId: onGoingID,
                            status: 3,
                          });
                        }
                        const sendPatientOnGoing = await updateBookingStatus({
                          bookingId: inClinicData.filter(
                            (booking) => booking.status === 1
                          )[0].booking_id,
                          status: 2,
                        });
                        console.log(sendPatientOnGoing);
                        if (sendPatientOnGoing?.status === 200) {
                          toast.success("Next patient called!");
                          fetchQueueData();
                        } else {
                          toast.error(sendPatientOnGoing.data.error);
                        }
                      }}
                    >
                      Next Patient
                    </button>
                  </>
                ) : (
                  <Patient empty text={"No Patients in the clinic"} />
                )}
              </div>
            </>
          ) : (
            <Patient empty text={"No Patients in the clinic"} />
          )}
        </>
      ) : (
        <img
          src={require("../assets/images/starting-soon.gif")}
          className="object-contain	h-96"
          alt="Starting Soon"
        ></img>
      )}
    </div>
  );
};

export default LiveQueue;
