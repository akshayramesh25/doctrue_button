import axios from "axios";
import { header } from "../utils/header";
import { baseURL } from "../utils/constants";

//GET list of doctors by hospital id
export const getDoctorListByHospitalId = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${baseURL}/hospital/${id}/doctors`, {
      headers: header(),
    });
    return res;
  } catch (error: any) {
    if (error.response || error.response.status === 403) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};

//GET doctor availability using mapping id
export const getDoctorAvailability = async (mapping_id: string) => {
  try {
    const res = await axios.get(
      `${baseURL}/hospital/doctor/availability/${mapping_id}`,
      {
        headers: header(),
      }
    );
    return res;
  } catch (error: any) {
    if (error.response || error.response.status === 403) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};

//Set Check-In Doctor
export const setCheckInDoctor = async (
  mapping_id: string,
  date: string,
  availability_id: string,
  doc_in: boolean
) => {
  try {
    const res = await axios.post(
      `${baseURL}/hospital/doc_delay`,
      {
        mapping_id: mapping_id,
        booked_date: date,
        availability_id: availability_id,
        doc_in: doc_in,
      },
      {
        headers: header(),
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get Check-In Doctor
export const getCheckInDoctor = async (
  mapping_id: string,
  date: string,
  availability_id: string
) => {
  try {
    const res = await axios.post(
      `${baseURL}/hospital/get_doc_delay`,
      {
        mapping_id: mapping_id,
        booked_date: date,
        availability_id: availability_id,
      },
      {
        headers: header(),
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
