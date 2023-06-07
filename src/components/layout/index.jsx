import React, { useState } from "react"
import SideBar from "./sidebar"
import Content from "./content"
import { Outlet } from "react-router-dom"

function Index() {
  const [isNavOpen, setIsNavOpen] = useState(
    window.innerWidth <= 600 ? false : true
  )

  const navOptions = {
    isNavOpen,
    setIsNavOpen,
  }
  return (
    <div className="dashboard-container">
      <SideBar {...navOptions} />
      <Content {...navOptions}>
        <Outlet />
      </Content>
    </div>
  )
}

export default Index

// fanBase
// courseing
// acadimce
