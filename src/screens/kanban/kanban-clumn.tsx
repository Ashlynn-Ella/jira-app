import { kanban } from "types/kanban"
import { useTasks } from "utils/task"
import { useKanbansQueryKey, useTaskSearchParams, useTasksModal } from "./util"
import bugIcon from 'assets/bug.svg'
import taskIcon from 'assets/task.svg'
import { useTaskType } from "utils/task-type"
import { Button, Card, Dropdown, Menu, Modal } from 'antd';
import styled from '@emotion/styled';
import React from "react"
import { CreateTask } from "./create-task"
import { Task } from './../../types/task';
import { Mask } from "component/mask"
import { useDeleteKanban } from "utils/kanban"
import { Row } from "component/lib"

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskType()
  const name = taskTypes?.find(item => item.id === id)?.name
  if (!name) {
    return null
  }
  return <img src={name === 'bug' ? bugIcon : taskIcon} alt="" />
}

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTaskSearchParams()
  return <Card onClick={() => startEdit(task.id)} style={{ marginBottom: '0.5rem', cursor: 'pointer' }}>
    <p>
      <Mask name={task.name} keyword={keyword} />
    </p>
    <TaskTypeIcon id={task.typeId} />
  </Card>
}

const More = ({ kanban }: { kanban: kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey())
  const startEdit = () => {
    Modal.confirm({
      okText: '确认',
      cancelText: '取消',
      title: '确定删除任务吗',
      onOk() {
        return deleteKanban({ id: Number(kanban.id) })
      }
    })
  }
  const overlay = () => {
    return <Menu>
      <Menu.Item>
        <Button onClick={startEdit} type={'link'}>删除</Button>
      </Menu.Item>
    </Menu>
  }
  return <Dropdown overlay={overlay}>
    <Button type={'link'}>...</Button>
  </Dropdown>
}
export const KanbanClumn = ({ kanban }: { kanban: kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
  return <Container>
    <Row between={true}>
      <h3>{kanban.name}</h3>
      <More kanban={kanban} />
    </Row>
    <TaskContainer>
      {
        tasks?.map(task => <TaskCard key={task.id} task={task} />)
      }
      <CreateTask kanbanId={kanban.id} />
    </TaskContainer>
  </Container>
}
export const Container = styled.div`
min-width:27rem;
border-radius:6px;
background-color:rgb(244,245,247);
display:flex;
flex-direction:column;
padding:0.7rem 0.7rem 1rem;
margin-right:1.5rem;
`
const TaskContainer = styled.div`
overflow:scroll;
flex: 1;
::-webkit-scrollbar{
display:none
}
`