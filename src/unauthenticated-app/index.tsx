/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Divider, Typography } from "antd"
import React, { useState } from "react"
import { Login } from "./login"
import { Register } from "./register"
import styled from '@emotion/styled'
import Logo from '../assets/logo.svg'
import Left from '../assets/left.svg'
import Right from '../assets/right.svg'

export const UnauthenticatedApp = () => {
  const [isRegister, setRegister] = useState(false)
  const [error,setError] = useState<Error | null>(null)
  return <Container>
    <Header />
    <Background />
    <ShowCart>
      <Title>{isRegister ? '请注册' : '请登录'}</Title>
      {error?<Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      {isRegister ? <Register onError={setError} /> : <Login onError={setError} />}
      <Divider />
      <Button type={'link'} onClick={() => setRegister(!isRegister)}>
        {isRegister ? '已有账号？请登录' : '没有账号？请注册'}
      </Button>
    </ShowCart>
  </Container>
}
const Title = styled.h2`
  margin-bottom:2.4rem;
  color:rgb(94,108,132);
`
const Background = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  background-attachment:fixed;
  background-repeat:no-repeat;
  background-position:left bottom,right bottom;
  background-size: calc(((100vw - 40rem)/2)-3.2rem), calc(((100vw - 40rem)/2)-3.2rem),cover;
  background-image:url(${Left}),url(${Right});
`

export const LongButton = styled(Button)`
  width:100%;
`
const Header = styled.header`
  width:100%;
  padding:5rem 0;
  background:url(${Logo}) no-repeat center;
  background-size:8rem;
`
const ShowCart = styled(Card)`
  width:40rem;
  min-height:56rem;
  padding:3.2rem 4rem;  
  box-sizing:border-box;
  box-shadow:rgba(0,0,0,0.1) 0 0 1rem;
  border-radius:0.3rem;
  text-align:center;
`
const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  min-height:100vh;
`