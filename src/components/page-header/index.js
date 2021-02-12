import React, { memo } from 'react'
import {PageHeaderWrapper} from "./style"
export default memo(function PageHeader(props) {
    return (
        <PageHeaderWrapper>
            {props.title}
        </PageHeaderWrapper>
    )
})
