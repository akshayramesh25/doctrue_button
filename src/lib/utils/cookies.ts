import moment from "moment";

export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number
) => {
  const expires = moment().add(daysToExpire, "days").toDate().toUTCString();
  document.cookie = `${name}=${value};expires=${expires};path=/`;
};

export const getCookie = (name: string): string | undefined => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return undefined;
};

export const deleteCookie = (name: string) => {
  // Set the cookie's expiration date to one day in the past
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
};
