import React, { ReactNode, useContext } from "react"
import * as auth from '../auth-provider'
import { User } from "../auth-provider"
import { PageCallback, PageLoading } from "../component/lib"
import { useMount } from "../utils"
import { http } from "../utils/http"
import { useAsync } from "../utils/use-async"
export interface AuthForm {
  username: string,
  password: string
}

//刷新的时候将 user赋值，保持user有值的登录状态
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,//里面的void是返回的
  logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = "MyAuthContext"

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, setData: setUser, error, isIdle, isLoading, isError, data: user } = useAsync<User | null>()
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))
  useMount(() => {
    run(bootstrapUser())
  })
  if (isIdle || isLoading) {
    return <PageLoading />
  }
  if (isError) {
    return <PageCallback error={error} />
  }
  return <AuthContext.Provider children={children} value={{ user, login, register, logout }}></AuthContext.Provider>
}

//用useContext 自定义hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}