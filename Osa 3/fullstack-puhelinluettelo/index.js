require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan('tiny'))

morgan.token('body', req => JSON.stringify(req.body))

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name == 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.write(`<p>Phonebook has info for ${persons.length}</p>`)
  res.write(`<p>${new Date().toTimeString()}</p>`)
  res.send()
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    console.log(persons)
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id).then(person => {
    if(person) res.json(person)
    else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
  .then(result => res.status(204).end())
  .catch(error => next(error))
  persons = persons.filter(x => x.id !== id)
  res.status(204).end()
})

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms - :body'), (req, res, next) => {
  if(!req.body || !req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  /*if(persons.map(x => x.name.toLowerCase()).some(x => x === req.body.name.toLowerCase())) {
    return res.status(400).json({
      error: 'name is already in list'
    })
  }*/

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })
  //persons = persons.concat(person)
  person.save().then(savedPerson => res.json(person))
  .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})