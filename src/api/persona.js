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

// 设置成背景乐
export const setupBgMusic = (musicId) => {
  return request({
    method: "patch",
    url: baseUrl + "/music/patch",
    data: {
      musicId,
    },
  });
};
