import { useEffect, useRef, useState } from "react"

//这里将value为0的情况排除，如果为undefined/null/空则删除掉
export const isFaily = (value: unknown) => value === 0 ? false : !value
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 如果用Object，函数等也是对象，用键值对，锁住键值对的格式
export const clearObject = (object: { [key: string]: unknown }) => {
  const result = { ...object }
  Object.keys(object).forEach((key: any) => {
    let value = result[key]
    if (isFaily(value)) {
      if (isVoid(value)) {
        delete result[key]
      }
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

//防抖
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounceValue(value), delay)
    return () => {
      clearTimeout(t)
    }
  }, [value, delay])
  return debounceValue
}

//文档标题
export const useDocumentTtitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
  }, [title])
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}

//跳转到首页
export const resetRoute = () => window.location.href = window.location.origin

export const useMountedRef = () => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  return mountedRef
}