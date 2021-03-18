import React, { memo, useMemo, useEffect, useState } from "react";
import { Input, Spin, message, Divider, Empty } from "antd";
import PageHeader from "@/components/page-header";
import SongList from "./song-list";
import { BgMusicWrapper } from "./style";
import { getBgMusicId, getSearch } from "@/api/persona";
export default memo(function BgMusic(props) {
  const { Search } = Input;
  const [musicId, setMusicId] = useState("");
  const [loading, setLoading] = useState(false);
  const [songList, setSongList] = useState([]);
  const [searchMusicId, setSearchMusicId] = useState(null);
  const [haveBgMusic, setHaveBgMusic] = useState(false);
  useEffect(() => {
    getBgMusicId().then((res) => {
      console.log(res);
      if (res.data === null) {
        return;
      }
      setHaveBgMusic(true);
      setMusicId(res.musicId);
    });
  }, []);

  const musicUrl = useMemo(
    () =>
      `//music.163.com/outchain/player?type=2&id=${musicId}&auto=0&height=32`,
    [musicId]
  );
  const searchMusicUrl = useMemo(
    () =>
      `//music.163.com/outchain/player?type=2&id=${searchMusicId}&auto=0&height=32`,
    [searchMusicId]
  );
  function onSearch(value) {
    setLoading(true);
    console.log(value);
    if (value === "") {
      message.info("这是空白歌嘛，我识别不出~");
      setLoading(false);
      return;
    }
    getSearch(value).then((res) => {
      console.log("getSearch", res.result.songs);
      setSongList(res.result.songs);
      setLoading(false);
    });
  }
  return (
    <BgMusicWrapper>
      <PageHeader title={props.route.name} />
      <Divider orientation="left" plain>
        我的背景乐
      </Divider>
      {haveBgMusic ? (
        <iframe
          frameBorder="no"
          border="0"
          marginWidth="0"
          marginHeight="0"
          width="200"
          height="52"
          src={musicUrl}
        ></iframe>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Divider orientation="left" plain>
        音乐馆/试听区
      </Divider>
      {searchMusicId && (
        <iframe
          frameBorder="no"
          border="0"
          marginWidth="0"
          marginHeight="0"
          width="200"
          height="52"
          src={searchMusicUrl}
        ></iframe>
      )}

      <Search
        placeholder="这里可以搜索到你喜欢的音乐奥"
        enterButton="Search"
        size="large"
        loading={loading}
        onSearch={onSearch}
      />
      <div className="search-result-box">
        <Spin spinning={loading}>
          <SongList
            songList={songList}
            haveBgMusic={haveBgMusic}
            setSearchMusic={(id) => {
              setSearchMusicId(id);
            }}
            setBgMusic={(id) => {
              setMusicId(id);
              setHaveBgMusic(true);
            }}
          />
        </Spin>
      </div>
    </BgMusicWrapper>
  );
});
