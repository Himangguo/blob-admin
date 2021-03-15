import request from "./request";
import {BASE_URL} from "./config"
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

// 获取个人信息
export const getUserDetailInfo = () => {
  return request({
    method: "get",
    url: "/user/getInfo",
  });
};

// 修改个人信息
export const updateUserInfo = (userid, data) => {
  return request({
    method: "patch",
    url: "/user/" + userid,
    data,
  });
};

// 上传头像
export const uploadAvatarAction = () => {
  return `${BASE_URL}/upload/avatar`;
};

// 获取头像
export const getAvatarUrl = (id) => {
  return `${BASE_URL}/user/${id}/avatar`;
};
