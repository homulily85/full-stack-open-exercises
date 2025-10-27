import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote.js'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote (state, action) {
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

export const voteAnecdote = (anecdoteId) => {
  return async (dispatch, getState) => {
    const anecdotesToVote = getState().anecdotes.find(a => a.id === anecdoteId)
    await anecdoteService.update(
      { ...anecdotesToVote, votes: anecdotesToVote.votes + 1 })
    dispatch(anecdoteSlice.actions.vote(anecdoteId))
  }
}
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    dispatch(anecdoteSlice.actions.setAnecdotes(await anecdoteService.getAll()))
  }
}

export const createNewAnecdote = (anecdote) => {
  return async (dispatch) => {
    dispatch(anecdoteSlice.actions.createAnecdote(
      await anecdoteService.create(anecdote)))
  }
}

export default anecdoteSlice.reducer
