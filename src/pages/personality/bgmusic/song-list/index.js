import React, { memo, useEffect, useMemo, useState } from "react";
import { Empty, Button, message } from "antd";
import { RedditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { SongListWrapper } from "./style";
import { setupBgMusic } from "@/api/persona";
export default memo(function SongList(props) {
  const [listenLoadingList, setListenLoadingList] = useState([]);
  useEffect(() => {
    console.log("我是", props.songList);
    setListenLoadingList(
      Array.from({ length: props.songList.length }, () => {
        return false;
      })
    );
  }, [props.songList]);
  function handleMusicPlay(id, index) {
    console.log("试听：", id);
    let newList = Array.from({ length: props.songList.length }, (_, indey) => {
      if (index === indey) {
        return true;
      }
      return false;
    });
    setListenLoadingList(newList);
    props.setSearchMusic(id);
  }
  function _setupBgMusic(id) {
    setupBgMusic(id).then((res) => {
      console.log("setupBgMusic", res);
      if (res.result) {
        message.success("背景乐修改成功");
        props.setBgMusic(id);
      }
    });
  }
  return (
    <SongListWrapper>
      {props.songList.length > 0 ? (
        props.songList.map((item, index) => {
          return (
            <div className="song-item">
              <div className="left-info">
                <div className="number">{index + 1}</div>
                <img src={item.artists[0].img1v1Url} />
                <div className="song-box">
                  <div className="song-name">{item.name}</div>
                  <div className="song-artists">
                    {item.artists.map((citem, index) => {
                      if (index < item.artists.length - 1) {
                        return citem.name + "/";
                      }
                      return citem.name;
                    })}
                  </div>
                </div>
              </div>

              <div className="right-btn">
                <Button
                  type="default"
                  icon={<PlayCircleOutlined />}
                  loading={listenLoadingList[index]}
                  onClick={() => handleMusicPlay(item.id, index)}
                >
                  试听
                </Button>
                <Button type="primary" onClick={() => _setupBgMusic(item.id)}>
                  设置成背景乐
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ marginTop: "100px" }}>
          <Empty />
        </div>
      )}
      {props.songList.length > 0 && (
        <div className="list-footer">
          <RedditOutlined />
          <span>到底啦~</span>
        </div>
      )}
    </SongListWrapper>
  );
});
