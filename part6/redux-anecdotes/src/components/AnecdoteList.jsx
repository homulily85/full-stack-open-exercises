import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer.js'
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer.js'

const AnecdoteList = () => {
  const anecdotes = useSelector(
    state => state.anecdotes.filter(
      a => state.filter !== '' ?
        a.content.toLowerCase().includes(state.filter) : a).
      toSorted((a, b) => b.votes - a.votes))

  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted ${anecdote.content}`))
    setTimeout(
      () => dispatch(removeNotification(`You voted ${anecdote.content}`)), 5000)
  }

  return <>
    {anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ))}
  </>
}

export default AnecdoteList