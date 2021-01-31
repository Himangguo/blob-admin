import { CHANGE_USERINF } from "./constants";
// 修改用户信息action
export const changeUserInf = (inf) => ({
  type: CHANGE_USERINF,
  inf,
});
