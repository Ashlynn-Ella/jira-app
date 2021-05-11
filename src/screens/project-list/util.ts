
import { useMemo } from "react"
import { clearObject } from "utils"
import { useUrlQueryParam } from "../../utils/url"

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => {
      return { ...clearObject(param), personId: Number(param.personId) || undefined }
    }, [param]),
    setParam
  ] as const
}

export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParams()
  return ['projects', params]
}