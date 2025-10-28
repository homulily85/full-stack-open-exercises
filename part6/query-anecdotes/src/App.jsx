import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { NotificationContextProvider } from './context/NotificationContext.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContextProvider>
        <Notification></Notification>
        <AnecdoteForm/>
        <AnecdoteList/>
      </NotificationContextProvider>

    </div>
  )
}

export default App
