import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification.length === 0) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  const getId = () => (100000 * Math.random()).toFixed(0)

  return <>
    {notification.map(n => <div key={getId()} style={style}>{n}</div>)}
  </>

}

export default Notification
