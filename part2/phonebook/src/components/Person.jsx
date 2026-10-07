import axios from 'axios'
import personService from '../services/persons.js'

const Person = ({person, setPersons, persons}) => {
    const handleDelete = () => {
        if (window.confirm(`Delete ${person.name}?`)) {
            personService  
                .remove(person.id)
                .then(() => {
                    setPersons(
                        persons.filter(p => p.id !== person.id)
                    )
                })
            console.log(`${person.name} removed`)
        } else {
            console.log("no removal")
        }
        
    }


    return <li>{person.name} {person.number}
                <button onClick={handleDelete}>
                    delete
                </button>
            </li>
}
export default Person



