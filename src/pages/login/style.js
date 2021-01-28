import styled from "styled-components";
import BgGif from "@/assets/img/login/background2.gif";
export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${BgGif}) no-repeat;
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login_box {
    background-color: #fff;
    width: 50vw;
    .login_header {
      width: 100%;
      height: 60px;
      color: #fff;
      background-color: #1da57a;
      font-size: 30px;
      text-align: center;
      line-height: 60px;
    }
    .login_content {
      width: 100%;
      display: flex;
      .left_desc {
        padding: 20px;
        border-right: 1px solid rgba(0, 0, 0, 0.06);
        writing-mode: vertical-lr;
        font-size: 20px;
        color:#1DA57A;
      }
      .right_form {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        color:#1DA57A;
        .login-form {
          width: 300px;
          .login-form-button {
            margin-right: 20px;
          }
        }
      }
    }
  }
`;
