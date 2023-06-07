import React, { useRef } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeUsers } from "../../redux/reducers/users"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { validatePassword } from "../../utils/validatePassword"

function ModalUserANE({ closeModal, currentUser }) {
  const dispatch = useDispatch()

  const [cateError, setCateError] = useState("")
  const UsersArray = useSelector((state) => state.users.users)
  const [name, setName] = useState(currentUser?.name ?? "")
  const [email, setEmail] = useState(currentUser?.email ?? "")
  const [password, setPassword] = useState(currentUser?.password ?? "")

  const onClose = () => {
    closeModal()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim()) {
      setCateError("Must Add A Name")
      return
    }
    if (!email.trim()) {
      setCateError("Must Add An Email")
      return
    }

    if (!password.trim()) {
      setCateError("Must Add a Password")
      return
    }
    if (password.trim().length < 8) {
      setCateError("Password Must At least 8 chars")
      return
    }
    const isValid = validatePassword(password)

    if (!isValid) {
      setCateError(
        "Password Must contain uppercase letters, numbers, and special characters"
      )
      return
    }

    const usersEmails = UsersArray.map((user) => {
      if (currentUser) {
        if (user.email !== currentUser.email) {
          return user.email
        }
      } else {
        return user.email
      }
    })

    if (usersEmails.includes(email)) {
      setCateError("Sorry, But this email exist, chooes another one.")
      return
    }

    if (currentUser) {
      const myNewArrau = [...UsersArray].map((user) => {
        if (user.userId === currentUser.userId) {
          return {
            ...currentUser,
            name,
            password: password.trim(),
            email,
          }
        }
        return user
      })
      dispatch(changeUsers(myNewArrau))
    } else {
      const myNewArrau = [...UsersArray]
      myNewArrau.push({
        name,
        userId: new Date().getTime(),
        userImg: "/images/user-img.jpg",
        password: password.trim(),
        email,
      })
      dispatch(changeUsers(myNewArrau))
    }
    closeModal()
  }

  const parentRef = useRef(null)

  const handleCloseFromParent = (event) => {
    if (event.target === parentRef.current) {
      closeModal()
    }
  }

  const [showPass, setShowPass] = useState(false)

  return (
    <div
      className="modal-container"
      onClick={handleCloseFromParent}
      ref={parentRef}
    >
      <form className="modal-body" onSubmit={handleSubmit}>
        <p className="modal-body-header">
          {currentUser ? "Edit Product" : "Add Product"}
        </p>
        <div className="modal-inputs">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            id="name"
            type="text"
            placeholder="Name"
            required
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            id="email"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <label htmlFor="password">Password</label>
          <div className="pass-con">
            <input
              value={password}
              id="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <button
              type="button"
              className="eye-btn-password"
              onClick={() => {
                setShowPass(!showPass)
              }}
            >
              {!showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
            </button>
          </div>

          {cateError && <p className="modal-cate-error">{cateError}</p>}
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            CANCEL
          </button>
          <button type="submit"> {currentUser ? "EDIT" : "ADD"} </button>
        </div>
      </form>
    </div>
  )
}

export default ModalUserANE
