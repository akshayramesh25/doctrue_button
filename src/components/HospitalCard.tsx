import React from "react";
import ProfilePicture from "./ProfilePicture";
import { useNavigate } from "react-router";
import { useHospDocData } from "../lib/contexts/HospitalDoctorContext";

const HospitalCard = ({
  id,
  name,
  docCount,
  logo,
}: {
  id: string;
  name: string;
  docCount: string;
  logo: string;
}) => {
  const { setHospitalID } = useHospDocData();
  const navigate = useNavigate();

  return (
    <button
      className="min-w-[320px] md:min-w-[360px] shadow-md rounded-lg hover:opacity-70"
      onClick={() => {
        console.log(name);
        navigate("/" + id);
        setHospitalID(id);
      }}
    >
      <div className="flex flex-row items-center bg-white p-5 rounded-t-lg border-b-[1px] border-doctorsBorder">
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
      <div className="bg-white flex justify-between rounded-b-lg p-5">
        <p className="font-medium text-docDetail text-sm">Number of Doctors</p>
        <p className="font-semibold text-dark text-sm">{docCount}</p>
      </div>
    </button>
  );
};

export default HospitalCard;
