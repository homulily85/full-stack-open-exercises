import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setNotification (state, action) {
      state.push(action.payload)
    },

    removeNotification (state, action) {
      const index = state.indexOf(action.payload)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer