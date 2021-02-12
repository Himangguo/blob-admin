import React, { memo, useCallback, useEffect, useState } from "react";
import SimpleMDE from "simplemde";
import DOMPurify from "dompurify";
import { Input, Button } from "antd";
import PageHeader from "@/components/page-header";

import "simplemde/dist/simplemde.min.css";
// import ' /css/font-awesome.min.css';
import { AddArticleWrapper } from "./style";

export default memo(function AddArticle(props) {
  const [title, setTitle] = useState("");
  const [mdHtml, setMdHtml] = useState("");
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
      const html = simplemde.markdown(simplemde.value());
      setMdHtml(html);
    });
  }, [SimpleMDE]);
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  });
  const handleArticleSubmit = useCallback(() => {
    console.log(title, mdHtml);
  });
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
      <div className="form-btn">
        <Button type="primary" onClick={handleArticleSubmit}>
          发布
        </Button>
      </div>
    </AddArticleWrapper>
  );
});
