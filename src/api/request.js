import axios from "axios";
import { BASE_URL, TIME_OUT } from "./config";
import { message } from "antd";
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

instance.interceptors.request.use(
  (config) => {
    // 将token放入Headers的Authorization字段中
    config.headers.Authorization = localStorage.getItem("token");
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
      console.log(err.response.data);
      message.error(err.response.data);
    }
  }
);

export default instance;
