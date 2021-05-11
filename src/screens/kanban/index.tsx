import styled from "@emotion/styled"
import React from "react"
import { useDocumentTtitle } from "utils"
import { useKanbans } from "utils/kanban"
import { KanbanClumn } from "./kanban-clumn"
import { SearchPanel } from "./search-panel"
import { useKanbanSearchParams, useProjectInUrl } from "./util"
import { ScreenContainer } from "component/lib";
import { CreateKanban } from "./create-kanban"
import { TaskModal } from "./task-modal"

export const KanbanScreen = () => {
  useDocumentTtitle('看板列表')
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  const { data: currentProject } = useProjectInUrl()
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map(kanban => <KanbanClumn kanban={kanban} key={kanban.id} />)}
        <CreateKanban />
      </ColumnsContainer> 
      <TaskModal />     
    </ScreenContainer>
  )
}

const ColumnsContainer = styled.div`
display:flex;
overflow-x:scroll;
flex:1;
`