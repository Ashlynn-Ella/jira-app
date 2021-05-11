import { Button, Input } from "antd"
import { Row } from "component/lib"
import { UsertaskType } from "component/task-select"
import { UserSelect } from "component/user-select"
import React from "react"
import { useSetSearch } from "utils/url"
import { useTaskSearchParams } from "./util"

export const SearchPanel = () => {
  const searchParam = useTaskSearchParams()
  const setSearchParams = useSetSearch()
  const reset = () => {
    setSearchParams({
      name: undefined,
      typeId: undefined,
      processId: undefined,
      tagId: undefined
    })
  }
  return <Row gap={true} marginBottom={4}>
    <Input style={{ width: '20rem' }} type={'text'} placeholder="任务名" value={searchParam.name} onChange={evt => setSearchParams({ name: evt.target.value })} />
    <UserSelect defaultOptionName={'经办人'} value={searchParam.processId} onChange={value => setSearchParams({ processId: value })} />
    <UsertaskType defaultOptionName={'类型'} value={searchParam.typeId} onChange={value => setSearchParams({ typeId: value })} />
    <Button onClick={reset}>清除筛选器</Button>
  </Row>
}