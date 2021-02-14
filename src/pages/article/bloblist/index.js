import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import PageHeader from "@/components/page-header";
import { Table, Tag, Space, Popconfirm, message } from "antd";
import { BlobListWrapper } from "./style";
import { getArticleList, delArticleById } from "@/api/article";
export default memo(function BlobList(props) {
  const { Column } = Table;
  const [data, setData] = useState([]);
  useEffect(() => {
    _getArticleList();
  }, []);
  function _getArticleList() {
    getArticleList().then((res) => {
      console.log("getArticleList", res);
      setData(res);
    });
  }
  function handleArticleDel(record) {
    console.log(record);
    delArticleById(record.id).then((res) => {
      console.log("delArticleById", res);
      _getArticleList();
      message.success("删除成功");
    });
  }

  function goArticleDetail(id) {
    console.log("go");
    props.history.push(`/platform/article/detail/${id}`);
  }
  return (
    <BlobListWrapper>
      <PageHeader title={props.route.name} />
      <Table dataSource={data}>
        <Column title="文章标题" dataIndex="title" key="title" />
        <Column
          title="文章内容"
          dataIndex="content"
          key="content"
          render={(text) => (
            <div className="article_content" title={text}>
              {text}
            </div>
          )}
        />
        <Column
          title="更新时间"
          dataIndex="updateTime"
          key="updateTime"
          render={(text) => moment(text).format("YYYY-MM-DD HH:mm:ss")}
        />
        <Column
          title="标签"
          dataIndex="labels"
          key="labels"
          render={(labels) => (
            <>
              {labels &&
                labels.map((label) => (
                  <Tag color="blue" key={label}>
                    {label}
                  </Tag>
                ))}
            </>
          )}
        />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a
                onClick={() => {
                  goArticleDetail(record.id);
                }}
              >
                详情
              </a>
              <Popconfirm
                title="确定删除这篇文章?"
                onConfirm={() => {
                  handleArticleDel(record);
                }}
                okText="Yes"
                cancelText="No"
              >
                <a href="#">删除</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    </BlobListWrapper>
  );
});
