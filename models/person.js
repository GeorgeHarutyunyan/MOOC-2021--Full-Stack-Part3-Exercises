const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URI
console.log("Connecting to",url)
mongoose.set('useFindAndModify',false)
mongoose.connect(url, { useNewUrlParser: true })
    .then(result => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log("Error connecting to MongoDB:",error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    })

personSchema.set('toJSON',{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})   
module.exports = mongoose.model('Person', personSchema)

/** 
if (process.argv.length != 3) {

    console.log(process.argv.length)
    process.argv.forEach(arg => {
        console.log(arg)
    })
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    })

    person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
    })
}
else {
    console.log("Phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name,person.number)
          mongoose.connection.close()
        })
      })
}

**/






