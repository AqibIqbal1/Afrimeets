import ApiHandler from ".";
import { AUTH_ENDPOINTS } from "./endpoints";
import { AxiosResponse } from "axios";

const signUp = async (body: any) => {
  try {
    const response = await ApiHandler().post(AUTH_ENDPOINTS.SIGN_UP, body);
    console.log("Signup Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("Signup Error:", error?.data?.error?.message );
    throw error;
  }
};

const login = async (body: any) => {
  try {
    const response: AxiosResponse = await ApiHandler().post(
      AUTH_ENDPOINTS.LOGIN,
      body
    );
    console.log("Login Response:", response.data);
    return response.data;
  } catch (error: any) {
    console.log("Login Error:",  error?.data?.error?.message || error.message);
    throw error;
  }
};

export { signUp, login };
