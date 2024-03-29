import styled from "@emotion/styled"
import { Button, Drawer, Form, Input, Spin } from "antd"
import { useForm } from "antd/lib/form/Form"
import { ErrorBox } from "component/lib"
import { UserSelect } from "component/user-select"
import React, { useEffect } from "react"
import { useAddProject, useEditProject } from "utils/project"
import { useProjectModal } from "utils/url"
import { useProjectsQueryKey } from "./util"

export const ProjectModal = () => {
  const { projectModalOpen, close, isLoading, editingProject } = useProjectModal()
  const title = editingProject ? '编辑项目' : '创建项目'
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, isLoading: mutateLoading, error } = useMutateProject(useProjectsQueryKey())
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }
  const onClose = () => {
    close()
    form.resetFields()
  }
  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])
  return <Drawer forceRender={true} width={'100%'} onClose={onClose} visible={projectModalOpen}>
    <Container>
      {isLoading ? <Spin size={'large'} /> : <>
        <h1>{title}</h1>
        <ErrorBox error={error} />
        <Form form={form} layout={'vertical'} onFinish={onFinish} style={{ width: '40rem' }}>
          <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入项目名称' }]}>
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item label={'部门'} name={'organization'} rules={[{ required: true, message: '请输入部门名称' }]}>
            <Input placeholder="请输入部门名" />
          </Form.Item>
          <Form.Item label={'负责人'} name={'personId'}>
            <UserSelect defaultOptionName={'负责人'} />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>提交</Button>
          </Form.Item>
        </Form>
      </>}
    </Container>
  </Drawer>
}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:80vh;
`