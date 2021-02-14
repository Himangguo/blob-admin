import React, { memo, useEffect } from "react";
import { Breadcrumb } from "antd";
import { DetailWrapper } from "./style";

export default memo(function ArticleDetail(props) {
  useEffect(() => {
    console.log("adsgag");
    console.log(props.match.params.id);
  }, []);
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
    </DetailWrapper>
  );
});
