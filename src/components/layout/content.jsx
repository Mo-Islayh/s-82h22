import React, { useState } from "react"
import { AiOutlineMenuUnfold } from "react-icons/ai"
import { FiLogOut } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
function Content({ isNavOpen, setIsNavOpen, children }) {
  const navigate = useNavigate()
  const handelLogout = () => {
    console.log("logout")
    navigate("/login")
  }

  return (
    <div className="dashboard-main">
      <div className="dashboard-main-header">
        <button
          className="menu-btn"
          onClick={() => {
            setIsNavOpen(!isNavOpen)
            console.log(window.innerWidth)
          }}
        >
          <AiOutlineMenuUnfold />
        </button>
        <p>Welcome UserName</p>
        <button className="dashboard-main-header-button" onClick={handelLogout}>
          <span>Logout</span>
          <FiLogOut />
        </button>
      </div>
      {/* content */}
      <div className="dashboard-main-content">{children}</div>
    </div>
  )
}

export default Content
