const axios = require('axios')
const Person = require('./models/person')
require('./db/mongoose')

//this script is used to initialize the peoples database in the starwords project

const initializePeople = async () => {
  try {
    //clears the database
    var response = await Person.deleteMany({})
    console.log('Cleared all the persons in the database', response)
    response = await axios.get('https://swapi.co/api/people/')
    if (!response) throw new Error('There was an error getting response from path')
    const people = response.data.results.map((person) => {
      return {
        name: person.name,
        height: person.height,
        mass: person.mass,
        gender: person.gender
      }
    })
    await Person.insertMany(people)
    console.log(`The starward database was created with ${people.length} amount of people`)
  } catch (e) {
    console.log(e)
  }
}
// axios
//   .get('https://swapi.co/api/people/')
//   .then((people) => {
//     people.data.results
//   })
//   .catch((e) => console.log('Error getting people file the path given', e))

initializePeople()
