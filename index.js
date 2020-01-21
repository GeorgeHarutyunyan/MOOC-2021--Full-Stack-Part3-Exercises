const express = require('express')
const mongoose = require('mongoose')
const app = express()


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




// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url =
  'mongodb+srv://fullstack:sekred@cluster0-ostce.mongodb.net/note-app?retryWrites=true'

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

let persons = [
  {
    name:"George",
    number: "611",
    id:1
  },
  {
    name: "Anna",
    number: "1234",
    id:2
  },
  {
    name: "Gohar",
    number: "1111",
    id:3
  }
]

app.get('/api/persons',(request,response) => response.json(persons))


app.get('/info', (request, response) => {
    response.write(`Phonebook has info for ${persons.length} people\n`)
    response.write(new Date().toString())
    response.end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(n => n.id === id)
    if (person) {
        response.json(person)
    }
    response.status(404).end()
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
    const id = Math.floor(Math.random() * 1000)
    const newPerson = {name,number,id}
    if (name && number) {
      if (!persons.find(n => n.name === name)) {
        persons = persons.concat(newPerson)
      }
      else {
        return response.status(400).json({
          error: `Person already in contacts list`
        })
      }
    }
    else {
      return response.status(400).json({
        error: `Name or number is missing`
      })
    }

    response.end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT,() => console.log(`Listening on port ${PORT}`))