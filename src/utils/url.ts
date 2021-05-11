import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { clearObject } from "."
import { useProject } from "./project"

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetSearch()
  return [
    useMemo(
      () => keys.reduce((pre, key) => {
        return { ...pre, [key]: searchParams.get(key) }
      }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]),
    setSearchParams
  ] as const
}

export const useSetSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (params: Partial<{ [key in string]: unknown }>) => {
    const o = clearObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
    return setSearchParams(o)
  }
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))
  const setUrlParam = useSetSearch()
  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => {
    setUrlParam({ editingProjectId: '', projectCreate: '' })
  }
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    isLoading,
    startEdit,
    editingProject
  }
}