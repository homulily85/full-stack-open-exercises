import { useState } from 'react'
import Menu from './component/Menu.jsx'
import AnecdoteList from './component/AnecdoteList.jsx'
import About from './component/About.jsx'
import CreateNew from './component/CreateNew.jsx'
import Footer from './component/Footer.jsx'
import { Navigate, Route, Routes, useMatch } from 'react-router-dom'
import Anecdote from './component/Anecdote.jsx'
import Notification from './component/Notification.jsx'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>
      <Notification content={notification}></Notification>
      <Routes>
        <Route path="/"
               element={<AnecdoteList anecdotes={anecdotes}/>}></Route>
        <Route
          path="/anecdotes/:id"
          element={
            anecdote
              ? <Anecdote anecdote={anecdote}/>
              : <Navigate replace to="/"/>
          }
        />
        <Route path="/create" element={<CreateNew addNew={addNew}/>}></Route>
        <Route path="about" element={<About/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
