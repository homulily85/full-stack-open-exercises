import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdote.js'
import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext.jsx'

const AnecdoteList = () => {
  const queryClient = useQueryClient()

  const { notificationsDispatch } = useContext(NotificationContext)

  const voteMutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: data => {
      queryClient.setQueryData(['anecdotes'], (old) => {
        return old.map(a => a.id === data.id ? data : a)
      })
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: 3,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <>
      loading data ...
    </>
  }

  if (result.isError) {
    return <>
      anecdote service not available due to problems in server
    </>
  }

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notificationsDispatch(
      { type: 'CREATE', payload: `You voted ${anecdote.content}` })
    setTimeout(() => {
      notificationsDispatch(
        { type: 'REMOVE', payload: `You voted ${anecdote.content}` })
    }, 5000)
  }

  const anecdotes = result.data

  return <>
    {anecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ))}
  </>

}

export default AnecdoteList