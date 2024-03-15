import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Logo } from "../assets/icons/Icons";
import moment from "moment";
import { useData } from "../lib/Context";
import LiveQueue from "./LiveQueue";
import { useInterval } from "../lib/useInterval";

const TVScreen = () => {
  const { hospitalID, hospData, doctorsData } = useData();
  const [time, setTime] = useState(moment().format("hh:mm A"));

  useInterval(async () => {
    setTime(moment().format("hh:mm A"));
  }, 60000);
  console.log(
    doctorsData?.sort(
      (a, b) => moment(a.created_at).valueOf() - moment(b.created_at).valueOf()
    )
  );

  return (
    <>
      {hospData !== undefined ? (
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
            {hospitalID === "fa577fb4-6353-44ae-9a41-0d362d0ab5ce"
              ? doctorsData
                  ?.sort(
                    (a, b) =>
                      moment(a.created_at).valueOf() -
                      moment(b.created_at).valueOf()
                  )
                  .slice(0, 2)
                  .map((doc, index) => (
                    <LiveQueue key={index} mapping_id={doc.mapping_id} />
                  ))
              : doctorsData?.map((doc, index) => (
                  <LiveQueue key={index} mapping_id={doc.mapping_id} />
                ))}
          </Carousel>
        </div>
      ) : (
        <div className="bg-selectedTareek backdrop-blur-sm absolute flex justify-center items-center h-screen w-full top-0 bottom-0 left-0 right-0">
          <div className="animate-pulse">
            <Logo />
          </div>
        </div>
      )}
    </>
  );
};

export default TVScreen;
