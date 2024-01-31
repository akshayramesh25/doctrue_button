import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Logo } from "../assets/icons/Icons";
import moment from "moment";
import { useData } from "../lib/Context";

const TVScreen = () => {
  const [index, setIndex] = useState(0);
  const { hospData } = useData();

  return (
    <>
      {hospData !== undefined ? (
        <div className="flex flex-col h-screen">
          <div className="flex flex-row justify-between mt-5">
            <p className="font-semibold text-3xl ml-10">
              {moment().format("hh:mm A")}
            </p>
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
            onChange={setIndex}
          >
            {/* <LiveQueue key={index} dmcl={dmcl} session={session} /> */}
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
