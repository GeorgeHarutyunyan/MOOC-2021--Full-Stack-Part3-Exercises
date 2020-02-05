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

const errorHandler = (error,request,response,next) => {
  console.log(error)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

app.get('/api/persons',(request,response,next) => {
  Person.find({})
  .then(people => {
    response.json(people.map(person => person.toJSON()))
  })
  .catch(error=> next(error))
})

app.get('/info', (request, response,next) => {
  Person.find({})
  .then(people => response.json(`Phonebook has info for ${people.length} people`))
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response,next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      }
      else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
  })

app.delete('/api/persons/:id', (request, response,next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error=>next(error))
    

})

app.post('/api/persons', (request, response,next) => {

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
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = { name: body.name, number: body.number }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON())
        })
    .catch(error=> next(error))
})
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT,() => console.log(`Server running on port ${PORT}`))