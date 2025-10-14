const Persons = ({persons, onClick}) => {
  return persons.map(
      (person) => <p key={person.id}>{person.name} {person.number}
        <button onClick={onClick} data-id={person.id}>Delete</button>
      </p>);
};

export default Persons;