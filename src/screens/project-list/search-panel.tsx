/* @jsxImportSource @emotion/react */
import { Form, Input } from "antd"
import React from "react"
import { User } from "../../auth-provider"
import { UserSelect } from '../../component/user-select'
import { Project } from "./list"

interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'>>,
  setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
    <Form.Item>
      <Input placeholder="项目名" value={param.name} type="text" onChange={(e) => {
        setParam({
          ...param,
          name: e.target.value
        })
      }} />
    </Form.Item>
    <Form.Item>
      <UserSelect
        defaultOptionName={'负责人'}
        value={param.personId}
        onChange={(value) => {
          setParam({
            ...param,
            personId: value
          })
        }}
      />
    </Form.Item>
  </Form>
}