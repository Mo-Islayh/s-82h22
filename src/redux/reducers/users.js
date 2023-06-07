import { createSlice } from "@reduxjs/toolkit"

export const Users = createSlice({
  name: "Users",
  initialState: {
    users: [],
  },
  reducers: {
    changeUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

export const { changeUsers } = Users.actions

export default Users.reducer
