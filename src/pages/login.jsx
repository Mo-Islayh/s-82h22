import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const navigate = useNavigate()
  const formSubmit = (e) => {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    // Send payload to the sever >>
    console.log(payload)
    navigate("/dashboard/")
  }
  return (
    <div className="auth-container">
      <form onSubmit={formSubmit} className="auth-box">
        <p className="auth-text-head">Login</p>
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
        <Link to="/resetpassword" className="auth-text-password">
          Forgot password?
        </Link>
        <button className="auth-button">Login</button>
        <div className="auth-text-buttom-wrapper">
          <p>Dont have an account?</p>
          <Link to={"/signup"} className="auth-text-buttom" href="#">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
