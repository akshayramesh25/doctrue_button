import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";
import { getUserDetails, hitRefreshToken, userLogin } from "../apis/user";
import { LoginData, User } from "../utils/types";

interface UserDataContextInterface {
  handleLogin: ({ email, password }: LoginData, event: any) => Promise<void>;
  userID: string | undefined;
  handleLogout: () => Promise<any>;
  userData: User | undefined;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const UserDataContext = createContext({} as UserDataContextInterface);

type UserDataProviderProps = {
  children?: React.ReactNode;
};

const UserContext = ({ children }: UserDataProviderProps) => {
  const navigate = useNavigate();
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  const userID = getCookie("userID");

  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const onAuthStateChanged = async () => {
      if (!accessToken || !refreshToken || !userID) {
        console.log("Cookies not present, logged out.");
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        deleteCookie("userID");
        navigate("/");
      } else if (accessToken && refreshToken && userID) {
        const user_data = await getUserDetails(userID);

        if (user_data?.status === 200) {
          setUserData(user_data.data.result);
        } else if (user_data?.status === 401) {
          const refresh_data = await hitRefreshToken(accessToken, refreshToken);
          if (refresh_data?.status === 200) {
            console.log("Refresh");
            setCookie("accessToken", refresh_data.data.result.access_token, 30);
            setCookie(
              "refreshToken",
              refresh_data.data.result.refresh_token,
              30
            );
            const user_data = await getUserDetails(userID);
            if (user_data?.status === 200) setUserData(user_data.data.result);
          } else {
            deleteCookie("accessToken");
            deleteCookie("refreshToken");
            deleteCookie("userID");
            navigate("/");
          }
        }
      } else console.error("Hospital ID invalid or not present.");
    };

    onAuthStateChanged();
  }, [, accessToken, refreshToken, userID, navigate]);

  const handleLogin = async ({ email, password }: LoginData, event: any) => {
    event.preventDefault();
    if (!email) {
      toast.error("Invalid email.");
    } else if (password.length <= 7) {
      toast.error("Password needs to have more than 8 characters.");
    } else {
      const res = await userLogin({ email, password });
      if (res?.status === 200) {
        const loginData = res.data.result;
        toast.success("Sign in successful!");
        setCookie("accessToken", loginData.access_token, 30);
        setCookie("refreshToken", loginData.refresh_token, 30);
        setCookie("userID", loginData.user_id, 30);

        const user_data = await getUserDetails(loginData.user_id);
        if (user_data?.status === 200) setUserData(user_data.data.result);
      } else toast.error("Wrong email/password entered.");
    }
  };

  const handleLogout = async () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("userID");
    setUserData(undefined);

    navigate("/");
  };

  return (
    <UserDataContext.Provider
      value={{
        handleLogin,
        userID,
        userData,
        setUserData,
        handleLogout,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export function useUserData() {
  return useContext(UserDataContext);
}

export default UserContext;
