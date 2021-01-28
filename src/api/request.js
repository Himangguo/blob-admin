import axios from "axios";
import { BASE_URL, TIME_OUT } from "./config";
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.error(err);
  }
);
instance.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (err) => {
    if (err && err.response) {
      console.log(err.response);
    }
    return err;
  }
);

export default instance;
