import { getCookie } from "./cookies";

export const header = () => {
  const token = String(getCookie("accessToken"));
  const headers: Record<string, string> = {
    ...(token && { Authorization: `Bearer ${token}` }),
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return headers;
};
