import axios from "axios";
import { URLS } from "./urls";
import {
  CreateDocProfileData,
  LoginData,
  HospitalProfileData,
  AddDocData,
  addBookingData,
  UpdateQueueData,
  DocProfileData,
  EditAvailabilitySlot,
} from "./types";
import moment from "moment";
import { header } from "./header";

// DOCTOR APIs

//LOGIN
// export const doc_login = async ({ email, password }: LoginData) => {
//   const res = await axios.post(URLS.hosptialLogin, {
//     email: email,
//     password: password,
//   });

//   console.error(res);
//   return res;
// };

//CREATE DOC PROFILE
export const createDoctorProfile = async ({
  name,
  email,
  dob,
  phno,
  gender,
  specialization,
  xp,
  qualification,
}: CreateDocProfileData) => {
  try {
    const res = await axios.post(
      URLS.doctor,
      {
        profile_picture: name,
        full_name: name,
        contact_number: phno,
        password: "test1234",
        email: email,
        gender: gender,
        specialization: specialization,
        experience_years: xp,
        qualification: qualification,
        created_by_user_id: 0,
        date_of_birth: dob,
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

//GET DOC LIST
export const getDoctorList = async () => {
  const res = await axios.get(URLS.doctor, {});
  return res;
};

//GET DOC DETAILS
export const getDoctorDetails = async (id: number) => {
  try {
    const res = await axios.get(`${URLS.doctor}/${id}`, {
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Update doctor profile
export const updateDoctor = async (id: number, data: DocProfileData) => {
  try {
    const res = await axios.put(`${URLS.doctor}/${id}`, data, {
      headers: header(),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//GET HOSPITAL LIST
export const getHospitalListByDoctorId = async (id: number) => {
  const res = await axios.get(`${URLS.doctor}/${id}/hospitals`, {});
  return res;
};

//HOSPITAL APIs

//LOGIN
export const hosptialLogin = async ({ email, password }: LoginData) => {
  try {
    const res = await axios.post(URLS.hosptialLogin, {
      email: email,
      password: password,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//CREATE HOSPITAL PROFILE
export const createHosptialProfile = async ({
  logo,
  name,
  address,
  contact_number,
  password,
  email,
  timing,
  parent_hospital_id,
  created_by,
}: HospitalProfileData) => {
  const res = await axios.post(URLS.hospital, {
    logo: logo,
    name: name,
    address: address,
    contact_number: contact_number,
    password: password,
    email: email,
    timing: timing,
    parent_hospital_id: parent_hospital_id,
    created_by: created_by,
  });
  return res;
};

//GET HOSPITAL DETAILS
export const getHosptialDetails = async (id: number) => {
  try {
    const res = await axios.get(`${URLS.hospital}/${id}`, {
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

//GET HOSPITAL LIST
export const getHosptialList = async () => {
  const res = await axios.get(URLS.hospital, {});
  return res;
};

//DELETE HOSPITAL
export const getHosptialDelete = async (id: number) => {
  const res = await axios.delete(`${URLS.hospital}/${id}`, {});
  return res;
};

export const changePW = async (oldPW: string, newPW: string, id: number) => {
  try {
    const res = await axios.post(URLS.changePW, {
      oldPassword: oldPW,
      newPassword: newPW,
      hospitalId: id,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Refresh Token
export const hitRefreshToken = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    const res = await axios.post(URLS.refreshToken, {
      accessToken: accessToken,
      refreshToken: refreshToken,
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

//HospitalDoctorMapping

//GET doctor availability using mapping id
export const getDoctorAvailability = async (id: number) => {
  try {
    const res = await axios.get(`${URLS.hospitalDoctorMap}/${id}`, {
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

//ADD doctor to a hospital
export const addDoctorToHospital = async ({
  hospitalID,
  doctor_id,
  doctor_availability,
}: AddDocData) => {
  try {
    const res = await axios.post(
      `${URLS.getDoctorList}/${hospitalID}/doctor`,
      {
        doctor_id: doctor_id,
        created_by_user_id: 0,
        doctor_availability: doctor_availability,
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

//GET list of doctors by hospital id
export const getDoctorListByHospitalId = async (id: number) => {
  try {
    const res = await axios.get(`${URLS.getDoctorList}/${id}/doctors`, {
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Update doctor availability by availability id
export const updateDoctorAvailability = async (
  data: EditAvailabilitySlot[]
) => {
  try {
    const res = await axios.put(
      URLS.hospitalDoctorMap,
      { updateRecords: data },
      {
        headers: header(),
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Update doctor availability by availability id
export const addDoctorAvailability = async (
  id: number,
  data: EditAvailabilitySlot[]
) => {
  try {
    const res = await axios.post(
      `${URLS.hospitalDoctorMap}/${id}`,
      { doctor_availability: data },
      {
        headers: header(),
      }
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//BOOKING APIs

//Add new booking
export const addBooking = async ({
  mapping_id,
  trimName,
  gender,
  phno,
  dob,
  type,
  booked_date,
  booked_slot_time,
  availability_id,
  start_time,
  end_time,
}: addBookingData) => {
  try {
    const res = await axios.post(
      URLS.booking,
      {
        mapping_id: mapping_id,
        full_name: trimName,
        gender: gender,
        address: "test",
        contact_number: "91" + phno,
        email: "",
        date_of_birth: dob,
        symptoms: "test",
        booking_mode: type,
        booked_date: booked_date,
        booked_slot_time: booked_slot_time,
        is_confirmed: true,
        availability_id: availability_id,
        booking_session_start_time: start_time,
        booking_session_end_time: end_time,
      },
      { headers: header() }
    );
    return res;
  } catch (error: any) {
    if (error.response) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};

//Get booking details by booking id
export const getBookingDetailsByBookingId = async (id: number) => {
  const res = await axios.get(`${URLS.booking}/${id}`, {});
  return res;
};

//Get list of booking by patient id
export const getBookingListByPatientId = async (id: number) => {
  const res = await axios.get(`${URLS.booking}/patient/${id}`, {});
  return res;
};

//Get list of booking by doctor id
export const getBookingListByMappingId = async (
  id: number,
  date: string | undefined,
  session: number | undefined
) => {
  try {
    const res = await axios.get(`${URLS.booking}/doctor/${id}`, {
      params: { date: date, session: session },
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Get bookings by hospital id
export const getBookingListByHospitalId = async (id: number) => {
  const date = moment().format("YYYY-MM-DD");
  try {
    const res = await axios.get(`${URLS.booking}/hospital/${id}`, {
      params: { date: date },
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Update booking status
export const updateBookingStatus = async ({
  bookingId,
  status,
}: UpdateQueueData) => {
  try {
    const res = await axios.put(
      `${URLS.booking}/${bookingId}/status`,
      {
        status: status,
      },
      { headers: header() }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get bookings count by mapping id based on status
export const getBookingCount = async (
  id: number,
  date: string | undefined,
  session: number,
  status: number
) => {
  try {
    const res = await axios.get(`${URLS.booking}/doctor/${id}/count`, {
      params: { date: date, session: session, status: status },
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

//QUEUE APIs

//Get queue by mapping id
export const getQueueByMappingId = async (
  id: number,
  date: string | undefined
) => {
  try {
    const res = await axios.get(`${URLS.getQueue}/${id}`, {
      params: { date: date },
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Patient check-in by booking id
export const checkInPatientByBookingId = async (bookingId: number) => {
  const res = await axios.post(`${URLS.checkIn}`, { bookingId: bookingId });
  return res;
};

//Update queue status
export const updateQueueStatus = async ({
  bookingId,
  status,
}: UpdateQueueData) => {
  try {
    const res = await axios.put(URLS.queueStatus, {
      bookingId: bookingId,
      status: status,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Patient APIs

//Get patients by doctor mapping id
export const getPatientsByMappingID = async (
  id: number,
  date: string | undefined
) => {
  try {
    const res = await axios.get(`${URLS.getPatientsMapping}/${id}`, {
      params: { date: date },
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Get patients bt hospital id
export const getPatientsByHospitalID = async (id: number) => {
  try {
    const date = moment().format("YYYY-MM-DD");
    const res = await axios.get(`${URLS.getPatientsHospital}/${id}`, {
      params: { date: date },
      headers: header(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
