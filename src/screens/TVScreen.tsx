import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import moment from "moment";
import LiveQueue from "./LiveQueue";
import Loader from "../components/Loader";
import { useUserData } from "../lib/contexts/UserContext";
import { useHospDocData } from "../lib/contexts/HospitalDoctorContext";
import { useInterval } from "../lib/utils/useInterval";
import { useNavigate } from "react-router-dom";

const TVScreen = () => {
  const { userData } = useUserData();
  const { hospitalID, doctors } = useHospDocData();
  const navigate = useNavigate();

  const [time, setTime] = useState(moment().format("hh:mm A"));
  // console.log("doctors", doctors);

  useInterval(async () => {
    setTime(moment().format("hh:mm A"));
  }, 60000);

  useEffect(() => {
    if (doctors === undefined) navigate("/" + hospitalID);
  }, [doctors]);

  return (
    <>
      {userData !== undefined ? (
        <div className="flex flex-col h-screen">
          <div className="flex flex-row justify-between mt-5">
            <p className="font-semibold text-3xl ml-10">{time}</p>
            <button
              onClick={() => navigate("/admin")}
              className="w-[10%] mr-10"
            >
              <img
                src={require("../assets/images/DTlogo.png")}
                alt="Queue empty"
              />
            </button>
          </div>
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
          >
            {doctors?.map((doc, index) => (
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

export default TVScreen;
