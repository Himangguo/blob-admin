import request from "./request";
const baseURL = "/label";

// 创建标签
export const createLabel = (data) => {
  return request({
    method: "post",
    url: baseURL + "/createLabel",
    data,
  });
};
