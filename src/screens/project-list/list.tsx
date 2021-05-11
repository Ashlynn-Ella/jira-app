import { Dropdown, Menu, Table, TableProps } from "antd"
import { ButtonNoPadding } from "component/lib"
import dayjs from "dayjs"
import React from "react"
import { Link } from "react-router-dom"
import { useDeleteProject, useEditProject } from "utils/project"
import { useProjectModal } from "utils/url"
import { User } from "../../auth-provider"
import { Pin } from "../../component/pin"
import { useProjectsQueryKey } from "./util"

export interface Project {
  id: number,
  name: string,
  personId: number,
  organization: string,
  created: string,
  pin: boolean
}
interface ProjectListProps extends TableProps<Project> {
  users: User[]
}
export const ProjectList = ({ users, ...props }: ProjectListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey())
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const { startEdit } = useProjectModal()
  //函数柯里化
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
  const editProject = (id: number) => () => startEdit(id)
  const comfirmDeleteProject = (id: number) => deleteProject({ id })

  return <Table rowKey='id' pagination={false} columns={[
    {
      title: <Pin checked={true} disabled={true} />,
      render(vlaue, project) {
        return <Pin checked={project.pin} onChangeChecked={pinProject(project.id)} />
      }
    }
    ,
    {
      title: '名称',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>
      }
    },
    {
      title: '部门',
      dataIndex: 'organization'
    },
    {
      title: '负责人',
      dataIndex: 'personId',
      render(value, project) {
        return <span>
          {users.find(user => user.id === project.personId)?.name}
        </span>
      }
    },
    {
      title: '创建时间',
      render(value, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    },
    {
      title: '操作',
      render(value, project) {
        return <Dropdown overlay={
          <Menu>
            <Menu.Item key="edit" onClick={editProject(project.id)}>编辑</Menu.Item>
            <Menu.Item key="delete" onClick={() => comfirmDeleteProject(project.id)}>删除</Menu.Item>
          </Menu>
        }>
          <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
        </Dropdown>
      }
    }
  ]}
    {...props}
  />
}