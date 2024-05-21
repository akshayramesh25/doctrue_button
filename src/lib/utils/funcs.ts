import moment from "moment-timezone";
import { EditDaySessions } from "./types";

type FormattedDate = {
  tareek: number; // Day of the month as a number
  day: string; // Abbreviated day of the week, e.g., 'Mon', 'Tue'
  date: string; // Full date in 'YYYY-MM-DD' format
};

function getFormattedDay(date: moment.Moment): string {
  return date.format("ddd"); // 'ddd' formats the day as an abbreviated string, e.g., 'Mon', 'Tue'.
}

export function getDatesAroundToday(offset: number = 0): FormattedDate[] {
  const dates: FormattedDate[] = [];

  // Start from the offset
  for (let i = offset - 2; i <= offset + 2; i++) {
    const targetDate: moment.Moment = moment().add(i, "days"); // Add i days to the current date

    const formattedDate: FormattedDate = {
      tareek: targetDate.date(), // Gets the day of the month
      day: getFormattedDay(targetDate), // Use the function to get the formatted day
      date: targetDate.format("YYYY-MM-DD"), // Formats the date as a string, e.g., '2024-02-12'
    };

    dates.push(formattedDate);
  }
  return dates;
}

export function convertToMinutes(timeStr: string): number {
  const parsedTime = moment(timeStr, "hh:mm A");
  return parsedTime.hours() * 60 + parsedTime.minutes();
}

export function getDatesFromSunToSat(weekOffset: number = 0) {
  const dates = [];
  const currentDate = moment().add(weekOffset, "weeks");

  for (let i = 0; i < 7; i++) {
    const targetDate = currentDate.clone().startOf("week").add(i, "days");

    const formattedDate = {
      tareek: targetDate.date(),
      day: targetDate.format("ddd"),
      date: targetDate.format("YYYY-MM-DD"),
      month: targetDate.format("MMMM"),
    };

    dates.push(formattedDate);
  }
  return dates;
}

export type TimeOfDay =
  | "morning"
  | "afternoon"
  | "evening"
  | "morningEnd"
  | "afternoonEnd"
  | "eveningEnd";

export const generateTimeOptions = (timeOfDay: TimeOfDay) => {
  const times = [];
  const format = "hh:mm A";

  let startTime, endTime;

  switch (timeOfDay) {
    case "morning":
      startTime = moment().startOf("day").hour(6); // up to 6 AM
      endTime = moment().startOf("day").hour(12); // up to 12 PM
      break;
    case "afternoon":
      startTime = moment().startOf("day").hour(12); // starting from 12 PM
      endTime = moment().startOf("day").hour(17); // up to 5 PM
      break;
    case "evening":
      startTime = moment().startOf("day").hour(17); // starting from 5 PM
      endTime = moment().endOf("day");
      break;
    case "morningEnd":
      startTime = moment().startOf("day").hour(6); // starting from 5 PM
      endTime = moment().endOf("day");
      break;
    case "afternoonEnd":
      startTime = moment().startOf("day").hour(12); // starting from 5 PM
      endTime = moment().endOf("day");
      break;
    case "eveningEnd":
      startTime = moment().startOf("day").hour(17); // starting from 5 PM
      endTime = moment().endOf("day");
      break;
    default:
      throw new Error("Invalid time of day");
  }

  let currentTime = startTime;

  while (currentTime.isBefore(endTime)) {
    times.push(currentTime.format(format));
    currentTime.add(30, "minutes");
  }

  return times;
};

export const updateAvailability = (
  weekSchedule: {
    [key: number]: EditDaySessions;
  },
  mapping_id: string
) => {
  const finalData = [];
  for (let day in weekSchedule) {
    const eachDay = weekSchedule[day];

    if (eachDay.selected === true) {
      for (let session in eachDay.sessions)
        if (eachDay.sessions[session].selected === true) {
          const eachSession = eachDay.sessions[session];
          if (
            eachSession.start_time === "" ||
            eachSession.end_time === "" ||
            eachSession.wait_time.minutes === 0 ||
            eachSession.max_patients_per_slot === 0 ||
            eachSession.queue_type === "" ||
            eachSession.max_wa_tokens === 0
          ) {
            console.log(undefined);
          } else {
            const modifiedSession = {
              ...eachSession,
              wait_time: `${
                eachSession.wait_time.minutes ||
                eachSession.wait_time.seconds ||
                eachSession.wait_time
              } minutes`,
              is_active: true,
              mapping_id: mapping_id,
            };
            if (eachSession.availability_id === "") {
              const { selected, availability_id, ...rest } = modifiedSession;
              finalData.push(rest);
            } else {
              const { selected, ...rest } = modifiedSession;
              finalData.push(rest);
            }
          }
        }
    }
  }
  console.log(finalData);
  return finalData;
};

