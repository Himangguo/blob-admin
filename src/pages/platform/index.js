import React, { memo, useState } from "react";
import { renderRoutes } from "react-router-config";
import { Divider, Input } from "antd";
import { PlatFormWrapper, Header, LeftMenu, CenterPage } from "./style";
import logo from "@/assets/img/platform/logo.png";
export default memo(function PlatForm(props) {
  const [btnList] = useState(["使用", "关于博客苗"]);
  function onSearch() {
    console.log("搜索");
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
          <div className="account">用户名</div>
          <div className="info">个人信息</div>
          <div className="logout">退出</div>
        </div>
      </Header>
      <div className="center">
        <LeftMenu>左部菜单栏</LeftMenu>
        <CenterPage>{renderRoutes(props.route.routes)}</CenterPage>
      </div>
    </PlatFormWrapper>
  );
});
