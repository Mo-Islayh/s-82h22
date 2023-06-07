import { createBrowserRouter } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/Home"
import Signup from "./pages/signup"
import ResetPassword from "./pages/resetPassword"
import Dashboard from "./pages/dashboard"
import Products from "./pages/dashboard/products"
import Categories from "./pages/dashboard/categories"
import Users from "./pages/dashboard/users"
import Layout from "./components/layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/products",
        element: <Products />,
      },
      {
        path: "/dashboard/categories",
        element: <Categories />,
      },
      {
        path: "/dashboard/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
])

export default router
