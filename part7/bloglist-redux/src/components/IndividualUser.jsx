import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const IndividualUser = () => {
  const {id} = useParams()
  const user = useSelector(state => state.users.find(u => u.id === id))
  if (!user) return null
  return <>
    <h2>{user.name}</h2>
    <h3>added blogs</h3>
    <ul>
      {user.blogs.map(b => (
        <li key={b.id}>{b.title}</li>
      ))}
    </ul>
  </>
}

export default IndividualUser