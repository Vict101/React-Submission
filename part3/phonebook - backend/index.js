require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const custom = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
})



app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(custom)


app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/info', (request, response) => {
  const date = new Date().toString()
  Person.find({}).then(people => {
    response.send(
      `Phonebook has info for ${people.length} people<br/> ${date}`
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({
      error: 'name or number cannot be empty'
    })
  }

/*   if (persons.filter(p => p.name === body.name).length > 0) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  } */

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => {
    response.json(updatedPerson)    
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status.send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})