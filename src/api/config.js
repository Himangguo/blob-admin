const devBaseUrl = "http://localhost:8000";
const proBaseUrl = "xxx";
const TIME_OUT = 5000; // 超时时间
const BASE_URL =
  process.env.NODE_ENV === "development" ? devBaseUrl : proBaseUrl;
export { TIME_OUT, BASE_URL };
