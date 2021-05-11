import styled from "@emotion/styled"
import { Popover, Typography, List, Divider } from "antd"
import React from "react"
import { useUser } from "utils/user"

export const UserPopover = () => {
  const { data: users, refetch } = useUser()
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>组员列表</Typography.Text>
      <List>
        {users?.map(use => <List.Item key={use.id}>
          <List.Item.Meta title={use.name} />
        </List.Item>)}
      </List>
      <Divider />
    </ContentContainer>
  )
  return (
    <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}>
      <span>组员</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
min-width:30rem;
`