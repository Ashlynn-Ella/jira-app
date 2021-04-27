import styled from "@emotion/styled"
import { Typography } from "antd"
import React from "react"
import { useProjectModal } from "utils/url"
import { ButtonNoPadding, Row } from "../../component/lib"
import { useDebounce, useDocumentTtitle } from "../../utils"
import { useProject } from "../../utils/project"
import { useUser } from "../../utils/user"
import { ProjectList } from "./list"
import { SearchPanel } from "./search-panel"
import { useProjectSearchParams } from "./util"

export const ProjectListScreen = () => {
  useDocumentTtitle('项目列表', false)
  const [param, setParam] = useProjectSearchParams()
  const { data: list, error, isLoading, retry } = useProject(useDebounce(param, 200))
  const { data: user } = useUser()
  const { open } = useProjectModal()

  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      <ButtonNoPadding onClick={open} type={"link"}>
        创建项目
      </ButtonNoPadding>
    </Row>
    <SearchPanel users={user || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
    <ProjectList refresh={retry} dataSource={list || []} users={user || []} loading={isLoading} />
  </Container>
}
ProjectListScreen.whyDidYouRender = false
const Container = styled.div`
padding:3.2rem;
`