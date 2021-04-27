import styled from "@emotion/styled"
import { Button, Dropdown, Menu } from "antd"
import React from "react"
import { Row } from "./component/lib"
import { useAuth } from "./context/auth-context"
import { ProjectListScreen } from "./screens/project-list"
import { ReactComponent as SoftwareLogo } from './assets/software-logo.svg'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from "./screens/project"
import { resetRoute } from "./utils"
import { ProjectPopover } from "./component/project-popover"
import { ProjectModal } from "./screens/project-list/project-modal"

export const AuthenticatedApp = () => {
  return <Container>
    <Router>
      <PageHeader />
      <Routes>
        <Route path={"/projects"} element={<ProjectListScreen />}></Route>
        <Route path={"/projects/:projectId/*"} element={<ProjectScreen />}></Route>
        <Navigate to={'/projects'} />
      </Routes>
      <ProjectModal />
    </Router>
  </Container>
}
//头部 
const PageHeader = () => {
  const { logout, user } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38,132,255)'} />
        </Button>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={
          <Menu>
            <Menu.Item key={'logout'}><Button type={'link'} onClick={logout}>登出</Button></Menu.Item>
          </Menu>}>
          <Button type={'link'}>Hi,{user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}
const Container = styled.div`
  display:grid;
  grid-template-rows:6rem 1fr;
`
const Header = styled(Row)`
  padding:3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index:1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``