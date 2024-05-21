export type LoginData = {
  email: string;
  password: string;
};

export interface User {
  user_id: string;
  email: string;
  role: string;
}

export interface Hospital {
  mapping_id: string;
  hospital_id: string;
  parent_hospital_id: string | null;
  logo: string;
  hospital_name: string;
  hospital_address: string;
  hospital_contact_number: string;
  hospital_timing: string;
  hospital_created_at: string;
  hospital_created_by_user_id: string;
  hospital_updated_at: string;
  hospital_is_active: boolean;
  number_of_doctors: string;
  is_easy_heal: boolean;
  name: string;
  contact_number: string;
  email: string;
  address: string;
  timing: string;
  category: string;
}

export interface Doctor {
  doctor_id?: string;
  mapping_id: string;
  profile_picture: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  contact_number?: string;
  password: string;
  email?: string;
  specialization: string;
  experience_years: number;
  qualification: string;
  created_at: string;
  created_by_user_id: string;
  updated_by_user_id: number;
  updated_at?: string;
}

export interface DocAvailability {
  availability_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  max_patients_per_slot: number;
  wait_time: {
    minutes: number;
  };
  queue_type: string;
}

export type updateHospital = {
  hospital_id: string;
  hospital_timing: string | undefined;
  hospital_name: string | undefined;
  hospital_address: string | undefined;
};

export interface Booking {
  booking_id: string;
  reference_id: string;
  token_number: number;
  mapping_id: string;
  patient_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  gender: string;
  date_of_birth: string;
  comments: string;
  booking_mode: string;
  booked_date: string;
  booked_slot_time: string;
  booking_time: string;
  is_confirmed: boolean;
  status: number;
  availability_id: string;
  last_updated_at: string;
  updated_at: string;
  check_in_time: string;
  booked_slot_start: string;
  booked_slot_end: string;
  doctor_full_name: string;
  doctor_profile_picture: string;
  has_follow_up: boolean;
  patient_full_name: string;
  patient_contact_number: string;
  patient_email: string;
  patient_gender: string;
}

export type UpdateBookingStatus = {
  bookingId: string;
  status: number;
};

export interface Patient {
  booking_id: string;
  patient_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  gender: string;
  date_of_birth: string;
  comments: string;
  booking_mode: string;
  booked_date: string;
  booked_slot_time: string;
  booking_time: string;
  is_confirmed: boolean;
  status: number;
  last_updated_at: string;
  total_bookings: string;
}

export interface TotalPatients {
  booking_list: Patient[];
  total_distinct_bookings: string;
}

export interface SlotToken {
  mapping_id: string;
  booked_date: string | undefined;
  number_of_people: number;
  availability_id: string;
  start_time: string;
  end_time: string;
  bimba_slot?: string | undefined;
}

export interface addBookingData {
  booking_mode: string;
  booked_date: string;
  booking_session_start_time: string;
  booking_session_end_time: string;
  is_confirmed: boolean;
  symptoms: string;
  comments: string;
  availability_id: string;
  hospital_id: string;
  patient_id: string;
  doctor_id: string | undefined;
  queue_type: string | number | undefined;
  status: number;
  added_by: string;
  booked_slot_start?: string;
  booked_slot_end?: string;
  token_number?: number;
}

export interface Reschedule {
  added_by: string | undefined;
  booked_date: string;
  booking_session_start_time: string;
  booking_session_end_time: string;
  booked_slot_start: string;
  booked_slot_end: string;
  availability_id: string;
  token_number?: number;
}

export interface FollowUp {
  last_booking_id: string;
  booking_mode: string;
  booked_date: string;
  booking_session_start_time: string;
  booking_session_end_time: string;
  booked_slot_start: string;
  booked_slot_end: string;
  availability_id: string;
  comments: string;
  is_confirmed: boolean;
}

export type QueueType = ["Token", "Slot", "Slot_Token", "Session"];

export interface EditSession {
  availability_id: string;
  day_of_week: number; // 1 for Sunday, 2 for Monday, ..., 7 for Saturday
  start_time: string;
  end_time: string;
  max_patients_per_slot: number;
  wait_time: { hours?: number; minutes: number; seconds?: number };
  selected: boolean;
  is_active?: boolean;
  max_wa_tokens: number | null;
  queue_type?: string;
}

export interface EditDaySessions {
  sessions: {
    [key: string]: EditSession;
  };
  selected: boolean;
}
