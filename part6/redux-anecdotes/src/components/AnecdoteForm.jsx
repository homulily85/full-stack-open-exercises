import { createNewAnecdote } from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer.js'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const create = async (e) => {
    e.preventDefault()
    const newAnecdote = {
      id: getId(),
      content: e.target.anecdote.value,
      votes: 0,
    }

    dispatch(createNewAnecdote(newAnecdote))
    dispatch(createNotification(`You created ${newAnecdote.content}`))
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