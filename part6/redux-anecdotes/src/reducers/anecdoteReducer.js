import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdote (state, action) {
      const anecdote = state.find(a => a.id === action.payload)
      anecdote.votes++
    },
    createAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdotes (state, action) {
      return action.payload
    },
  },
})

export const {
  voteAnecdote,
  createAnecdote,
  setAnecdotes,
} = anecdoteSlice.actions

export default anecdoteSlice.reducer
