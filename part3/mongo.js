const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Invalid number of arguments')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)



if (process.argv.length === 3) {
    Person.find({})
        .then(persons => {
            console.log('phonebook:')

            persons.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        })
        .catch(error => {
            console.error('Error fetching people:', error.message)
        })
        .finally(() => {
            mongoose.connection.close()
        })
    
}  else if (process.argv.length === 5) {
    const person = new Person({
        name: name,
        number: number
    })

    person.save()
        .then(result => {
            console.log(`added ${name} number ${number} to phonebook`)
        })
        .catch(error => {
            console.error('Error saving person:', error.message)
        })
        .finally(() => {
            mongoose.connection.close()
        })
} else {
    console.log('Invalid number of arguments')
    process.exit(1)
}














