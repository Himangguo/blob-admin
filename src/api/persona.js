import request from "./request";
const baseUrl = "persona";
// 音乐搜索
export const getSearch = (keywords) => {
  return request({
    method: "get",
    url: baseUrl + "/music/search",
    params: {
      keywords,
    },
  });
};

// 获取背景乐
export const getBgMusicId = () => {
  return request({
    method: "get",
    url: baseUrl + "/music/getBgMusicId",
  });
};

// 修改背景乐
export const setupBgMusic = (musicId) => {
  return request({
    method: "patch",
    url: baseUrl + "/music/patch",
    data: {
      musicId,
    },
  });
};

// 创建背景乐
export const createBgMusic = (musicId) => {
  return request({
    method: "post",
    url: baseUrl + "/music/setup",
    data: {
      musicId,
    },
  });
};
