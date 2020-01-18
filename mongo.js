const mongoose = require('mongoose')

if (process.argv.length <3) {
    console.log("Provide password as argument")
    process.exit(1)
}

else if (process.argv.length == 4) {
    console.log("Provide phone number with the person's name")
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://georgeh:${password}@cluster0-gyuyv.mongodb.net/note-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true }).catch(error => {
    console.log(error)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    })
const Person = mongoose.model('Person', personSchema)


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





