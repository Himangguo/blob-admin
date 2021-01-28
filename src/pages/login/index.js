import React, { memo, useState, useEffect } from "react";

// 导入第三方组件
import { Form, Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Motion, spring } from "react-motion";
// 导入styled
import { LoginWrapper } from "./style";
export default memo(function Login() {
  const [titlePosition, setTitlePosition] = useState(300);
  useEffect(() => {
    setTitlePosition(0);
  }, []);
  function onFinish(values) {
    console.log("Received values of form: ", values);
  }
  return (
    <LoginWrapper>
      <div className="login_box">
        <div className="login_header">
          <Motion
            style={{ x: spring(titlePosition, { stiffness: 170, damping: 7 }) }}
          >
            {(iStyle) => {
              return (
                <div style={{ transform: `translateX(${iStyle.x}px)` }}>
                  欢迎来到博客苗后台管理
                </div>
              );
            }}
          </Motion>
        </div>

        <div className="login_content">
          <div className="left_desc">开什么花都交给你了</div>
          <div className="right_form">
            <Divider orientation="left">miao~</Divider>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "请填写账号!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "请填写密码！",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button"
                >
                  注册
                </Button>
              </Form.Item>
            </Form>
            <Divider orientation="right">
              <span className="theme_color">miao~</span>
            </Divider>
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
});
