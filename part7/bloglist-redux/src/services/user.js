import axios from 'axios'

const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getToken = () => token

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  setToken(response.data.token)
  window.localStorage.setItem('logged-user', JSON.stringify(response.data))
  return response.data
}

const logout = () => {
  window.localStorage.removeItem('logged-user')
  setToken('')
}

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { setToken, getToken, login, logout, getUsers }