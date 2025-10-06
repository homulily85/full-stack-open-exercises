import {useEffect, useState} from 'react'
import axios from "axios";

const personsdb = []
const Filter = ({filterValue, onFilterChange}) => {
    return <p>filter shown with <input onChange={onFilterChange} value={filterValue}/></p>
}

const PersonForm = ({
                        newNameInputValue,
                        onNewNameInputValueChange,
                        newNumberInputValue,
                        onNewNumberInputValueChange,
                        onSubmit
                    }) => {
    return <form>
        <div>
            name: <input onChange={onNewNameInputValueChange} value={newNameInputValue}/>
        </div>
        <div>
            number: <input onChange={onNewNumberInputValueChange} value={newNumberInputValue}/>
        </div>
        <div>
            <button type="submit" onClick={onSubmit}>add</button>
        </div>
    </form>
}

const Persons = ({persons}) => {
    return persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)

}

const App = () => {
    const [persons, setPersons] = useState([...personsdb])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')

    const handleTypeName = (e) => {
        setNewName(e.target.value)
    }

    const handleTypeNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const handleSearchType = (e) => {
        setSearch(e.target.value)
        if (e.target.value.length === '') {
            setPersons([...personsdb])
        } else {
            setPersons(personsdb.filter((p) => p.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (persons.findIndex((p) => p.name === newName.trim()) >= 0) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        personsdb.push({name: newName.trim(), number: newNumber.trim(), id: personsdb.length + 1})
        setPersons([...personsdb])
        setNewName("")
        setNewNumber("")
        setSearch("")
    }

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then(
            response => {
                personsdb.concat(response.data)
                setPersons([...response.data])
            }
        )
    }, [])

    return (
        <>
            <h2>Phonebook</h2>
            <Filter filterValue={search} onFilterChange={handleSearchType}></Filter>
            <h3>add a new</h3>
            <PersonForm newNameInputValue={newName} newNumberInputValue={newNumber}
                        onNewNameInputValueChange={handleTypeName}
                        onNewNumberInputValueChange={handleTypeNumber} onSubmit={handleSubmit}></PersonForm>
            <h3>Numbers</h3>
            <Persons persons={persons}></Persons>
        </>
    )
}

export default App