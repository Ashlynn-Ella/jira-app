
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from 'react-query'
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-option";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }))
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
    data: params,
    method: 'PATCH'
  }), useEditConfig(queryKey))
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation((params: Partial<Project>) => client(`projects`, {
    data: params,
    method: 'POST'
  }), useAddConfig(queryKey))
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(({ id }: { id: number }) => client(`projects/${id}`, {
    method: 'DELETE'
  }), useDeleteConfig(queryKey))
}

export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), { enabled: !!id })
}