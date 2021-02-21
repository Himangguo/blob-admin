import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import SimpleMDE from "simplemde";
import DOMPurify from "dompurify";
import { Input, Button, message, Tag, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PageHeader from "@/components/page-header";

import "simplemde/dist/simplemde.min.css";
// import ' /css/font-awesome.min.css';
import { AddArticleWrapper } from "./style";

import { createArticle, relaMomentToLabel } from "@/api/article";
import { createLabel } from "@/api/label";

export default memo(function AddArticle(props) {
  const [title, setTitle] = useState("");
  // const [mdHtml, setMdHtml] = useState("");
  const [md,setMd] = useState("");
  const [chooseLabels, setChooseLabels] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputEl = useRef(null);
  const editInputEl = useRef(null);
  const init = useCallback(() => {
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

    // need to use the default rendering routine
    /*  simplemde.options.previewRender = function (plainText) {
      return DOMPurify.sanitize(simplemde.markdown(plainText));
    }; */

    /*  if (this.value) {
      simplemde.value(this.value);
    } */
    simplemde.codemirror.on("change", (newVal) => {
      /*    if (this.hasChange) {
        this.hasChange = true;
      } */
      console.log(simplemde.value())
      // const html = simplemde.markdown(simplemde.value());
      setMd(simplemde.value());
    });
  }, [SimpleMDE]);
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  });
  const handleArticleSubmit = useCallback(() => {
    console.log(title, md);
    _createArticle(title, md);
  }, [_createArticle]);
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
  function _createArticle(title, content) {
    createArticle(title, content).then((res) => {
      console.log(res);
      if (res.insertId) {
        const articleId = res.insertId; // 文章id
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
  useEffect(() => {
    init();
  }, []);
  return (
    <AddArticleWrapper>
      <PageHeader title={props.route.name} />
      <div className="article-title">
        <Input
          style={{ fontWeight: 700 }}
          placeholder="输入文章标题..."
          bordered={false}
          onChange={handleTitleChange}
        />
      </div>
      <textarea id="md-editor" defaultValue="" />
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
        <Button type="primary" onClick={handleArticleSubmit}>
          发布
        </Button>
      </div>
    </AddArticleWrapper>
  );
});
