import React from "react";

const Patient = ({
  pos,
  name,
  phno,
  notStarted,
  onGoing,
  completed,
  travelling,
  empty,
  Today,
  text,
  onPressSend,
  onPressDelete,
  onPressCheckIn,
}: {
  pos?: any;
  name?: string;
  phno?: string;
  notStarted?: boolean;
  onGoing?: boolean;
  completed?: boolean;
  travelling?: boolean;
  empty?: boolean;
  Today?: boolean;
  text?: string;
  onPressSend?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onPressDelete?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onPressCheckIn?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  if (notStarted) {
    return (
      <div className="bg-darkBlue p-5 my-5 mx-36 rounded-xl">
        <div className="rounded-[1rem]">
          <p className="text-white text-xl">Queue has not started</p>
        </div>
      </div>
    );
  }

  if (onGoing) {
    return (
      <div className="bg-green flex flex-row justify-center items-center p-5 my-5 mx-36 rounded-xl">
        <p className="text-white flex-[0.3] text-3xl font-semibold">
          Token {pos}
        </p>
        <p className="text-white flex-[0.7] text-2xl ml-20">{name}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col justify-center items-center bg-white rounded-lg mt-10 mx-20 p-5">
        <img
          src={require("../assets/images/empty.png")}
          alt="Queue empty"
          className="!w-[50%]"
        />
        <p className="text-center mb-5">{text}</p>
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-row justify-center items-center p-5 my-5 mx-36 rounded-xl">
      <p className="text-primary flex-[0.3] text-3xl font-semibold">
        Token {pos}
      </p>
      <p className="text-2xl flex-[0.7] ml-20">{name}</p>
    </div>
  );
};

export default Patient;
