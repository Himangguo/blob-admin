import React, { memo, useEffect, useMemo, useState } from "react";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Divider, Input, Menu, Button } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
// hooks
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { changeUserInf } from "@/store/actionCreator";
import RouterAuth from "@/hoc/router-auth";
// api
import { testTokenAuth } from "@/api/user";
import { PlatFormWrapper, Header, LeftMenu, CenterPage } from "./style";
import logo from "@/assets/img/platform/logo.png";
export default memo(function PlatForm(props) {
  const [btnList] = useState(["使用", "关于博客苗"]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector(
    (state) => ({
      userInfo: state.userInfo,
    }),
    [shallowEqual]
  );
  useEffect(() => {
    testTokenAuth().then((res) => {
      if (res.id) {
        console.log('res',res);
        // 如果校验通过
        dispatch(changeUserInf(res));
      }
    });
  }, []);
  const selectedKeys = useMemo(() => props.location.pathname, [
    props.location.pathname,
  ]);
  function handleMenuItemClick(e) {
    console.log(e.key);
    props.history.push(e.key);
  }
  function onSearch() {
    console.log("搜索");
  }
  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }
  function handleLogout() {
    dispatch(changeUserInf(null));
    localStorage.removeItem("token");
    props.history.push("/login");
  }
  return (
    <PlatFormWrapper>
      <Header>
        <div className="header_logo">
          <img src={logo} alt="miao" />
          <span className="website_name">Miao Blob</span>
        </div>
        <Divider type="vertical" className="header_divider" />
        <div className="search_box">
          <Input.Search
            className="search_input"
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </div>
        <div className="top_btn">
          {btnList.map((item) => (
            <div key={item} className="btn_item">
              {item}
            </div>
          ))}
        </div>
        <div className="userinfo">
          <div className="account">{userInfo && userInfo.name}</div>
          <div className="info">个人信息</div>
          <div className="logout" onClick={handleLogout}>
            退出
          </div>
        </div>
      </Header>
      <div className="center">
        <LeftMenu>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 10 }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </Button>
          <Menu
            selectedKeys={selectedKeys}
            defaultOpenKeys={["/platform/article", "/platform/personality"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            onClick={handleMenuItemClick}
          >
            <Menu.Item key="/platform/home" icon={<PieChartOutlined />}>
              个人信息
            </Menu.Item>
            <Menu.Item key="/platform/use" icon={<DesktopOutlined />}>
              使用
            </Menu.Item>
            <Menu.Item key="/platform/about" icon={<ContainerOutlined />}>
              关于博客苗
            </Menu.Item>
            <Menu.Item key="/platform/privacy" icon={<PieChartOutlined />}>
              隐私设置
            </Menu.Item>
            <Menu.SubMenu
              key="/platform/article"
              icon={<MailOutlined />}
              title="文章管理"
            >
              <Menu.Item key="/platform/article/blobList">博客列表</Menu.Item>
              <Menu.Item key="/platform/article/add">新增文章</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="/platform/personality"
              icon={<AppstoreOutlined />}
              title="个性元素管理"
            >
              <Menu.Item key="/platform/personality/bgMusic">
                背景音乐
              </Menu.Item>
              <Menu.Item key="/platform/personality/bgWall">背景墙</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </LeftMenu>
        <CenterPage>
          <Switch>
            {/* <RouterAuth config={props.route.routes} /> */}
            {renderRoutes(props.route.routes)}
          </Switch>
        </CenterPage>
      </div>
    </PlatFormWrapper>
  );
});
