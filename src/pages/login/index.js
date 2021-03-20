import React, { memo, useState, useEffect } from "react";

// 导入第三方组件
import { Form, Input, Button, Divider, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Motion, spring } from "react-motion";
// redux
import { useDispatch } from "react-redux";
import { changeUserInf } from "@/store/actionCreator";
// api
import { userRegister, userLogin } from "@/api/user";
// 导入styled
import { LoginWrapper } from "./style";
export default memo(function Login(props) {
  // hooks
  const [titlePosition, setTitlePosition] = useState(300);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setTitlePosition(0);
  }, []);
  // 业务函数
  function _userRegister(data) {
    userRegister(data)
      .then((res) => {
        console.log("userRegister", res);
        if (res) {
          message.success("注册成功");
        }
      })
  }
  function _userLogin(data) {
    userLogin(data).then((res) => {
      console.log("userLogin", res);
      if (res) {
        // 将token放入token中
        localStorage.setItem("token", res.token);
        // 将用户信息放入store中保存
        dispatch(changeUserInf(res));
        // 跳转到后台管理页面
        props.history.push("/platform");
      }
    });
  }
  function handleLogin() {
    console.log(name, password);
    if (name && password) {
      _userLogin({ name, password });
    }
  }
  function handleRegister() {
    console.log(name, password);
    if (name && password) {
      _userRegister({ name, password });
    }
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
            <Form name="normal_login" className="login-form">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "请填写账号!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入账号"
                  onChange={(e) => setName(e.target.value)}
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
                  placeholder="请输入密码"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={handleLogin}
                >
                  登录
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-button"
                  onClick={handleRegister}
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
