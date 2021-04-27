import styled from "@emotion/styled"
import { Popover, Typography, List, Divider } from "antd"
import React from "react"
import { useProjectModal } from "utils/url"
import { useProject } from "../utils/project"
import { ButtonNoPadding } from "./lib"

export const ProjectPopover = () => {
  const { data: projects } = useProject()
  const { open } = useProjectModal()
  const pinProjects = projects?.filter(project => project.pin)
  const content = (
    <ContentContainer>
      <Typography.Text>收藏项目</Typography.Text>
      <List>
        {pinProjects?.map(item => <List.Item key={item.id}>
          <List.Item.Meta title={item.name} />
        </List.Item>)}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={"link"}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
min-width:30rem;
`