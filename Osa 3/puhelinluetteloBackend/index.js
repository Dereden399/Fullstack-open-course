const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan('tiny'))

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.write(`<p>Phonebook has info for ${persons.length}</p>`)
  res.write(`<p>${new Date().toTimeString()}</p>`)
  res.send()
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(x => x.id === id)
  if(person) res.json(person)
  else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(x => x.id !== id)
  res.status(204).end()
})

app.post('/api/persons', morgan(':method :url :status :res[content-length] - :response-time ms - :body'), (req, res) => {
  if(!req.body || !req.body.name || !req.body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  if(persons.map(x => x.name.toLowerCase()).some(x => x === req.body.name.toLowerCase())) {
    return res.status(400).json({
      error: 'name is already in list'
    })
  }

  let id = Math.floor(Math.random()*1000)
  while(persons.map(x => x.id).includes(id)) id = Math.floor(Math.random()*1000)
  const person = {
    id: id,
    name: req.body.name,
    number: req.body.number
  }
  persons = persons.concat(person)
  res.json(person)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})