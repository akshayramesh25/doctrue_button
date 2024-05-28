import axios from "axios";
import moment from "moment";
import { header } from "../utils/header";
import { baseURL } from "../utils/constants";

interface Patient {
  full_name: string;
  contact_number: string;
  gender: string;
  date_of_birth: string;
  email?: string;
  address?: string;
}

//Get patients bt hospital id
export const getPatientsByHospitalID = async (
  id: string | undefined,
  page: number,
  pageSize: number,
  search: string
) => {
  try {
    const date = moment().format("YYYY-MM-DD");
    const res = await axios.get(`${baseURL}/patient/hospital/${id}`, {
      params: { date: date, page: page, pageSize: pageSize, search: search },
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Get patient by phone no
export const getPatientByPhoneNo = async (phno: string) => {
  try {
    const res = await axios.get(`${baseURL}/patient/search`, {
      params: { contact_number: phno },
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Get patient by patient id
export const getPatientByPatientId = async (patient_id: string) => {
  try {
    const res = await axios.get(`${baseURL}/patient/${patient_id}`, {
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Create Patient
export const createPatient = async (req: Patient) => {
  try {
    const res = await axios.post(`${baseURL}/patient`, req, {
      headers: header(),
    });
    return res;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response);
      return error.response;
    } else {
      console.error(error);
    }
  }
};

//Update patient details
export const updatePatient = async (patient_id: string, req: Patient) => {
  try {
    const res = await axios.patch(`${baseURL}/patient/${patient_id}`, req, {
      headers: header(),
    });
    return res;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response);
      return error.response;
    } else {
      console.error(error);
    }
  }
};
