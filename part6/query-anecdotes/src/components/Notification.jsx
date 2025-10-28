import { useContext } from 'react'
import NotificationContext from '../context/NotificationContext.jsx'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  const { notifications } = useContext(NotificationContext)

  if (notifications.length === 0) {
    return null
  }

  const getId = () => (100000 * Math.random()).toFixed(0)

  return <>
    {notifications.map(n => <div key={getId()} style={style}>{n}</div>)}
  </>
}

export default Notification
