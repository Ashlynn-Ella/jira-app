import { Table, TableProps } from "antd"
import dayjs from "dayjs"
import React from "react"
import { Link } from "react-router-dom"
import { useEditProject } from "utils/project"
import { User } from "../../auth-provider"
import { Pin } from "../../component/pin"

export interface Project {
  id: number,
  name: string,
  personId: number,
  organization: string,
  created: string,
  pin: boolean
}
interface ProjectListProps extends TableProps<Project> {
  users: User[],
  refresh:()=>void
}
export const ProjectList = ({ users,refresh, ...props }: ProjectListProps) => {
  const { mutate } = useEditProject()
  //函数柯里化
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(refresh)
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
    }
  ]}
    {...props}
  />
}