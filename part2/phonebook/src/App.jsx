import {useEffect, useState} from 'react';
import Filter from './component/Filter.jsx';
import PersonForm from './component/PersonForm.jsx';
import Persons from './component/Person.jsx';
import phonebook from './service/phonebook.js';
import SuccessMessage from './component/SuccessMessage.jsx';
import ErrorMessage from './component/ErrorMessage.jsx';

let personsdb = [];

const App = () => {
  const [persons, setPersons] = useState([...personsdb]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleTypeName = (e) => {
    setNewName(e.target.value);
  };

  const handleTypeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSearchType = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length === '') {
      setPersons([...personsdb]);
    } else {
      setPersons(personsdb.filter((p) => p.name.toLocaleLowerCase().
          includes(e.target.value.toLocaleLowerCase())));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.findIndex((p) => p.name === newName.trim()) >= 0) {
      if (confirm(
          `${newName} is already added to phonebook, replace the old number with a new one`)) {
        const updatedPerson = personsdb.find(p => p.name === newName);
        updatedPerson.number = newNumber;
        phonebook.update(updatedPerson).then(
            (data) => {
              personsdb = personsdb.filter(p => p.id === data.id ? data : p);
              setPersons([...personsdb]);
              setNewName('');
              setNewNumber('');
              setSearch('');
              setSuccess(`Changed number for ${data.name}`);
              setTimeout(() => setSuccess(''), 5000);
            },
        ).catch(e => {
          setError(e.response.data.error);
          setTimeout(() => setError(''), 5000);
        });
      }
      return;
    }

    phonebook.add({name: newName.trim(), number: newNumber.trim()}).then(
        (data) => {
          personsdb.push(data);
          setPersons([...personsdb]);
          setNewName('');
          setNewNumber('');
          setSearch('');
          setSuccess(`Added ${data.name}`);
          setTimeout(() => setSuccess(''), 5000);
        },
    ).catch(e => {
      setError(e.response.data.error);
      setTimeout(() => setError(''), 5000);
    });
  };

  useEffect(() => {
    phonebook.initData().then(data => {
      personsdb = personsdb.concat(data);
      setPersons([...personsdb]);
    });
  }, []);

  const handleDelete = (e) => {
    phonebook.deleteItem(e.target.getAttribute('data-id')).then(data => {
      personsdb = personsdb.filter(p => p.id === data.id ? null : p);
      setPersons([...personsdb]);
      setSearch('');
      setSuccess(`Deleted ${data.name}`);
      setTimeout(() => setSuccess(''), 5000);
    }).catch(() => {
      setError('This record does not exist on server!');
      personsdb = personsdb.filter(
          p => p.id === e.target.getAttribute('data-id') ? null : p);
      setPersons([...personsdb]);
      setSearch('');
      setTimeout(() => setError(''), 5000);
    });
  };
  return (
      <>
        <h2>Phonebook</h2>
        <SuccessMessage message={success}></SuccessMessage>
        <ErrorMessage message={error}></ErrorMessage>
        <Filter filterValue={search} onFilterChange={handleSearchType}></Filter>
        <h3>add a new</h3>
        <PersonForm newNameInputValue={newName} newNumberInputValue={newNumber}
                    onNewNameInputValueChange={handleTypeName}
                    onNewNumberInputValueChange={handleTypeNumber}
                    onSubmit={handleSubmit}></PersonForm>
        <h3>Numbers</h3>
        <Persons persons={persons} onClick={handleDelete}></Persons>
      </>
  );
};

export default App;