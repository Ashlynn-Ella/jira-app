import { Form, Input } from "antd"
import React from "react"
import { LongButton } from "./index"
import { useAuth } from "../context/auth-context"
import { useAsync } from "../utils/use-async"

export const Register = ({ onError }: { onError: (error: Error | null) => void }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwError: true })
  const handleSubmit = async ({ cpassword, ...values }: { username: string, password: string, cpassword: string }) => {
    if (values.password !== cpassword) {
      onError(new Error('请输入两次相同的密码'))
      return
    }
    try {
      await run(register(values))
    } catch (e) {
      onError(e)
    }
  }
  return <Form onFinish={handleSubmit}>
    <Form.Item name="username" rules={[{ required: true, message: '请输入账号名称' }]}>
      <Input type="text" placeholder="请输入账户" id="username" />
    </Form.Item>
    <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
      <Input type="password" placeholder="请输入密码" id="password" />
    </Form.Item>
    <Form.Item name="cpassword" rules={[{ required: true, message: '请输入密码' }]}>
      <Input type="password" placeholder="再次输入密码" id="cpassword" />
    </Form.Item>
    <LongButton loading={isLoading} htmlType="submit" type='primary'>注册</LongButton>
  </Form>
}