import React, { ReactNode, useContext } from "react"
import * as auth from '../auth-provider'
import { User } from "../auth-provider"
import { PageCallback, PageLoading } from "../component/lib"
import { useMount } from "../utils"
import { http } from "../utils/http"
import { useAsync } from "../utils/use-async"
import { useQueryClient } from 'react-query';

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
const AuthContext = React.createContext<
  | {
    user: User | null;
    register: (form: AuthForm) => Promise<void>;
    login: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
  }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  const queryClient = useQueryClient()
  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => {
    setUser(null)
    queryClient.clear()
  });

  useMount(() => {
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {
    return <PageLoading />
  }
  if (isError) {
    return <PageCallback error={error} />
  }
  return <AuthContext.Provider children={children}
    value={{ user, login, register, logout }}
  />
}

//用useContext 自定义hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
}