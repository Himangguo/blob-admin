import React, { memo, useEffect, useState } from "react";
import moment from "moment";
import PageHeader from "@/components/page-header";
import { Table, Tag, Space, Popconfirm, message, Badge } from "antd";
import { BlobListWrapper } from "./style";
import { getArticleList, delArticleById, validChange } from "@/api/article";
export default memo(function BlobList(props) {
  const { Column } = Table;
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    onChange: (page, pageSize) => {
      console.log(pagination);
      _getArticleList(page, pageSize);
    },
  });

  useEffect(() => {
    _getArticleList(1, pagination.pageSize);
  }, []);
  function _getArticleList(page, pageSize) {
    console.log(page, pageSize);
    getArticleList((page - 1) * pageSize, pageSize).then((res) => {
      console.log("getArticleList", res);
      if (res?.list?.length > 0) {
        setData(res.list);
        setPagination({ ...pagination, current: page, total: res.total });
      }
    });
  }
  function hideArticle(id) {
    validChange(id, 0).then((res) => {
      console.log("validChange", res);
      message.success("已隐藏该文章");
      _getArticleList(pagination.current,pagination.pageSize);
    });
  }
  function openArticle(id) {
    validChange(id, 1).then((res) => {
      console.log("validChange", res);
      message.success("已公开该文章");
      _getArticleList(pagination.current,pagination.pageSize);
    });
  }
  function handleArticleDel(record) {
    console.log(record);
    delArticleById(record.id).then((res) => {
      console.log("delArticleById", res);
      _getArticleList(pagination.current,pagination.pageSize);
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
      <Table dataSource={data} pagination={pagination}>
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
          title="隐私"
          dataIndex="valid"
          key="valid"
          render={(valid) => (
            <>
              {valid ? (
                <div>
                  {" "}
                  <Badge status="success" />
                  已公开
                </div>
              ) : (
                <div>
                  {" "}
                  <Badge status="error" />
                  已隐藏
                </div>
              )}
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
              {record.valid ? (
                <a
                  onClick={() => {
                    hideArticle(record.id);
                  }}
                >
                  隐藏
                </a>
              ) : (
                <a
                  onClick={() => {
                    openArticle(record.id);
                  }}
                >
                  公开
                </a>
              )}

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
