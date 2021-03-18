import styled from "styled-components";
export const SongListWrapper = styled.div`
  margin-top: 10px;
  .song-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    .left-info {
      display: flex;
      align-items:center;
      .number {
        font-size:15px;
        margin-right:10px;
      }
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .song-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .song-name {
          font-size: 15px;
        }
        .song-artists {
          color: #aaa;
        }
      }
    }
  }
  .list-footer {
    width: 100%;
    font-size: 16px;
    text-align: center;
    color: #1da57a;
    span {
      display: inline-block;
      margin-left: 5px;
    }
  }
`;
