export type LoginData = {
  email: string;
  password: string;
};

export type CreateDocProfileData = {
  name: string;
  gender: string;
  dob: string;
  phno: number | undefined;
  email?: string;
  specialization: string;
  xp: number | undefined;
  qualification: string;
};

export type DocProfileData = {
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
  created_by: string;
  updated_by_user_id: number;
  updated_at?: string;
  created_at: string;
};

export type HospitalProfileData = {
  hospital_id: string;
  logo: string;
  name: string;
  address: string;
  contact_number: string;
  password: string;
  email: string;
  timing: string;
  parent_hospital_id: string;
  created_by: number;
};

export type DocAvailabilityData = {
  availability_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  max_patients_per_slot: number;
  wait_time: {
    minutes: number;
  };
};

export type QueueData = {
  booking_id: string;
  token_number: number;
  mapping_id: string;
  patient_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  gender: string;
  date_of_birth: string;
  symptoms: string;
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
};

export type AddDocData = {
  hospitalID: string;
  doctor_id: string;
  doctor_availability: {
    day_of_week: number;
    start_time: string;
    end_time: string;
    max_patients_per_slot: string;
    wait_time: string;
  }[];
};

export type addBookingData = {
  mapping_id: string;
  trimName: string;
  gender: string;
  phno: string;
  dob: string;
  type: string;
  booked_date: string;
  booked_slot_time: string;
  availability_id: string;
  start_time: string;
  end_time: string;
};

export type UpdateQueueData = {
  bookingId: string;
  status: number;
};

export interface EachSession {
  availability_id?: string;
  day_of_week: number; // 1 for Sunday, 2 for Monday, ..., 7 for Saturday
  start_time: string;
  end_time: string;
  max_patients_per_slot: string;
  wait_time: string;
  selected: boolean;
}

export interface EditSession {
  availability_id: string;
  day_of_week: number; // 1 for Sunday, 2 for Monday, ..., 7 for Saturday
  start_time: string;
  end_time: string;
  max_patients_per_slot: number;
  wait_time: { minutes: number };
  selected: boolean;
}

export interface DaySessions {
  sessions: {
    [key: string]: EachSession;
  };
  selected: boolean;
}

export interface EditDaySessions {
  sessions: {
    [key: string]: EditSession;
  };
  selected: boolean;
}

export interface WeekSchedule {
  1: DaySessions; // Sunday
  2: DaySessions; // Monday
  3: DaySessions; // Tuesday
  4: DaySessions; // Wednesday
  5: DaySessions; // Thursday
  6: DaySessions; // Friday
  7: DaySessions; // Saturday
}

export interface AvailabilitySlot {
  availability_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  max_patients_per_slot: number;
  wait_time: {
    minutes: number;
  };
  selected?: boolean;
}

export interface EditAvailabilitySlot {
  availability_id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  max_patients_per_slot: number;
  wait_time: string;
  selected?: boolean;
}

export interface PatientsData {
  booking_id: string;
  patient_id: string;
  full_name: string;
  email: string;
  contact_number: string;
  address: string;
  gender: string;
  date_of_birth: string;
  symptoms: string;
  booking_mode: string;
  booked_date: string;
  booked_slot_time: string;
  booking_time: string;
  is_confirmed: boolean;
  status: number;
  last_updated_at: string;
}
