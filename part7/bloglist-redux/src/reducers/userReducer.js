import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user.js'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set (state, action) {
      return action.payload
    },

    logout () {
      userService.logout()
      return null
    },
  },
})

export const initUser = () => {
  return (dispatch) => {
    const loggedUser = window.localStorage.getItem('logged-user')
    if (loggedUser) {
      dispatch(userSlice.actions.set(JSON.parse(loggedUser)))
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(userSlice.actions.set(await userService.login(credentials)))
    } catch (e) {
      throw e
    }
  }
}

export const { logout } = userSlice.actions

export default userSlice.reducer