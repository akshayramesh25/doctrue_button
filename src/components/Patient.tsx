import React from "react";

const Patient = ({
  pos,
  name,
  notStarted,
  onGoing,
  empty,
  text,
  queue_type,
}: {
  pos?: any;
  name?: string;
  notStarted?: boolean;
  onGoing?: boolean;
  empty?: boolean;
  text?: string;
  queue_type?: string;
}) => {
  if (notStarted) {
    return (
      <div className="bg-darkBlue p-5 my-5 mx-5 lg:mx-36 rounded-xl">
        <div className="rounded-[1rem]">
          <p className="text-white text-xl">Queue has not started</p>
        </div>
      </div>
    );
  }

  if (onGoing) {
    return (
      <div className="bg-green flex flex-row justify-center items-center p-5 my-5 mx-5 lg:mx-36 rounded-xl">
        {(queue_type === "Token" || queue_type === "Slot_Token") && (
          <p className="text-white flex-[0.4] text-xl lg:text-3xl font-semibold">
            Token {pos}
          </p>
        )}
        <p
          className={`text-xl lg:text-2xl text-white ${
            queue_type === "Token" || queue_type === "Slot_Token"
              ? "flex-[0.6] ml-20"
              : "flex-1"
          }`}
        >
          {name}
        </p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col justify-center items-center bg-white rounded-lg mt-10 mx-5 lg:mx-20 p-5">
        <img
          src={require("../assets/images/empty.png")}
          alt="Queue empty"
          className="lg:!w-[50%] !w-full"
        />
        <p className="text-center mb-5">{text}</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-row justify-center items-center p-5 my-5 mx-5 lg:mx-36 rounded-xl">
      {(queue_type === "Token" || queue_type === "Slot_Token") && (
        <p className="text-primary flex-[0.4] text-xl lg:text-3xl font-semibold">
          Token {pos}
        </p>
      )}
      <p
        className={`text-xl lg:text-2xl ${
          queue_type === "Token" || queue_type === "Slot_Token"
            ? "flex-[0.6] ml-20"
            : "flex-1"
        }`}
      >
        {name}
      </p>
    </div>
  );
};

export default Patient;
