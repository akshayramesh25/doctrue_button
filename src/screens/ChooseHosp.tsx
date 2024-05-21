import React from "react";
import { Logo } from "../assets/icons/Icons";
import { useUserData } from "../lib/contexts/UserContext";
import HospitalCard from "../components/HospitalCard";
import Loader from "../components/Loader";
import { useHospDocData } from "../lib/contexts/HospitalDoctorContext";

const ChooseHosp = () => {
  const { userData } = useUserData();
  const { allHospData } = useHospDocData();

  return (
    <div className="flex flex-col w-full justify-center items-center pt-14 pb-40">
      <Logo />
      <div className="flex flex-col items-center space-y-3 mt-20 mb-16 ">
        <p className="font-semibold text-dark text-lg md:text-2xl lg:text-3xl">
          Choose a clinic or hospital
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-7 mb-16">
        {allHospData?.map((hospital) => (
          <HospitalCard
            key={hospital.hospital_id}
            id={hospital.hospital_id}
            name={hospital.hospital_name}
            docCount={hospital.number_of_doctors}
            logo={hospital.logo}
          />
        ))}
      </div>

      {userData === undefined && <Loader />}
    </div>
  );
};

export default ChooseHosp;
