import getCookie from "@/utility/cookies";
import axios from "axios";

export const baseURL = "https://backend.afrimeets.net";

const ApiHandler = (isMultipart = false) => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      ["Content-Type"]: isMultipart
        ? "multipart/form-data"
        : "application/json",
    },
  });
  instance.interceptors.request.use(
    (config) => {
      try {
        const token = getCookie("auth-token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    (error) => {
      console.log("REQUEST error ==>> ", error);
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Error Response", error?.response);
      }
      return Promise.reject(error.response);
    }
  );

  return instance;
};
export default ApiHandler;
