import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdote.js'
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const create = async (e) => {
    e.preventDefault()
    const newAnecdote = await anecdoteService.create({
      id: getId(),
      content: e.target.anecdote.value,
      votes: 0,
    })

    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You created ${newAnecdote.content}`))
    setTimeout(
      () => dispatch(
        removeNotification(`You created ${newAnecdote.content}`)), 5000)
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