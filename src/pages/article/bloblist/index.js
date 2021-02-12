import React, { memo, useEffect } from "react";
import PageHeader from "@/components/page-header";
export default memo(function BlobList(props) {
  return (
    <div>
      <PageHeader title={props.route.name} />
    </div>
  );
});
