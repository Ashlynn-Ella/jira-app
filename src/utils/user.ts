import { clearObject } from "./index"
import { useHttp } from "./http"
import { User } from "../auth-provider"
import { useAsync } from "./use-async"
import { useEffect } from "react"

export const useUser = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>()
  const client = useHttp()
  useEffect(() => {
    run(client('users', { data: clearObject(param || {}) }))
  }, [param,client,run])
  return result
}