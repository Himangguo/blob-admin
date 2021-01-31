import request from "./request";

// 用户注册
export const userRegister = (data) => {
  return request({
    method: "post",
    url: "/user",
    data,
  });
};

// 用户登录
export const userLogin = (data) => {
  return request({
    method: "post",
    url: "/login",
    data,
  });
};

// 校验登录态是否有效
export const testTokenAuth = () => {
  return request({
    method: "get",
    url: "/test",
  });
};
