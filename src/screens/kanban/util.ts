import { useLocation } from "react-router"
import { useProject } from "utils/project"
import { useMemo } from 'react';
import { useUrlQueryParam } from "utils/url";
import { useTask } from "utils/task";
import { useCallback } from 'react';
import { useDebounce } from "utils";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbansQueryKey = () => (['kanbans', useKanbanSearchParams()])

export const useTaskSearchParams = () => {
  const projectId = useProjectIdInUrl()
  const [param,] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const debounceName = useDebounce(param.name, 200)
  return useMemo(() => {
    return {
      projectId,
      name: debounceName || undefined,
      typeId: Number(param.typeId) || undefined,
      processId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined
    }
  }, [projectId, param, debounceName])
}

export const useTaskQueryKey = () => (['tasks', useTaskSearchParams()])

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId))
  const startEdit = useCallback((id: number) => setEditingTaskId({ editingTaskId: id }), [setEditingTaskId])
  const close = useCallback(() => setEditingTaskId({ editingTaskId: '' }), [setEditingTaskId])
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}