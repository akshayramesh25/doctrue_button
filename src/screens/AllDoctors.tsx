import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import moment from "moment";
import LiveQueue from "./LiveQueue";
import { useInterval } from "../lib/useInterval";
import Loader from "../components/Loader";
import { useUserData } from "../lib/contexts/UserContext";
import { useHospDocData } from "../lib/contexts/HospitalDoctorContext";

const AllDoctors = () => {
  const { userData } = useUserData();
  const { doctorsData } = useHospDocData();
  const [time, setTime] = useState(moment().format("hh:mm A"));
  console.log("doctorsData", doctorsData);

  useInterval(async () => {
    setTime(moment().format("hh:mm A"));
  }, 60000);

  return (
    <>
      {userData !== undefined ? (
        <div className="flex flex-col h-screen">
          <div className="flex flex-row justify-between mt-5">
            <p className="font-semibold text-3xl ml-10">{time}</p>
            <img
              src={require("../assets/images/DTlogo.png")}
              alt="Queue empty"
              className="w-[10%] mr-10"
            />
          </div>
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
          >
            {doctorsData?.map((doc, index) => (
              <LiveQueue key={index} mapping_id={doc.mapping_id} />
            ))}
          </Carousel>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default AllDoctors;