export const addAvailability = (weekSchedule: {
  [key: number]: EditDaySessions;
}) => {
  const finalData = [];
  for (let day in weekSchedule) {
    const eachDay = weekSchedule[day];

    if (eachDay.selected === true) {
      for (let session in eachDay.sessions)
        if (eachDay.sessions[session].selected === true) {
          const eachSession = eachDay.sessions[session];
          if (
            eachSession.availability_id !== "" ||
            eachSession.start_time === "" ||
            eachSession.end_time === "" ||
            eachSession.wait_time.minutes === 0 ||
            eachSession.max_patients_per_slot === 0
          ) {
          } else {
            const modifiedSession = {
              ...eachSession,
              wait_time: `${
                eachSession.wait_time.minutes || eachSession.wait_time
              } minutes`,
            };
            const { selected, availability_id, ...rest } = modifiedSession;
            finalData.push(rest);
          }
        }
    }
  }
  return finalData;
};

export function momentIN(dateString?: string) {
  return moment.tz(dateString, "Asia/Kolkata");
}

export const generateTimings = (
  slot: string | undefined,
  date: string | undefined
) => {
  const format = "hh:mm A";
  const slots = [];

  // Assuming the date is passed in the format "YYYY-MM-DD hh:mm A - hh:mm A"
  const datePart = date; // Extract the date part
  const today = moment().format("YYYY-MM-DD"); // Format today's date in the same format as the date part

  if (datePart === today) {
    // If the slot's date is today, check the start time
    let startMoment = moment(slot?.split(" - ")[0], "hh:mm A");
    const endMoment = moment(slot?.split(" - ")[1], "hh:mm A");
    const currentMoment = moment(); // Get the current moment

    if (startMoment.isBefore(currentMoment)) {
      // If the start time has already passed, adjust the startMoment to the next half-hour mark
      const minutes = currentMoment.minute();
      if (minutes < 30) {
        startMoment = currentMoment.minute(0).second(0);
      } else {
        startMoment = currentMoment.minute(30).second(0);
      }
    }

    while (startMoment.isBefore(endMoment)) {
      const endSlot = startMoment.clone().add(30, "minutes"); // Create a new moment for the end of the slot
      slots.push(`${startMoment.format(format)} - ${endSlot.format(format)}`);
      startMoment = endSlot; // Move the start to the end of the current slot for the next iteration
    }
  } else {
    // If the date is not today, generate slots as before
    let startMoment = moment(slot?.split(" - ")[0], "hh:mm A");
    const endMoment = moment(slot?.split(" - ")[1], "hh:mm A");

    while (startMoment.isBefore(endMoment)) {
      const endSlot = startMoment.clone().add(30, "minutes");
      slots.push(`${startMoment.format(format)} - ${endSlot.format(format)}`);
      startMoment = endSlot;
    }
  }

  return slots;
};

export function parseTime(timeStr: string) {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  const date = moment().set({
    hour: hours,
    minute: minutes,
    second: seconds,
    millisecond: 0,
  });
  return date.toDate();
}

export const formatTime = (date: Date) => {
  const formattedTime = moment(date).format("hh:mm A");
  return formattedTime;
};

export function divideTimeIntoSections(
  startTime: string,
  endTime: string,
  number_of_people: number,
  atpp: number
) {
  console.log(startTime, endTime, number_of_people, atpp);
  const sections = [];
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  // Calculate the time difference in hours
  let diff = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
  // Decide on the increment based on the time difference
  let increment = diff >= 5 ? 60 : 30; // 60 minutes for >= 5 hours difference, otherwise 30 minutes
  increment =
    increment > number_of_people * atpp
      ? increment
      : Math.round((number_of_people * atpp) / 10) * 10;

  while (start < end) {
    const sectionStart = formatTime(start);
    start.setMinutes(start.getMinutes() + increment); // Increment by decided minutes
    const sectionEnd = start <= end ? formatTime(start) : formatTime(end);
    sections.push(`${sectionStart} - ${sectionEnd}`);
  }

  return sections;
}

export const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// export const playSound = () => {
//   const audio = new Audio(require("../../assets/audio/nextPatientLong.opus"));
//   audio
//     .play()
//     .catch((error) => console.error("Error playing the sound:", error));
// };

export const getRouteSegment = (path: number) => {
  const pathSegments = window.location.pathname.split("/");
  return pathSegments[path] || "Home";
};
