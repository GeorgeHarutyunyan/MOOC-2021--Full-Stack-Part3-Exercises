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






app.listen(PORT,() => console.log('Listening on port 3001'))