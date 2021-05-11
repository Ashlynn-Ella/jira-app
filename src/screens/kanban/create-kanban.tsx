import { Input } from 'antd';
import React, { useState } from 'react';
import { useAddKanban } from 'utils/kanban';
import { Container } from './kanban-clumn';
import { useKanbansQueryKey, useProjectIdInUrl } from './util';


export const CreateKanban = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey())
  const submit = async () => {
    await addKanban({ name, projectId })
    setName('')
  }
  return <Container>
    <Input
      value={name}
      size={'large'}
      placeholder={'新建看板名称'}
      onPressEnter={submit}
      onChange={evt => setName(evt.target.value)}
    />
  </Container>
}