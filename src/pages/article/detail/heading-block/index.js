import React, { memo } from "react";

import Heading from "../heading";

function HeadingBlock(props) {
  const renderHtml = () => {
    const { level, children } = props;

    if (children && children.length > 0) {
      const nodeValue = children[0].props.value;
      return (
        <Heading level={`h${level}`} id={nodeValue}>
          <span className="title">{children}</span>
          <a href={`#${nodeValue}`} className="link">
            #
          </a>
        </Heading>
      );
    } else {
      return <>{children}</>;
    }
  };
  return <>{renderHtml()}</>;
}

export default memo(HeadingBlock);
