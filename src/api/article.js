import request from "./request";
const baseURL = "/moment";

// 发布文章
export const createArticle = (title, content) => {
  return request({
    method: "post",
    url: baseURL + "/create",
    data: {
      title,
      content,
    },
  });
};

// 将文章与标签关联
export const relaMomentToLabel = (momentId, ids) => {
  return request({
    method: "post",
    url: `${baseURL}/${momentId}/relaMomentToLabel`,
    data: {
      labelIds: ids,
    },
  });
};

// 获取文章列表
export const getArticleList = (offset, size) => {
  return request({
    method: "get",
    url: baseURL + "/getList",
    params: {
      offset,
      size,
    },
  });
};

// 删除文章
export const delArticleById = (id) => {
  return request({
    method: "delete",
    url: `${baseURL}/${id}/delete`,
  });
};

// 获取文章详情
export const getrticleDetailById = (id) => {
  return request({
    method: "get",
    url: `${baseURL}/detail`,
    params: {
      id,
    },
  });
};
