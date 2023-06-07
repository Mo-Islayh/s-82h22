import React, { useRef } from "react"
import { Link } from "react-router-dom"

function ResetPassword() {
  const emailRef = useRef(null)

  const formSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
    }
    // Send payload to the sever >>
    console.log(payload)

    alert("Please check your email for password reset instructions.")

    emailRef.current.value = ""
  }
  return (
    <div className="auth-container">
      <form onSubmit={formSubmit} className="auth-box">
        <p className="auth-text-head">Reset Password</p>
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          required
          ref={emailRef}
        />
        <button className="auth-button">Send</button>
        <div className="auth-text-buttom-wrapper">
          <p>Done?</p>
          <Link to={"/login"} className="auth-text-buttom">
            Login
          </Link>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
