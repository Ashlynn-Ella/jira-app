import { useAddTask } from "utils/task"
import React, { useEffect, useState } from 'react';
import { useProjectIdInUrl, useTaskQueryKey } from "./util";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState('')
  const [inputMode, setInputMode] = useState(false)
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey())
  const projectId = useProjectIdInUrl()
  const submit = async () => {
    await addTask({ name, projectId, kanbanId })
    setInputMode(false)
    setName('')
  }
  const toggle = () => setInputMode((inputMode) => !inputMode)
  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])
  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>
  }
  return <Card>
    <Input
      value={name}
      onBlur={toggle}
      placeholder={'需要做点什么'}
      autoFocus={true}
      onPressEnter={submit}
      onChange={evt => setName(evt.target.value)}
    />
  </Card>
}