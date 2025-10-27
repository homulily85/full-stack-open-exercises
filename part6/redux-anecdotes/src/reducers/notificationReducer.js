import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    set (state, action) {
      state.push(action.payload)
    },

    remove (state, action) {
      const index = state.indexOf(action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

export const createNotification = (content) => {
  return async (dispatch) => {
    dispatch(notificationSlice.actions.set(content))
    setTimeout(() => dispatch(notificationSlice.actions.remove(content)), 5000)
  }
}

export default notificationSlice.reducer