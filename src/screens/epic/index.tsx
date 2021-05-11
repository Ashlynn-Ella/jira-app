import { Button, List, Modal } from "antd"
import { Row, ScreenContainer } from "component/lib"
import React, { useState } from "react"
import { useProjectInUrl } from "screens/kanban/util"
import { useDeleteEpic, useEpics } from "utils/epic"
import dayjs from 'dayjs';
import { useTasks } from './../../utils/task';
import { Link } from "react-router-dom"
import { useEpicSearchParams, useEpicsQueryKey } from "./util"
import { Epic } from 'types/epic';
import { CreateEpic } from "./create-epic"

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl()
  const { data: epics, isLoading } = useEpics(useEpicSearchParams())
  const { data: tasks } = useTasks({ id: currentProject?.id })
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey())
  const [createEpicOpen, setCreateEpicOpen] = useState(false)
  const comfirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      okText: '确定',
      cancelText:'取消',
      title: `确定删除项目组${epic.name}`,
      content: '点击确定删除',
      onOk() {
        deleteEpic({ id: epic.id })
      }
    })
  }
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => {
          setCreateEpicOpen(true)
        }} type={'link'}>创建任务组</Button>
      </Row>
      <List style={{overflow:'scroll'}} dataSource={epics} loading={isLoading} itemLayout={'vertical'} renderItem={epic => {
        return <List.Item>
          <List.Item.Meta
            title={<Row between={true}>
              <span>{epic.name}</span>
              <Button type={'link'} onClick={() => comfirmDeleteEpic(epic)}>删除</Button>
            </Row>}
            description={
              <div>
                <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                <div>开始时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
              </div>
            }
          />
          <div>
            {tasks?.filter(task => task.epicId === epic.id).map(task => {
              return <Link key={task.id} to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}>{task.name}</Link>
            })
            }
          </div>         
        </List.Item>
      }} />
      <CreateEpic visible={createEpicOpen} onClose={() => setCreateEpicOpen(false)} />
    </ScreenContainer>
  )
}