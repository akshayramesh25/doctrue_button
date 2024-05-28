import axios from "axios";
import moment from "moment";
import { header } from "../utils/header";
import {
  FollowUp,
  Reschedule,
  SlotToken,
  UpdateBookingStatus,
  addBookingData,
} from "../utils/types";
import { baseURL } from "../utils/constants";

//Get bookings by hospital id
export const getBookingListByHospitalId = async (id: string | undefined) => {
  const date = moment().format("YYYY-MM-DD");
  try {
    const res = await axios.get(`${baseURL}/booking/hospital/${id}`, {
      params: { date: date },
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

//Get Booking List by Availability Id
export const getBookingListByAvailabilityId = async (
  availability_id: string | undefined,
  date: string
) => {
  try {
    const res = await axios.get(
      `${baseURL}/booking/doctor/availabilities/${availability_id}?date=${date}`,
      { headers: header() }
    );
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

//Get Slots
export const getSlots = async (data: SlotToken) => {
  try {
    const res = await axios.post(
      `${baseURL}/hospital/availability/slots`,
      data,
      {
        headers: header(),
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get Tokens
export const getTokens = async (data: SlotToken) => {
  try {
    const res = await axios.post(
      `${baseURL}/hospital/availability/tokens`,
      data,
      {
        headers: header(),
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Add new booking
export const addBooking = async (req: addBookingData) => {
  console.log(req);
  try {
    const res = await axios.post(`${baseURL}/booking`, req, {
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

//Reschedule Booking
export const rescheduleBooking = async (
  booking_id: string,
  req: Reschedule
) => {
  try {
    const res = await axios.patch(
      `${baseURL}/booking/reschedule/${booking_id}`,
      req,
      { headers: header() }
    );
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

//Follow-Up
export const addFollowUp = async (req: FollowUp) => {
  try {
    const res = await axios.post(`${baseURL}/booking/followup`, req, {
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

//Update booking status
export const updateBookingStatus = async ({
  bookingId,
  status,
}: UpdateBookingStatus) => {
  try {
    const res = await axios.put(
      `${baseURL}/booking/${bookingId}/status`,
      {
        status: status,
      },
      { headers: header() }
    );
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

//Get OnGoing ID
export const getOnGoing = async (
  id: string,
  session: string,
  date: string | undefined
) => {
  try {
    const res = await axios.get(`${baseURL}/queue/${id}/${session}`, {
      params: { date: date },
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
