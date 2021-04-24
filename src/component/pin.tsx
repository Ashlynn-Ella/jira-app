import { Rate } from "antd"
import React from "react"
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean,
  onChangeChecked?: (checked: boolean) => void
}
export const Pin = ({ checked, onChangeChecked, ...resetProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onChangeChecked?.(!!num)}
      {...resetProps}
    />
  )
}