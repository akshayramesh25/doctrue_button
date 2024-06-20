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
  console.log(allDoctorsData);

  return (
    <div className="flex flex-col w-full justify-center items-center pt-14 pb-40">
      <Logo />
      <div className="flex flex-col items-center space-y-3 mt-20 mb-16 ">
        <p className="font-semibold text-dark text-lg md:text-2xl lg:text-3xl">
          Choose a doctor
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-7 mb-16">
        {/* Create constant */}
        {hospitalID === "fa577fb4-6353-44ae-9a41-0d362d0ab5ce"
          ? allDoctorsData?.slice(0, 2).map((doctor) => (
              <HospitalCard
                key={doctor.doctor_id}
                logo={doctor.profile_picture}
                name={doctor.full_name}
                docCount={"none"}
                handlePress={() => {
                  console.log(doctor.full_name);
                  setDoctors([doctor]);
                  navigate("/" + hospitalID + "/next_patient");
                }}
              />
            ))
          : allDoctorsData?.map((doctor) => (
              <HospitalCard
                key={doctor.doctor_id}
                logo={doctor.profile_picture}
                name={doctor.full_name}
                docCount={"none"}
                handlePress={() => {
                  console.log(doctor.full_name);
                  setDoctors([doctor]);
                  navigate("/" + hospitalID + "/next_patient");
                }}
              />
            ))}
      </div>

      {userData === undefined && <Loader />}
    </div>
  );
};

export default ChooseDoc;
