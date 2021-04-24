import React from "react"
import { Link, Navigate, Route, Routes } from "react-router-dom"
import { Epic } from "../epic"
import { Kanban } from "../kanban"

export const ProjectScreen = () => {
  return (
    <div>
     <h2> ProjectScreen</h2>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<Kanban/> } />
        <Route path={'/epic'} element={<Epic/> } />
        <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </div>
  )
}