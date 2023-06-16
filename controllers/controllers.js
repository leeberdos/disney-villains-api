const { getAllVillains, getOneVillain, addVillain } = require('../models/villainsModel')

const verifySlug = (request, response, next) => {
  let { slug } = request.params

  if (!slug) return response.sendStatus(404)

  slug = slug.toLowerCase()

  next()
}

const getAllVillainsController = async (request, response) => {
  const villainsData = await getAllVillains()

  return response.send(villainsData)
}

const getOneVillainController = async (request, response) => {
  // use model to find villain
  const foundVillain = await getOneVillain(request.params.slug)

  // send 404 if there is an error with data provided
  if (!foundVillain) return response.status(404).send('😈Villain was not found😈')

  return response.send(foundVillain)
}

const addVillainController = async (request, response) => {
  // make sure valid SQL parameters are entered
  const { name, movie, slug } = request.body

  // create new object from villain data provided by user
  if (!name || !movie || !slug) return response.status(400).send('Villain information required : Name, Movie, Slug')

  let newVillain = { name, movie, slug }

  // push villain into villain data
  const newVillains = await addVillain(newVillain)

  // send new list with added villain
  return response.status(201).send(newVillains)
}

module.exports = { verifySlug, getAllVillainsController, getOneVillainController, addVillainController }
