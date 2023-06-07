import { createSlice } from "@reduxjs/toolkit"

export const Products = createSlice({
  name: "Products",
  initialState: {
    products: [],
    categories: [],
  },
  reducers: {
    changeProducts: (state, action) => {
      state.products = action.payload
    },
    changeCategories: (state, action) => {
      state.categories = action.payload
    },
  },
})

export const { changeProducts, changeCategories } = Products.actions

export default Products.reducer
