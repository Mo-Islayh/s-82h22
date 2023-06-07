import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeUsers } from "../../redux/reducers/users"

function ModalUserDelete({ closeModal, currentUser }) {
  const UsersArray = useSelector((state) => state.users.users)

  const dispatch = useDispatch()

  const onClose = () => {
    closeModal()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newArra = [...UsersArray].filter((user) => user !== currentUser)

    dispatch(changeUsers(newArra))
    closeModal()
  }

  const parentRef = useRef(null)

  const handleCloseFromParent = (event) => {
    if (event.target === parentRef.current) {
      closeModal()
    }
  }

  return (
    <div
      className="modal-container"
      onClick={handleCloseFromParent}
      ref={parentRef}
    >
      <form className="modal-body" onSubmit={handleSubmit}>
        <p className="modal-body-header">Delete User</p>
        <p>
          This action will remove the selected user, Are you sure about that ?
        </p>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit">OKAY</button>
        </div>
      </form>
    </div>
  )
}

export default ModalUserDelete
