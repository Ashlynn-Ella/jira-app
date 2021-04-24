import { useCallback, useEffect } from "react";
import { clearObject } from ".";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()
  const fetchConfig = useCallback(() => client('projects', { data: clearObject(param || {}) }),[param,client])
  useEffect(() => {
    run(fetchConfig(), { retry: fetchConfig })
  }, [param,fetchConfig,run]) //这里得debounce是useState中的
  return result
}

export const useEditProject = () => {
  const { run, ...result } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...result
  }
}

export const useAddProject = () => {
  const { run, ...result } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...result
  }
}