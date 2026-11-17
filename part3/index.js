require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({
      error: 'malformatted id'
    })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}

app.use(express.json())
app.use(express.static('dist'))
morgan.token('body', (request) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const time = new Date()

            response.send(`
                <h1>Phonebook has info for ${count} people</h1>
                <p>${time}</p>
            `)
        })
        .catch(next)
})
app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(next)
})
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(next)
})
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(next)
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body?.name || !body?.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.status(201).json(savedPerson)
        })
        .catch(next)
})

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body

  if (!number) {
    return response.status(400).json({
      error: 'Number missing'
    })
  }

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.number = number

      return person.save().then(updatedPerson => {
        response.json(updatedPerson)
      })
    })
    .catch(next)
})
const unknownEndpoint = (request, response) => {
  response.status(404).json({
    error: 'unknown endpoint'
  })
}

app.use(unknownEndpoint)

app.use(errorHandler)


const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})