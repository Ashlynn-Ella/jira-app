import { useHttp } from "./http"
import { useQuery } from 'react-query';
import { TaskType } from "types/taskType";


export const useTaskType = () => {
  const client = useHttp()
  return useQuery<TaskType[]>(['taskType'], () => client('taskTypes'))
}