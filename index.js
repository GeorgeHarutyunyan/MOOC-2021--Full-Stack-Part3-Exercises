const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Person = require('./models/person')


const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(express.static('build'))

var morgan= require('morgan')
morgan.token('data', function(req,res) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.get('/api/persons',(request,response) => {
  Person.find({}).then(people => {
    response.json(people.map(person => person.toJSON()))
  })
})

app.get('/info', (request, response) => {
  Person.find({})
  .then(people => response.json(`Phonebook has info for ${people.length} people`))
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      }
      else {
        response.status(204).end()
      }
    })
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(n => n.id === id)
    persons = persons.filter(n => n.id !== person.id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {

    const body = request.body
    const name = body.name
    const number = body.number

    const person = new Person(
        {
            name,
            number,
        })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(formattedPerson => response.json(formattedPerson))
    .catch(error => console.log(error))


    response.end()
})

const PORT = process.env.PORT 
app.listen(PORT,() => console.log(`Server running on port ${PORT}`))