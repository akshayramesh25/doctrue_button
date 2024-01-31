export const header = () => {
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    ...(token && { Authorization: `Bearer ${token}` }),
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return headers;
};
