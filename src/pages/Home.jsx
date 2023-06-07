import React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/login")
  }, [])

  return <div>hello world</div>
}

export default Home
