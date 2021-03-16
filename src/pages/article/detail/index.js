import React, { memo, useCallback, useEffect, useState } from "react";
import { Breadcrumb, Comment, Avatar } from "antd";
import ArticleRender from "./article-render";
import { DetailWrapper } from "./style";
import { getrticleDetailById, getCommentList } from "@/api/article";

export default memo(function ArticleDetail(props) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    console.log("adsgag");
    console.log(props.match.params.id);
    _getrticleDetail(props.match.params.id);
    _getCommentList(props.match.params.id);
  }, []);
  const _getrticleDetail = useCallback(
    (id) => {
      getrticleDetailById(id).then((res) => {
        console.log("getrticleDetailById", res[0]);
        setContent(res[0].content);
        setTitle(res[0].title);
      });
    },
    [getrticleDetailById]
  );

  const _getCommentList = useCallback(
    (momentId) => {
      getCommentList(momentId).then((res) => {
        console.log("getCommentList", res);
        setCommentList(res);
      });
    },
    [getCommentList]
  );
  const ExampleComment = ({ children, id, name, avatar, content }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply to</span>]}
      author={<a>{name}</a>}
      avatar={<Avatar src={avatar} alt={name} />}
      content={<p>{content}</p>}
    >
      {children}
    </Comment>
  );
  function renderComment(commentList) {
    return commentList.map((item) => {
      if (item.children) {
        if (item.user) {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name={item.user.name}
              avatar={item.user.avatar}
              content={item.content}
            >
              {renderComment(item.children)}
            </ExampleComment>
          );
        } else {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name="匿名用户"
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              content={item.content}
            >
              {renderComment(item.children)}
            </ExampleComment>
          );
        }
      } else {
        if (item.user) {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name={item.user.name}
              avatar={item.user.avatar}
              content={item.content}
            />
          );
        } else {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name="匿名用户"
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              content={item.content}
            />
          );
        }
      }
    });
  }
  return (
    <DetailWrapper>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/platform/article/blobList");
            }}
          >
            文章列表
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>文章详情</Breadcrumb.Item>
      </Breadcrumb>
      <ArticleRender title={title} content={content} />
      {/* 评论 */}
      {renderComment(commentList)}
    </DetailWrapper>
  );
});
