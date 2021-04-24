import DatePicker from "./DatePicker"
import dayjs from "dayjs";

export const Date = () => {
  const { RangePicker } = DatePicker
  const onChange = (date: any, dateString: [string, string]) => {

  }
  return <RangePicker
    defaultValue={[dayjs().subtract(7, 'day'), dayjs()]}
    format="YYYY-MM-DD"
    onChange={onChange}
  />
}