import { combineReducers, configureStore } from "@reduxjs/toolkit"
import products from "./reducers/products"
import users from "./reducers/users"

const rootReducer = combineReducers({
  products,
  users,
})

export const store = configureStore({
  reducer: rootReducer,
})
