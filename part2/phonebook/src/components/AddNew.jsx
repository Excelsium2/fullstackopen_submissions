import { useState } from 'react'
import axios from 'axios'
import personService from '../services/persons.js' 

const AddNew = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const cleanStr = str => str.trim().replace(/\s+/g, ' ')

    const clearForm = () => {
        setNewName('')
        setNewNumber('')
    }


    const addPerson = (event) => {
        event.preventDefault()
        const persons = props.persons
        const setPersons = props.setPersons
        const existingPerson = persons.find(
            person => cleanStr(person.name) === cleanStr(newName)
        )
        const existingNumber = persons.find(
            person => cleanStr(person.number) === cleanStr(newNumber)
        )
        const nameObject = {
            name: newName,
             number: newNumber,
        }

        if (existingPerson) {
            if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
                personService
                    .update(existingPerson.id, nameObject)
                    .then(updatedPerson => {
                        setPersons(
                            persons.map(person =>
                                person.id === existingPerson.id ? updatedPerson : person
                            )
                        )
                        clearForm()
                    })
            }
        } else if (existingNumber){
            alert(`${cleanStr(newNumber)} is already added to phonebook`)
        } else {
            personService
                .create(nameObject)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson))
                    clearForm()
                    console.log('button clicked', event.target)
                })
        }
    }
  
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (

        <form onSubmit={addPerson}>
            <div>
            name: <input value={newName}
                        onChange={handleNameChange} />
            </div>
            <div>
            number: <input value={newNumber}
                            onChange={handleNumberChange} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )

}
export default AddNew

