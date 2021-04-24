import React, { ReactNode, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as auth from '../auth-provider'
import { User } from "../auth-provider"
import { PageCallback, PageLoading } from "../component/lib"
import { useMount } from "../utils"
import { http } from "../utils/http"
import { useAsync } from "../utils/use-async"
import * as authStore from 'store/auth.slice'

export interface AuthForm {
  username: string,
  password: string
}

//刷新的时候将 user赋值，保持user有值的登录状态
export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, error, isIdle, isLoading, isError } = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  useMount(() => {
    run(dispatch(authStore.bootstrap()))
  })
  if (isIdle || isLoading) {
    return <PageLoading />
  }
  if (isError) {
    return <PageCallback error={error} />
  }
  return <div>
    {children}
  </div>
}

//用useContext 自定义hook
export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const user = useSelector(authStore.selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)),[dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()),[dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register),[dispatch])
  return {
    login,
    logout,
    register,
    user
  }
}