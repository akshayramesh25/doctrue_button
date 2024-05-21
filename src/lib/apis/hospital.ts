import axios from "axios";
import { header } from "../utils/header";
import { updateHospital } from "../utils/types";
import { baseURL } from "../utils/constants";

//Get Hospitals by User ID
export const getHospitalListByUserId = async (user_id: string) => {
  try {
    const res = await axios.get(`${baseURL}/user/${user_id}/hospitals`, {
      headers: header(),
    });
    return res;
  } catch (error: any) {
    if (error.response || error.response.status === 401) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};

//Update Hospital
export const updateHosptialDetails = async ({
  hospital_id,
  hospital_name,
  hospital_timing,
  hospital_address,
}: updateHospital) => {
  const res = await axios.put(
    `${baseURL}/hospital/${hospital_id}`,
    {
      name: hospital_name,
      timing: hospital_timing,
      address: hospital_address,
    },
    { headers: header() }
  );
  return res;
};

//GET HOSPITAL DETAILS
export const getHosptialDetails = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${baseURL}/hospital/${id}`, {
      headers: header(),
    });
    return res;
  } catch (error: any) {
    if (error.response || error.response.status === 401) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};
