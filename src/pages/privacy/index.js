import React, { memo, useState } from "react";
import { Divider, Alert, Modal } from "antd";
import PageHeader from "@/components/page-header";
import { PrivacyWrapper } from "./style";
export default memo(function Privacy(props) {
  const articleEntranceData = ["文章有效性入口"];
  const commentEntranceData = ["评论有效性入口"];
  const [articleVisible, setArticleVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  function handleOk() {
    props.history.push("/platform/article/blobList");
  }
  function handleCancel() {
    setArticleVisible(false);
    setCommentVisible(false);
  }
  function showToast(flag) {
    if (flag === 1) {
      setArticleVisible(true);
    } else {
      setCommentVisible(true);
    }
  }
  return (
    <PrivacyWrapper>
      <PageHeader title={props.route.name} />
      <Divider orientation="left">文章隐私入口</Divider>
      {articleEntranceData.map((item) => {
        return (
          <div className="entrance-item" onClick={() => showToast(1)}>
            {item}
          </div>
        );
      })}
      <Divider orientation="left">评论隐私入口</Divider>
      {commentEntranceData.map((item) => {
        return (
          <div className="entrance-item" onClick={() => showToast(2)}>
            {item}
          </div>
        );
      })}
      <Modal
        title="文章隐私"
        visible={articleVisible}
        okText="前往"
        cancelText="下次一定"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Alert
          message="如何操作"
          description="点击前往进入文章列表页面，通过操作列表中的公开/隐藏进行文章的隐私设置。在博客苗前台已公开的文章将正常显示，已隐藏的文章将只显示文章标题，正文显示：此文章属于私密文章，如需参考学习，可以给我留言。"
          type="warning"
          showIcon
        />
      </Modal>
      <Modal
        title="评论隐私"
        visible={commentVisible}
        okText="前往"
        cancelText="下次一定"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Alert
          message="如何操作"
          description="点击前往进入文章列表页面，点击详情进入文章详情页，在文章详情页底部有该文章的评论，将鼠标悬浮在对于的评论item上可以进行显示/隐藏操作。在博客苗前台已显示的评论将正常显示，已隐藏的评将显示：该评论被博主吃了。"
          type="warning"
          showIcon
        />
      </Modal>
    </PrivacyWrapper>
  );
});
