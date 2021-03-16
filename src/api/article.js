import request from "./request";
import { BASE_URL } from "./config";
const baseURL = "/moment";

// 发布文章
export const createArticle = (title, content, fileList) => {
  return request({
    method: "post",
    url: baseURL + "/create",
    data: {
      title,
      content,
      fileList,
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

// 获取评论列表
export const getCommentList = (momentId) => {
  return request({
    method: "get",
    url: "/comment",
    params: {
      momentId,
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

// 上传图片
export const uploadPicAction = () => {
  return `${BASE_URL}/upload/picture`;
};

// 文章有效性修改
export const validChange = (commentId, valid) => {
  return request({
    method: "patch",
    url: `${baseURL}/${commentId}/valid`,
    data: {
      valid,
    },
  });
};
