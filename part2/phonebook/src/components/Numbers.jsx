import Person from './Person'

const Numbers = ({persons, setPersons, filterKeyword}) => {

    const filteredPhonebook = persons.filter((person) => person.name.toLowerCase().startsWith(filterKeyword.toLowerCase()))

    return (
        <ul>
        {filteredPhonebook.map(person => <Person person={person}
                                                 key = {person.id}
                                                 setPersons={setPersons} 
                                                 persons={persons}/> )}
        </ul>
    )
    
}

export default Numbers 
