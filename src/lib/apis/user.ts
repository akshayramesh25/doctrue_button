import axios from "axios";
import { header } from "../utils/header";
import { baseURL } from "../utils/constants";
import { LoginData } from "../utils/types";

//User Login
export const userLogin = async ({ email, password }: LoginData) => {
  try {
    const res = await axios.post(`${baseURL}/user/login`, {
      email: email.trim(),
      password: password.trim(),
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

//Get User Details By User ID
export const getUserDetails = async (user_id: string) => {
  try {
    const res = await axios.get(`${baseURL}/user/${user_id}`, {
      headers: header(),
    });
    return res;
  } catch (error: any) {
    if (error.response || error.response.status === 403) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};

//Update user details
export const updateUserPassword = async (user_id: string, password: string) => {
  try {
    const res = await axios.patch(
      `${baseURL}/user/${user_id}`,
      {
        password: password,
      },
      { headers: header() }
    );
    return res;
  } catch (error: any) {
    if (error.response || error.response.status === 403) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};

//Refresh Token
export const hitRefreshToken = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    const res = await axios.post(`${baseURL}/user/refresh`, {
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    return res;
  } catch (error: any) {
    if (error.response || error.response.status === 403) {
      return error.response;
    } else {
      console.error(error);
    }
  }
};
