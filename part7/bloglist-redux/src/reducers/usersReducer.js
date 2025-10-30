import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.js'

const usersSLice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    set (state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    dispatch(usersSLice.actions.set(await userService.getUsers()))
  }
}

export default usersSLice.reducer