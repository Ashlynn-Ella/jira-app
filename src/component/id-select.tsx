import { Select } from "antd";
import { Raw } from "../types";

type SelectProps = React.ComponentProps<typeof Select>
interface IdSelsectProps extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: Raw | null | undefined,
  onChange?: (value?: number) => void,
  options?: { name: string, id: number }[],
  defaultOptionName?: string
}
export const IdSelect = (props: IdSelsectProps) => {
  const { value, onChange, options, defaultOptionName, ...restProps } = props
  return <Select
    value={options?.length?toNum(value):0}
    onChange={value => onChange?.(toNum(value) || undefined)}
    {...restProps}
  >
    {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
    {options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)}
  </Select>
}

const toNum = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))