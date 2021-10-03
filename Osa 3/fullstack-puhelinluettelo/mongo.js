const mongoose = require('mongoose')

if (process.argv.length <3) {
  console.log('give password as an argument')
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.svioc.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`
mongoose.connect(url)

const personScheema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personScheema)

if (process.argv.length ==5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(result => {
    console.log('person added!')
    mongoose.connection.close()
  })
}

if (process.argv.length == 3) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(x => console.log(`${x.name}: ${x.number}`))
    mongoose.connection.close()
  })
}
