import { useCallback, useReducer, useState } from "react"
import { useMountedRef } from "./index"

interface State<D> {
  error: Error | null,
  stat: 'idle' | 'loading' | 'success' | 'error',
  data: D | null
}
const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: 'idle'
}
const defaultConfig = {
  throwError: false
}
const useSafeDispatch = <T>(dispatch: (value: T) => void) => {
  const mountedRef = useMountedRef()
  return useCallback(
    (value: T) => (mountedRef.current ? dispatch(value) : void 0), [dispatch, mountedRef]
  )
}
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), { ...defaultInitialState, ...initialState })
  const safeDispatch = useSafeDispatch(dispatch)
  const [retry, setRetry] = useState(() => () => { })
  const setData = useCallback((data: D) => {
    safeDispatch({
      error: null,
      stat: 'success',
      data
    })
  }, [safeDispatch])
  const setError = useCallback((error: Error) => {
    safeDispatch({
      error,
      data: null,
      stat: 'error'
    })
  }, [safeDispatch])
  const run = useCallback((promise: Promise<D>, retryConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw Error('请传入 Promise 类型的数据')
    }
    if (retryConfig) {
      setRetry(() => () => run(retryConfig?.retry(), retryConfig))
    }

    safeDispatch({ stat: 'loading' }) //前面写reducer函数的时候把 state 和 action = {stat: 'loading'}的值都返回了
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch(error => {
        setError(error)
        if (config.throwError) return Promise.reject(error)
        return error
      })
  }, [config.throwError, setData, setError, safeDispatch])
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    dispatch,
    retry,
    ...state
  }
}