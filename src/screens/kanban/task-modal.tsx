import { Button, Form, Input, Modal } from "antd"
import { useForm } from "antd/lib/form/Form"
import { UsertaskType } from "component/task-select"
import { UserSelect } from "component/user-select"
import React, { useEffect } from "react"
import { useDeleteTask, useEditTask } from "utils/task"
import { useTaskQueryKey, useTasksModal } from "./util"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

export const TaskModal = () => {
  const [form] = useForm()
  const { editingTaskId, editingTask, close } = useTasksModal()
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTaskQueryKey())
  const { mutateAsync: deleteTask } = useDeleteTask(useTaskQueryKey())
  const onCancel = () => {
    close()
    form.resetFields()
  }
  const onOK = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() })
    close()
  }
  const startDelete = () => {
    close()
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除任务吗',
      onOk() {
        return deleteTask({id:Number(editingTaskId)})
      }
    })
  }
  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [editingTask, form])
  return <Modal
    okText={'确认'}
    cancelText={'取消'}
    confirmLoading={editLoading}
    visible={!!editingTaskId}
    title={'编辑任务'}
    onOk={onOK}
    onCancel={onCancel}
  >
    <Form {...layout} form={form} initialValues={editingTask}>
      <Form.Item label={'任务名'} name={'name'} rules={[{ required: true, message: '请输入任务名' }]}>
        <Input />
      </Form.Item>
      <Form.Item label={'经办人'} name={'processorId'}>
        <UserSelect defaultOptionName={'经办人'} />
      </Form.Item>
      <Form.Item label={'类型'} name={'typeId'}>
        <UsertaskType />
      </Form.Item>
    </Form>
    <div style={{ textAlign: "right" }}>
      <Button
        size={'small'}
        style={{ fontSize: '14px' }}
        onClick={startDelete}
      >删除</Button>
    </div>
  </Modal>
}