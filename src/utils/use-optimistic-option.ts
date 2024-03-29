import { QueryKey, useQueryClient, } from 'react-query'
import { Project } from 'screens/project-list/list'
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: Partial<Project>) {
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      })
      return { previousItems }
    },
    onError: (error: any, newItem: any, context: any) => {
      queryClient.setQueryData(queryKey, context.previousItems)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.filter(item => item.id !== target.id) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => (old ? [...old, target] : []))
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.map(item => item.id === target.id ? { ...item, ...target } : item) || [])