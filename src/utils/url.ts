import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { clearObject } from "."

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((pre, key) => {
        return { ...pre, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = clearObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const

}