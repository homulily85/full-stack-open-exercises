import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (e) => {
    e.preventDefault()
    dispatch(createAnecdote(e.target.anecdote.value))
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