const express = require('express')
const app = express()
const PORT = 3001

const bodyParser = require('body-parser')
app.use(bodyParser.json())


const notes = [{
    name:'George',
    number:'611'
}]

app.get('/api/persons',(request,response) => response.json(notes))


app.get('/info', (request, response) => {
    response.write(`Phonebook has info for ${notes.length} people\n`)
    response.write(new Date().toString())
    response.end()
})



app.listen(PORT,() => console.log(`Listening on port ${PORT}`))