const express = require('express')
require('./db/mongoose')
const personRouter = require('./routers/person')

const app = express()
const port = 3000

app.use(express.json())
app.use(personRouter)
// const person1 = new Person({
//   name: 'Ruona Dibie',
//   height: 173,
//   mass: 170,
//   gender: 'male'
// })
// person1
//   .save()
//   .then(() => console.log('Successfully added this person'))
//   .catch((e) => console.log(e))

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Stars ward app listening on port ${port}!`))
