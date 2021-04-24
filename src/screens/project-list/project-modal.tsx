import { Drawer } from "antd"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { projectListActions, selectProjectMoadalOpen } from "./project-list.sclice"

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectMoadalOpen)
  return <Drawer
    width={'100%'}
    onClose={() => dispatch(projectListActions.closeProjectModal())} 
    visible={projectModalOpen}
  >
    <h1>Project Modal</h1>
  </Drawer>
}