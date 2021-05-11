import { useQuery } from 'react-query';
import { useHttp } from "./http"
import { User } from "../auth-provider"

export const useUser = (param?: Partial<User>) => {
  const client = useHttp()
  return useQuery<User[]>(['users', param], () => client('users', { data: param }))
}