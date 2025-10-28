const Anecdote = ({ anecdote }) => {
  return <>
   <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
  </>
}

export default Anecdote