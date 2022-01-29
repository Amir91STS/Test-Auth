import axios from "axios";
import { toast } from "react-toastify";
import Env from "../config/env";

const configAxios = () => {
  axios.interceptors.request.use(function (config) {
    config.baseURL = Env.BASE_URL;

    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        toast.error("Error");
      } else if (error.response && error.response.status === 400) {
        const errors = error.response.data;

        console.log("Errors");
      } else {
        console.log("Server Error");
      }
      throw new Error(error);
    }
  );
};

configAxios();
