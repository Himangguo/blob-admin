import request from "./request";

export const getSearch = (keywords) => {
  return request({
    method: "get",
    url: "http://localhost:3000/search",
    params: {
      keywords,
    },
  });
};
