import React, { memo } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import HeadingBlock from "../heading-block"
import { ArticleRenderWrapper } from "./style";
function ArticleRender(props) {
  const renderers = {
    code: ({ language, value }) => {
      return (
        <SyntaxHighlighter style={okaidia} language={language} children={value} />
      );
    },
    heading:HeadingBlock
  };
  return (
    <ArticleRenderWrapper>
      <div className="title">{props.title}</div>
      <ReactMarkdown
        className="content"
        plugins={[[gfm, {singleTilde: false}]]}
        renderers={renderers}
        children={props.content}
      />
    </ArticleRenderWrapper>
  );
}
ArticleRender.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(ArticleRender);
