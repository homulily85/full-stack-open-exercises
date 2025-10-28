import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdote.js'
import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { notificationsDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: data => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(data))
      notificationsDispatch(
        { type: 'CREATE', payload: `You added ${data.content}` })
      setTimeout(() => {
        notificationsDispatch(
          { type: 'REMOVE', payload: `You added ${data.content}` })
      }, 5000)
    },
    onError: () => {
      notificationsDispatch(
        {
          type: 'CREATE',
          payload: `too short anecdote, must have length 5 or more`,
        })
      setTimeout(() => {
        notificationsDispatch(
          {
            type: 'REMOVE',
            payload: `too short anecdote, must have length 5 or more`,
          })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
