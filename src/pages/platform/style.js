import styled from "styled-components";
export const PlatFormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;

  .center {
    display: flex;
  }
`;
export const Header = styled.div`
  position: relative;
  z-index: 10;
  max-width: 100%;
  height: 64px;
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  padding: 20px 40px;
  background-color: #fff;
  .header_logo {
    display: flex;
    align-items: center;
    width: 316.5px;
    img {
      width: 45px;
      height: 45px;
      margin-right: 16px;
    }
    .website_name {
      color: rgba(0, 0, 0, 0.85);
      font-size: 18px;
    }
  }
  .header_divider {
    height: 22px;
  }
  .search_box {
    display: flex;
    align-items: center;
    width: 475px;
    margin-left: 16px;
    .search_input {
      width: 300px;
    }
  }
  .top_btn {
    display: flex;
    align-items: center;
    font-size: 14px;
    .btn_item {
      margin: 0 12px;
      cursor: pointer;
      &:hover {
        color: #1da57a;
      }
    }
  }
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 40px;
    transition: 0.2s height linear;
    height: 24px;
    overflow: hidden;
    &:hover {
      height: 100px;
    }
    .account {
      height: 100%;
      margin-bottom: 22px;
    }
    .info,
    .logout {
      height: 100%;
      cursor: pointer;
      &:hover {
        color: #1da57a;
      }
    }
  }
`;
export const LeftMenu = styled.div`
  height: calc(100vh - 64px);
  overflow-y:scroll;
  border-right: 1px solid #f0f0f0;
  background: #001529;
  padding:0;
  display:flex;
  flex-direction:column;
  align-items:center;
`;
export const CenterPage = styled.div`
  flex: 1;
  padding: 40px;
`;
