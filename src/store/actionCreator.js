import { CHANGE_USERINF } from "./constants";
// 修改用户信息action
export const changeUserInf = (userInfo) => ({
  type: CHANGE_USERINF,
  userInfo,
});
