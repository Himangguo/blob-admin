import React, { memo, useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import moment from "moment";
// api
import { getUserDetailInfo } from "@/api/user";
import { FormWrapper } from "./style";
import { updateUserInfo } from "../../api/user";
import { shallowEqual, useSelector } from "react-redux";
export default memo(function Home() {
  const { userInfo } = useSelector(
    (state) => ({
      userInfo: state.userInfo,
    }),
    [shallowEqual]
  );
  const [user, setUser] = useState({
    name: "",
    createAt: "",
    email: "",
    age: 0,
    websiteName: "",
    qq: "",
    github: "",
  });
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  useEffect(() => {
    _getUserDetailInfo();
  }, []);
  function _getUserDetailInfo() {
    getUserDetailInfo().then((res) => {
      setUser(res[0]);
    });
  }
  function handleItemChange(value, name) {
    setUser({
      ...user,
      [name]: value,
    });
  }
  function handleFormSubmit() {
    console.log(user, userInfo.id);
    updateUserInfo(userInfo.id, user).then((res) => {
      console.log(res);
      if (res.affectedRows) {
        message.success("更新信息成功");
        _getUserDetailInfo();
      }
    });
  }
  return (
    <FormWrapper>
      <Form className="form" {...layout} name="nest-messages">
        <Form.Item label="账号">
          <Input
            value={user.name}
            disabled
            onChange={(e) => {
              handleItemChange(e.target.value, "name");
            }}
          />
        </Form.Item>
        <Form.Item label="账号创建时间">
          <Input
            value={moment(user.createAt).format("YYYY-MM-DD HH:mm:ss")}
            disabled
            onChange={(e) => {
              handleItemChange(e.target.value, "createAt");
            }}
          />
        </Form.Item>
        <Form.Item label="邮箱">
          <Input
            value={user.email}
            onChange={(e) => {
              handleItemChange(e.target.value, "email");
            }}
          />
        </Form.Item>
        <Form.Item label="年龄">
          <InputNumber
            value={user.age}
            onChange={(e) => {
              handleItemChange(e, "age");
            }}
          />{" "}
        </Form.Item>
        <Form.Item label="博客名">
          <Input
            value={user.websiteName}
            onChange={(e) => {
              handleItemChange(e.target.value, "websiteName");
            }}
          />
        </Form.Item>
        <Form.Item label="QQ">
          <Input
            value={user.qq}
            onChange={(e) => {
              handleItemChange(e.target.value, "qq");
            }}
          />
        </Form.Item>
        <Form.Item label="github">
          <Input
            value={user.github}
            onChange={(e) => {
              handleItemChange(e.target.value, "github");
            }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" onClick={handleFormSubmit}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
});
