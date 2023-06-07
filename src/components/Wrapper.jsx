import { useDispatch } from "react-redux"
import { changeCategories, changeProducts } from "../redux/reducers/products"
import { changeUsers } from "../redux/reducers/users"
import { useEffect } from "react"
import products from "../dummyData/products.json"
import categories from "../dummyData/categories.json"
import users from "../dummyData/users.json"
function Wrapper({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeProducts(products))
    dispatch(changeCategories(categories))
    dispatch(changeUsers(users))
  }, [])

  return children
}

export default Wrapper
