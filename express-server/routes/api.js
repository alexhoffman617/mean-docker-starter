// Import dependencies
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker'

// Connect to mongodb
mongoose.connect(dbHost)

// create mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
})

// create mongoose model
const User = mongoose.model('User', userSchema)

/* GET api listing. */
router.get('/', (req, res) => {
  res.send({ apiWorks: true })
})

/* GET all users. */
router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.status(500).send(error)

    res.status(200).json(users)
  })
})

/* GET one users. */
router.get('/users/:id', (req, res) => {
  User.findById(req.param.id, (err, users) => {
    if (err) res.status(500).send(error)

    res.status(200).json(users)
  })
})

/* Create a user. */
router.post('/users', (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email
  })

  user.save(error => {
    if (error) res.status(500).send(error)

    res.status(201).json({
      user: user,
      message: 'User created successfully'
    })
  })
})

module.exports = router
