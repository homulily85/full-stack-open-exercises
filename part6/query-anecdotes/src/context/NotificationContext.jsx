import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.payload]
    case 'REMOVE':
      return state.filter(n => n !== action.payload)
    default:
      return state
  }

}

export const NotificationContextProvider = (prop) => {
  const [notifications, notificationsDispatch] = useReducer(notificationReducer,
    [])

  return <NotificationContext.Provider
    value={{ notifications, notificationsDispatch }}>
    {prop.children}
  </NotificationContext.Provider>
}

export default NotificationContext