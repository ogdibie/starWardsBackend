const express = require('express')
const Person = require('../models/person')

const router = express.Router()

//create a person
router.post('/people', async (req, res) => {
  const person = new Person(req.body)
  try {
    await person.save()
    res.status(201).send(person)
  } catch (e) {
    res.status(400).send(e)
  }
})
//gets all the people in the starwards database
router.get('/people', async (req, res) => {
  try {
    const people = await Person.find({})
    res.send(people)
  } catch (e) {
    res.status(500).send(e)
  }
})

//get a single person by id
router.get('/people/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)
    if (!person) {
      res.status(404).send()
    }

    res.send(person)
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/people/:id', async (req, res) => {
  //to prevent updates on keys that are not allowed
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'height', 'mass', 'gender']
  const valid = updates.every((update) => allowedUpdates.includes(update))
  if (!valid) res.status(400).send({ error: 'Invalid update operation' })

  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body)
    if (!person) return res.status(404).send()
    res.send(person)
  } catch (e) {
    res.status(500).send()
  }
})
module.exports = router
