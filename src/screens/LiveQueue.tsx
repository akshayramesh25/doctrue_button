import React, { useState, useEffect } from "react";
import Patient from "../components/Patient";
import { useData } from "../lib/Context";
import {
  getBookingCount,
  getDoctorAvailability,
  getQueueByMappingId,
  hitRefreshToken,
} from "../lib/apis";
import { DocAvailabilityData, DocProfileData, QueueData } from "../lib/types";
import moment from "moment";
import { useInterval } from "../lib/useInterval";
import { useNavigate } from "react-router-dom";

const LiveQueue = ({ mapping_id }: { mapping_id: number }) => {
  const { accessToken, refreshToken, hospData, SelectedDate, setSelectedDate } =
    useData();
  const [docDetails, setDocDetails] = useState<DocProfileData>();
  const [docAvail, setDocAvail] = useState<DocAvailabilityData[]>();
  const [index, setIndex] = useState<number | undefined>(moment().day() + 1);
  const [inClinicData, setInClinicData] = useState<Array<QueueData>>();
  const [session, setSession] = useState<{
    label: string;
    value: string;
    start_time: moment.Moment;
    end_time: moment.Moment;
  }>();
  const navigate = useNavigate();

  const fetchQueueData = async () => {
    const inclinic_data = await getQueueByMappingId(mapping_id, SelectedDate);
    if (inclinic_data?.status === 200) {
      setInClinicData(inclinic_data.data.result);
    } else setInClinicData(undefined);
  };

  useEffect(() => {
    setSelectedDate(moment().format("YYYY-MM-DD"));
    setIndex(moment().day() + 1);
  }, []);

  useEffect(() => {
    const fetchDocAvailability = async () => {
      const res = await getDoctorAvailability(mapping_id);
      if (res?.status === 200) {
        setDocAvail(res.data.result.doctor_availability);
        setDocDetails(res.data.result.doctor_details);
      } else if (res?.status === 401) {
        const refresh_data = await hitRefreshToken(accessToken, refreshToken);
        if (refresh_data?.status === 200) {
          console.log("Refresh");
          localStorage.setItem(
            "accessToken",
            refresh_data.data.result.access_token
          );
          localStorage.setItem(
            "refreshToken",
            refresh_data.data.result.refresh_token
          );
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
      const now = moment();
      //   const now = moment().set({ hour: 19, minute: 0 });
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
          };
        });
      setSession(currSession && currSession[0]);
      fetchQueueData();
    }
  }, [, SelectedDate, docAvail]);

  // SCOPE FOR OPTIMIZATION

  //   useInterval(async () => {
  //     const sesh = Number(session?.value);
  //     const res = await getBookingCount(mapping_id, SelectedDate, sesh, 1);
  //     if (res?.status === 200) {
  //       const count = Number(res.data.result[0].bookings_count);
  //       console.log(
  //         count,
  //         inClinicData?.filter((item) => item.status === 1).length
  //       );
  //       if (inClinicData?.filter((item) => item.status === 1).length !== count) {
  //         const api_data = await getQueueByMappingId(mapping_id, SelectedDate);
  //         if (api_data?.status === 200) setInClinicData(api_data.data.result);
  //       }
  //     } else if (res?.status === 401) {
  //       const refresh_data = await hitRefreshToken(accessToken, refreshToken);
  //       if (refresh_data?.status === 200) {
  //         console.log("Refresh");
  //         localStorage.setItem(
  //           "accessToken",
  //           refresh_data.data.result.access_token
  //         );
  //         localStorage.setItem(
  //           "refreshToken",
  //           refresh_data.data.result.refresh_token
  //         );
  //         const api_data = await getQueueByMappingId(mapping_id, SelectedDate);
  //         if (api_data?.status === 200) setInClinicData(api_data.data.result);
  //       }
  //     }
  //   }, 5000);

  useInterval(async () => {
    if (moment().isBetween(session?.start_time, session?.end_time)) {
      const res = await getQueueByMappingId(mapping_id, SelectedDate);
      if (res?.status === 200) {
        setInClinicData(res.data.result);
      } else if (res?.status === 401) {
        const refresh_data = await hitRefreshToken(accessToken, refreshToken);
        if (refresh_data?.status === 200) {
          console.log("Refresh");
          localStorage.setItem(
            "accessToken",
            refresh_data.data.result.access_token
          );
          localStorage.setItem(
            "refreshToken",
            refresh_data.data.result.refresh_token
          );
          const api_data = await getQueueByMappingId(mapping_id, SelectedDate);
          if (api_data?.status === 200) setInClinicData(api_data.data.result);
        } else {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("hospID");
          navigate("/");
        }
      }
    }
  }, 5000);

  return (
    <div>
      <p className="mt-3 text-black font-medium text-3xl">
        Dr. {docDetails?.full_name}
      </p>
      <p>{session?.label}</p>
      {moment().isBetween(session?.start_time, session?.end_time) ? (
        <>
          {inClinicData?.filter((item) => item.mapping_id === mapping_id)
            .length ? (
            <>
              <p
                className={`${
                  inClinicData?.filter(
                    (item) =>
                      item.status === 2 && item.mapping_id === mapping_id
                  ).length !== 0
                    ? "text-green"
                    : "text-darkBlue"
                } mt-5 font-semibold text-xl`}
              >
                On Going
              </p>
              <div>
                {inClinicData?.filter(
                  (item) => item.status === 2 && item.mapping_id === mapping_id
                ).length !== 0 ? (
                  inClinicData
                    ?.filter(
                      (item) =>
                        item.status === 2 && item.mapping_id === mapping_id
                    )
                    .map((item, index) => {
                      return (
                        <Patient
                          onGoing
                          key={index}
                          pos={item.token_number}
                          name={item.full_name}
                        />
                      );
                    })
                ) : (
                  <Patient notStarted />
                )}
              </div>
              <p className=" font-semibold text-xl">Next in Queue</p>
              <div>
                {inClinicData?.filter(
                  (item) => item.status === 1 && item.mapping_id === mapping_id
                ).length !== 0 ? (
                  inClinicData
                    ?.filter((item) => item.status === 1)
                    .map((item, index) => {
                      if (index < 3)
                        return (
                          <Patient
                            key={index}
                            pos={item.token_number}
                            name={item.full_name}
                          />
                        );
                    })
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
        ></img>
      )}
    </div>
  );
};

export default LiveQueue;
