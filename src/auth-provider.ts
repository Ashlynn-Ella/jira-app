
const localStorageKey = 'auth_provider_token'

const apiUrl = process.env.REACT_APP_API_URL

export interface User {
  name: string,
  id: number,
  token: string
}

//获取localStorage
export const getToken = () => window.localStorage.getItem(localStorageKey)

//储存 localStorage 并且储存数据
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/login`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  }).then(async response => {
    if(response.ok){
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const register = (data: { username: string, password: string }) => {
  return fetch(`${apiUrl}/register`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  }).then(async response => {
    if(response.ok){
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout =async () => window.localStorage.removeItem(localStorageKey)