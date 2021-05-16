import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import SimpleMDE from "simplemde";
import DOMPurify from "dompurify";
import { Input, Button, message, Tag, Tooltip, Breadcrumb } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PicUpload from "@/components/pic-upload";
import "simplemde/dist/simplemde.min.css";
// import ' /css/font-awesome.min.css';
import { AddArticleWrapper } from "./style";

import {
  createArticle,
  relaMomentToLabel,
  getrticleDetailById,
} from "@/api/article";
import { createLabel } from "@/api/label";
import { updateArticle } from "@/api/article";
export default memo(function AddArticle(props) {
  const articleId = props.match.params.id;
  const [title, setTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploaderFileList, setUploaderFileList] = useState([]);
  // const [mdHtml, setMdHtml] = useState("");
  const [md, setMd] = useState("");
  const [chooseLabels, setChooseLabels] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const [simpeRender, setSimpleRender] = useState(false);
  // const [] = useState(false);
  const inputEl = useRef(null);
  const editInputEl = useRef(null);
  useEffect(() => {
    if (articleId) {
      getrticleDetailById(articleId).then((res) => {
        console.log("getrticleDetailById", res[0]);
        const { title, content, labels, pictures, fileNames } = res[0];
        setTitle(title);
        setMd(content);

        Array.isArray(labels) && setChooseLabels(labels);
        const uFileList = pictures
          ? pictures.map((url, index) => ({
              uid: index,
              name: "image.png",
              status: "done",
              url,
              response: {
                data: [fileNames[index]],
              },
            }))
          : [];
        console.log("uFileList", uFileList);
        setUploaderFileList(uFileList);
      });
    } else {
      init();
    }
  }, []);
  useEffect(() => {
    if (md) {
      init();
    }
  }, [md]);
  const init = useCallback(() => {
    if (articleId && md && !simpeRender) {
      const simplemde = new SimpleMDE({
        renderingConfig: {
          markedOptions: {
            sanitize: true,
          },
        },
        element: document.getElementById("md-editor"),
        //   autoDownloadFontAwesome: false,
        initialValue: md,
        showIcons: ["code", "table", "horizontal-rule"],
        insertTexts: {
          horizontalRule: ["", "\n\n-----\n\n"],
          image: ["![](http://", ")"],
          link: ["[", "](http://)"],
          table: [
            "",
            "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n",
          ],
        },
      });
      simplemde.codemirror.on("change", (newVal) => {
        console.log(simplemde.value());
        setMd(simplemde.value());
      });
      setSimpleRender(true);
    } else if (!articleId && !simpeRender) {
      const simplemde = new SimpleMDE({
        renderingConfig: {
          markedOptions: {
            sanitize: true,
          },
        },
        element: document.getElementById("md-editor"),
        //   autoDownloadFontAwesome: false,
        initialValue: "",
        showIcons: ["code", "table", "horizontal-rule"],
        insertTexts: {
          horizontalRule: ["", "\n\n-----\n\n"],
          image: ["![](http://", ")"],
          link: ["[", "](http://)"],
          table: [
            "",
            "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n",
          ],
        },
      });
      simplemde.codemirror.on("change", (newVal) => {
        console.log(simplemde.value());
        setMd(simplemde.value());
      });
      setSimpleRender(true);
    }
  }, [SimpleMDE, articleId, md]);
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  });
  const handleImgListChange = useCallback((files) => {
    console.log("收到啦", files);
    setFileList(files);
  });
  const handleArticleSubmit = useCallback(() => {
    console.log(title, md, fileList);
    if (title !== "" && md !== "") {
      _createArticle(title, md, fileList);
    } else {
      message.info("文章标题和正文不能为空奥");
    }
  }, [_createArticle]);
  const handleArticleUpdate = () => {
    console.log(title, md, fileList, chooseLabels);
    if (title !== "" && md !== "") {
      updateArticle(articleId, title, md, fileList, chooseLabels).then(
        (res) => {
          console.log("updateArticle", res);
          message.success(res.msg);
        }
      );
    } else {
      message.info("文章标题和正文不能为空奥");
    }
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...chooseLabels];
    newTags[editInputIndex] = editInputValue;
    setChooseLabels(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };
  const handleClose = (removedTag) => {
    const tags = chooseLabels.filter((tag) => tag !== removedTag);
    console.log(tags);
    setChooseLabels(tags);
  };
  const showInput = async () => {
    await setInputVisible(true);
    inputEl.current.focus();
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tags = chooseLabels;
    if (inputValue && chooseLabels.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);

    setChooseLabels(tags);
    setInputVisible(false);
    setInputValue("");
  };
  function _createArticle(title, content, fileList) {
    createArticle(title, content, fileList).then((res) => {
      console.log(res);
      if (res.data) {
        const articleId = res.data; // 文章id
        console.log(chooseLabels);
        // 创建标签
        createLabel({ labels: chooseLabels }).then((res) => {
          console.log("createArticle", res);
          const labelIds = res.ids;
          // 将文章与标签做关联操作
          relaMomentToLabel(articleId, labelIds).then((res) => {
            console.log(res);
            message.success("文章发布成功");
          });
        });
      }
    });
  }
  return (
    <AddArticleWrapper>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              props.history.push("/platform/article/blobList");
            }}
          >
            文章列表
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{props.route.name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="article-title">
        <Input
          style={{ fontWeight: 700 }}
          placeholder="输入文章标题..."
          bordered={false}
          onChange={handleTitleChange}
          value={title}
        />
      </div>
      <textarea id="md-editor" />
      <div className="article-pic">
        <PicUpload
          handleImgListChange={(list) => handleImgListChange(list)}
          fileList={uploaderFileList}
        />
      </div>
      {chooseLabels.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputEl}
              key={tag}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index !== -1}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={async (e) => {
                if (index !== 0) {
                  /*   this.setState(
                                { editInputIndex: index, editInputValue: tag },
                                () => {
                                  this.editInput.focus();
                                }
                              ); */
                  await setEditInputIndex(index);
                  await setEditInputValue(tag);
                  editInputEl.current.focus();
                  // e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {inputVisible && (
        <Input
          ref={inputEl}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined />
          新建标签
        </Tag>
      )}
      <div className="form-btn">
        {articleId ? (
          <Button type="primary" onClick={handleArticleUpdate}>
            修改
          </Button>
        ) : (
          <Button type="primary" onClick={handleArticleSubmit}>
            发布
          </Button>
        )}
      </div>
    </AddArticleWrapper>
  );
});
