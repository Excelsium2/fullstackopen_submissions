import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person.jsx'
import Filter from './components/Filter.jsx'
import AddNew from './components/AddNew.jsx'
import Numbers from './components/Numbers.jsx'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterKeyword, setFilterKeyword] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(persons => {
        console.log('promise fulfilled')
        setPersons(persons)})
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterKeyword={filterKeyword} setFilterKeyword={setFilterKeyword} />
      <h2>Add New</h2>
      <AddNew persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} setPersons={setPersons}  filterKeyword={filterKeyword} />
    </div>
  )
}

export default App
