import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (e) => {
    e.preventDefault()
    dispatch(createAnecdote(e.target.anecdote.value))
    dispatch(setNotification(`You created ${e.target.anecdote.value}`))
    setTimeout(
      () => dispatch(
        removeNotification(`You created ${e.target.anecdote.value}`)), 5000)
    e.target.anecdote.value = ''
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={create}>
      <div>
        <input name="anecdote"/>
      </div>
      <button>create</button>
    </form>
  </>
}

export default AnecdoteForm