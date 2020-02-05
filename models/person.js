const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
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
    name: { type: String, required: true,unique: true, minlength: 3 },
    number: { type: Number, required: true,min : 11111111},
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON',{
    transform: (document,returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})   
module.exports = mongoose.model('Person', personSchema)






