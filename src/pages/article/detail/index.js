import React, { memo, useCallback, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import ArticleRender from "./article-render";
import { DetailWrapper } from "./style";
import { getrticleDetailById } from "@/api/article";

export default memo(function ArticleDetail(props) {
  const [content, setContent] = useState("");
  const [title,setTitle] = useState("");
  useEffect(() => {
    console.log("adsgag");
    console.log(props.match.params.id);
    _getrticleDetail(props.match.params.id);
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
      <ArticleRender title={title} content={content}  />
    </DetailWrapper>
  );
});
