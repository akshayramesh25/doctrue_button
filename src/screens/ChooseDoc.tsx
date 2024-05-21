import React from "react";
import { Logo } from "../assets/icons/Icons";
import { useUserData } from "../lib/contexts/UserContext";
import HospitalCard from "../components/HospitalCard";
import Loader from "../components/Loader";
import { useHospDocData } from "../lib/contexts/HospitalDoctorContext";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../components/ProfilePicture";

const ChooseDoc = () => {
  const { userData } = useUserData();
  const { hospitalID, hospData, allDoctorsData, setDoctors } = useHospDocData();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full justify-center items-center pt-14 pb-40">
      <Logo />
      <div className="flex flex-col items-center space-y-3 mt-20 mb-16 ">
        <p className="font-semibold text-dark text-lg md:text-2xl lg:text-3xl">
          Choose a doctor
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-7 mb-16">
        {allDoctorsData?.map((doctor) => (
          <HospitalCard
            key={doctor.doctor_id}
            logo={doctor.profile_picture}
            name={doctor.full_name}
            docCount={"none"}
            handlePress={() => {
              console.log(doctor.full_name);
              setDoctors([doctor]);
              navigate("/" + hospitalID + "/tvscreen");
            }}
          />
        ))}
      </div>
      {allDoctorsData && allDoctorsData.length > 1 && (
        <button
          className="min-w-[320px] md:min-w-[360px] shadow-md rounded-lg hover:opacity-70"
          onClick={() => {
            navigate("/" + hospitalID + "/tvscreen");
            setDoctors(allDoctorsData);
          }}
        >
          <div className="flex flex-row items-center bg-white p-5 rounded-lg border-b-[1px] border-doctorsBorder">
            {hospData?.logo === "test" ? (
              <ProfilePicture
                username={hospData.hospital_name}
                className="w-14 h-14"
              />
            ) : (
              <img
                className={`w-14 h-14 rounded-full`}
                src={hospData?.logo}
                alt="hospital-logo"
              ></img>
            )}
            <p className="font-semibold text-sbTextHover text-sm md:text-base ml-4">
              All Doctors
            </p>
          </div>
        </button>
      )}

      {userData === undefined && <Loader />}
    </div>
  );
};

export default ChooseDoc;
