import React from "react";
import { IdSelect } from "./id-select";
import { useTaskType } from 'utils/task-type';

export const UsertaskType = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskType()
  return <IdSelect options={taskTypes || []}{...props} />
}