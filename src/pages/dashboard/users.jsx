import React, { useState } from "react"
import {
  AiFillDelete,
  AiOutlineAppstoreAdd,
  AiFillEyeInvisible,
  AiFillEye,
} from "react-icons/ai"
import { FaEdit } from "react-icons/fa"
import { useSelector } from "react-redux"
import ModalUserANE from "../../components/Modals/ModalUserANE"
import ModalUserDelete from "../../components/Modals/ModalUserDelete"

const Users = () => {
  const Users = useSelector((state) => state.users.users)

  const handleModal = (modalName) => {
    setIsModalOpen((prev) => {
      return { ...prev, [modalName]: true }
    })
  }

  const modalInit = {
    add: false,
    delete: false,
  }

  const [isModalOpen, setIsModalOpen] = useState(modalInit)
  const closeModal = () => {
    setIsModalOpen(modalInit)
  }

  const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className="users-container">
      {isModalOpen.add && (
        <ModalUserANE closeModal={closeModal} currentUser={currentUser} />
      )}
      {isModalOpen.delete && (
        <ModalUserDelete closeModal={closeModal} currentUser={currentUser} />
      )}

      <div className="products-line-head">
        <p>Users</p>
        <button
          onClick={() => {
            handleModal("add")
            setCurrentUser(null)
          }}
        >
          <div>Add User</div>
          <AiOutlineAppstoreAdd size={18} />
        </button>
      </div>
      <div className="users-items">
        {Users.map((user, _id) => (
          <User
            user={user}
            key={_id}
            handleModal={handleModal}
            setCurrentUser={setCurrentUser}
          />
        ))}
      </div>
    </div>
  )
}

export default Users

const User = ({ user, setCurrentUser, handleModal }) => {
  const [showPass, setShowPass] = useState(false)
  return (
    <div className="user-item">
      <img src={user.userImg} alt="user-image" className="user-image" />
      <div className="user-text-con">
        <p>
          <strong>Name:</strong> <span>{user.name}</span>
        </p>
        <p>
          <strong>Id:</strong> <span>{user.userId}</span>
        </p>
        <p>
          <strong>Email:</strong> <span>{user.email}</span>
        </p>
        <div className="pass-con">
          <strong>Password:</strong>
          <span>
            {showPass
              ? user.password
              : Array(user.password.length)
                  .fill("*")
                  .map((char) => char)}
          </span>
          <button
            className="eye-btn-password"
            onClick={() => {
              setShowPass(!showPass)
            }}
          >
            {showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>
        </div>
      </div>

      <div className="actions-container">
        <button
          className="actions-btn"
          onClick={() => {
            handleModal("add")
            setCurrentUser(user)
          }}
        >
          <p>Edit</p>
          <FaEdit />
        </button>
        <button
          className="actions-btn"
          onClick={() => {
            handleModal("delete")
            setCurrentUser(user)
          }}
        >
          <p>Delete</p>
          <AiFillDelete />
        </button>
      </div>
    </div>
  )
}
