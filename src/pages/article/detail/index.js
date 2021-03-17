import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  createElement,
} from "react";
import { Breadcrumb, Comment, Avatar, Divider, Tooltip, message } from "antd";
import {
  RestOutlined,
  RestFilled,
  ReadOutlined,
  ReadFilled,
} from "@ant-design/icons";
import moment from "moment";
import "moment/locale/zh-cn";

import ArticleRender from "./article-render";
import { DetailWrapper } from "./style";
import {
  getrticleDetailById,
  getCommentList,
  commentValidChange,
} from "@/api/article";
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
  const showComment = useCallback((id) => {
    console.log("开放", id);
    commentValidChange(id, 1).then((res) => {
      console.log("commentValidChange", res);
      message.success("该评论已开放");
      _getCommentList(props.match.params.id);
    });
  });
  const hideComment = useCallback((id) => {
    console.log("隐藏", id);
    commentValidChange(id, 0).then((res) => {
      console.log("commentValidChange", res);
      message.success("该评论已隐藏");
      _getCommentList(props.match.params.id);
    });
  });
  const ExampleComment = ({
    children,
    id,
    name,
    avatar,
    content,
    time,
    valid,
  }) => (
    <Comment
      style={{ background: "#fafbfc", marginBottom: "10px" }}
      author={<a>{name}</a>}
      avatar={<Avatar src={avatar} />}
      actions={[
        <Tooltip key="comment-show" title="开放">
          <span onClick={() => showComment(id)}>
            {createElement(valid === 1 ? ReadFilled : ReadOutlined)}
          </span>
        </Tooltip>,
        <Tooltip key="comment-hide" title="隐藏">
          <span onClick={() => hideComment(id)}>
            {React.createElement(valid === 0 ? RestFilled : RestOutlined)}
          </span>
        </Tooltip>,
        <span key="comment-is-show">
          {valid ? (
            <span style={{ color: "#1DA57A" }}>已开放 </span>
          ) : (
            <span style={{ color: "red" }}>已隐藏</span>
          )}
        </span>,
      ]}
      datetime={
        <Tooltip title={moment(time).format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment(time).fromNow()}</span>
        </Tooltip>
      }
      content={<p className="comment-content">{content}</p>}
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
              time={item.updateTime}
              content={item.content}
              valid={item.valid}
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
              time={item.updateTime}
              content={item.content}
              valid={item.valid}
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
              time={item.updateTime}
              content={item.content}
              valid={item.valid}
            />
          );
        } else {
          return (
            <ExampleComment
              key={item.id}
              id={item.id}
              name="匿名用户"
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              time={item.updateTime}
              content={item.content}
              valid={item.valid}
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
      <Divider orientation="left" plain>
        评论区
      </Divider>
      {renderComment(commentList)}
    </DetailWrapper>
  );
});
