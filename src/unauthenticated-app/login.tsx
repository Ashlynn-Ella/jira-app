import { Input, Form } from "antd"
import React from "react"
import { LongButton } from "./index"
import { useAuth, AuthForm } from "../context/auth-context"
import { useAsync } from "../utils/use-async"


export const Login = ({ onError }: { onError: (error: Error | null) => void }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwError: true })
  const handleSubmit = async (values: AuthForm) => {
    try {
      await run(login(values))
    } catch (e) {
      onError(e)
    }
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{ required: true, message: '请输入账号名称' }]}>
      <Input type="text" placeholder="请输入账户" />
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
      <Input type="password" placeholder="请输入密码" />
    </Form.Item>
    <LongButton htmlType="submit" type='primary' loading={isLoading}>登录</LongButton>
  </Form>
}
