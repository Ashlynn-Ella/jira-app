import { Drawer } from "antd"
import React from "react"
import { useProjectModal } from "utils/url"

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal()
  return <Drawer
    width={'100%'}
    onClose={close}
    visible={projectModalOpen}
  >
    <h1>Project Modal</h1>
  </Drawer>
}