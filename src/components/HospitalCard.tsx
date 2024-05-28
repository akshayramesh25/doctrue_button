import React from "react";
import ProfilePicture from "./ProfilePicture";

const HospitalCard = ({
  logo,
  name,
  docCount,
  handlePress,
}: {
  logo: string;
  name: string;
  docCount: string;
  handlePress: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  return (
    <button
      className="min-w-[320px] md:min-w-[360px] shadow-md rounded-lg hover:opacity-70"
      onClick={handlePress}
    >
      <div
        className={`flex flex-row items-center bg-white p-5 ${
          docCount === "none" ? "rounded-lg" : "rounded-t-lg"
        } border-b-[1px] border-doctorsBorder`}
      >
        {logo === "test" ? (
          <ProfilePicture username={name} className="w-14 h-14" />
        ) : (
          <img
            className={`w-14 h-14 rounded-full`}
            src={logo}
            alt="hospital-logo"
          ></img>
        )}
        <p className="font-semibold text-sbTextHover text-sm md:text-base ml-4">
          {name}
        </p>
      </div>
      {docCount !== "none" && (
        <div className="bg-white flex justify-between rounded-b-lg p-5">
          <p className="font-medium text-docDetail text-sm">
            Number of Doctors
          </p>
          <p className="font-semibold text-dark text-sm">{docCount}</p>
        </div>
      )}
    </button>
  );
};

export default HospitalCard;
