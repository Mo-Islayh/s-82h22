import React from "react"
import SagerLogo from "../../assets/SagerLogo.png"
import { NavLink } from "react-router-dom"
import { AiOutlineCloseCircle, AiOutlineHome } from "react-icons/ai"
import { BsInboxes, BsBoxes } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"

function SideBar({ isNavOpen, setIsNavOpen }) {
  const onCloseSide = () => {
    if (window.innerWidth <= 600) {
      setIsNavOpen(!isNavOpen)
    }
  }
  return (
    isNavOpen && (
      <div className="dashboard-sidebar">
        <div
          className="close-side-bar"
          onClick={() => {
            setIsNavOpen(!isNavOpen)
          }}
        >
          <AiOutlineCloseCircle size={50} color="gray" />
        </div>
        <div className="logo-container">
          <img className="logo" src={SagerLogo} alt="Sager-Logo" />
        </div>
        <div className="items-container">
          <SideBarItem
            onCloseSide={onCloseSide}
            text={"Main"}
            to={""}
            icon={<AiOutlineHome />}
          />
          <SideBarItem
            onCloseSide={onCloseSide}
            text={"Products"}
            to={"products"}
            icon={<BsInboxes />}
          />
          <SideBarItem
            onCloseSide={onCloseSide}
            text={"Categories"}
            to={"categories"}
            icon={<BsBoxes />}
          />
          <SideBarItem
            onCloseSide={onCloseSide}
            text={"Users"}
            to={"users"}
            icon={<FiUsers />}
          />
        </div>
      </div>
    )
  )
}

export default SideBar

const SideBarItem = ({ to, icon, text, onCloseSide }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? "sidebar-item-active" : "sidebar-item"
      }
      to={`/dashboard/${to}`}
      onClick={() => {
        onCloseSide()
      }}
    >
      <div className="sidebar-icon-container">{icon}</div>
      <span>{text}</span>
    </NavLink>
  )
}
