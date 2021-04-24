import qs from 'qs'
import { useCallback } from 'react'
import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context'

interface Config extends RequestInit {
  data?: Object,
  token?: string
}
const apiUrl = process.env.REACT_APP_API_URL

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': data ? 'application/json' : '',
      Authorization: token ? `Bearer ${token}` : ''
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data)
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject('message:请重新登录')
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

//将user中的token拿出来
export const useHttp = () => {
  const { user } = useAuth()
  return useCallback((...[endponit, config]: Parameters<typeof http>) => http(endponit, { ...config, token: user?.token }), [user?.token])
}
