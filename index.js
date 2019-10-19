const express = require('express')
const app = express()
const PORT = 3001

const bodyParser = require('body-parser')
app.use(bodyParser.json())


let notes = [
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

app.get('/api/persons',(request,response) => response.json(notes))


app.get('/info', (request, response) => {
    response.write(`Phonebook has info for ${notes.length} people\n`)
    response.write(new Date().toString())
    response.end()
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = notes.find(n => n.id === id)
    if (person) {
        response.json(person)
    }
    response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(n => n.id === id)
    notes = notes.filter(n => n.id !== note.id)
    response.status(204).end()
})


app.listen(PORT,() => console.log(`Listening on port ${PORT}`))