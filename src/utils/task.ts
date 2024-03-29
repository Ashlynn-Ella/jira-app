import { useHttp } from "./http"
import { QueryKey, useMutation, useQuery } from 'react-query';
import { Task } from 'types/task';
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-option";


export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(['tasks', params], () => client('tasks', { data: params }))
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Task>) => client(`tasks`, {
    data: params,
    method: 'POST'
  }), useAddConfig(queryKey))
}

export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), { enabled: !!id })
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Task>) => client(`tasks/${params.id}`, {
    data: params,
    method: 'PATCH'
  }), useEditConfig(queryKey))
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(({ id }: { id: number }) => client(`tasks/${id}`, {
    method: 'DELETE'
  }), useDeleteConfig(queryKey))
}