import React from "react"
import ReactDOM from "react-dom/client"
import "./App.css"

import { RouterProvider } from "react-router-dom"
import router from "./router.jsx"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import Wrapper from "./components/Wrapper"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </Provider>
  </React.StrictMode>
)
