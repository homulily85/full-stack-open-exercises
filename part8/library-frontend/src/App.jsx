import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login.jsx'
import Recommend from './components/Recommend.jsx'

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(localStorage.getItem('token'))

    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>

                {token ? (
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommend')}>recommend
                        </button>
                        <button onClick={logout}>log out</button>
                    </>
                ) : (
                    <button onClick={() => setPage('log in')}>log in</button>
                )}
            </div>

            <Authors show={page === 'authors'} token={token}/>

            <Books show={page === 'books'}/>

            <NewBook show={page === 'add'}/>

            <Login show={page === 'log in'} setToken={setToken}
                   setPage={setPage}></Login>

            <Recommend show={page === 'recommend'}></Recommend>
        </div>
    )
}

export default App
