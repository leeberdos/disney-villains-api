const express = require('express')
const { verifySlug, getAllVillainsController, getOneVillainController, addVillainController } = require('./controllers/controllers')
const app = express()

app.set('view engine', 'pug')

// controller
// app.get('/villains', renderVillainsPageController)

// GET all villains
app.get('/villains', getAllVillainsController)

// GET one villain
app.get('/villains/:slug', verifySlug, getOneVillainController)

// POST (Add villain)
app.post('/villains', express.json(), addVillainController)

app.listen(8000, () => {
  console.log('Listening on http://localhost:8000')
})
