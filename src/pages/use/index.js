import React, { memo, useEffect, useState } from "react";
import ArticleRender from "@/pages/article/detail/article-render";
import { getrticleDetailById } from "@/api/article";
export default memo(function Use() {
  const [useArticle, setUseArticle] = useState({
    title: "",
    content: "",
  });
  useEffect(() => {
    getrticleDetailById(54).then((res) => {
      console.log("getrticleDetailById", res);
      setUseArticle(res[0]);
    });
  }, []);
  return (
    <div>
      <ArticleRender title={useArticle.title} content={useArticle.content} />
    </div>
  );
});
