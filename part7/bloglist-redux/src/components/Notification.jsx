import '../app.css'
import { useSelector } from 'react-redux'
import SuccessMessage from './SuccessMessage.jsx'
import ErrorMessage from './ErrorMessage.jsx'

const Notification = () => {
  const notifications = useSelector(state => state.notifications)

  if (notifications.length === 0) {
    return null
  }

  return <>
    {notifications.map(
      n => n.type === 'success' ? <SuccessMessage message={n.content}/> :
        <ErrorMessage message={n.content}/>)}
  </>

}

export default Notification