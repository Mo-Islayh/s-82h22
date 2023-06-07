import React, { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signup() {
  const namelRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const navigate = useNavigate()

  const [passwordErrors, setPasswordErrors] = useState({
    password: "",
    confirmPassword: "",
  })
  const formSubmit = (e) => {
    e.preventDefault()
    const name = namelRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confirm_password = confirmPasswordRef.current.value

    // password validation
    if (!password.trim()) {
      setPasswordErrors({
        password: "* Password must be valid",
        confirmPassword: "",
      })
      return
    }
    if (password.length < 8) {
      setPasswordErrors({
        password: "* Password must contain at least 8 chars",
        confirmPassword: "",
      })
      return
    }
    if (password !== confirm_password) {
      setPasswordErrors({
        password: "",
        confirmPassword: "Passwords dont match",
      })
      return
    }

    const payload = {
      name,
      email,
      password,
      confirm_password,
    }
    // Send payload to the sever >>
    console.log(payload)
    navigate("/dashboard/")
  }
  return (
    <div className="auth-container">
      <form onSubmit={formSubmit} className="auth-box">
        <p className="auth-text-head">Sign Up</p>
        <input
          ref={namelRef}
          className="auth-input"
          type="text"
          placeholder="Name"
          required
        />
        <input
          ref={emailRef}
          className="auth-input"
          type="email"
          placeholder="Email"
          required
        />
        <input
          ref={passwordRef}
          className="auth-input"
          type="password"
          placeholder="Password"
          required
        />
        {passwordErrors.password && (
          <p className="auth-text-password-error">{passwordErrors.password}</p>
        )}
        <input
          ref={confirmPasswordRef}
          className="auth-input"
          type="password"
          placeholder="Confirm Password"
          required
        />
        {passwordErrors.confirmPassword && (
          <p className="auth-text-password-error">
            {passwordErrors.confirmPassword}
          </p>
        )}
        <button className="auth-button">Sign Up</button>
        <div className="auth-text-buttom-wrapper">
          <p>Already have an account?</p>
          <Link to={"/login"} className="auth-text-buttom">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
