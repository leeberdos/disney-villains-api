const { villainsModel } = require('./index')

const getAllVillains = async () => {
  const villainsData = await villainsModel.findAll()

  return villainsData
}

const getOneVillain = async (searchSlug) => {
  const foundVillain = await villainsModel.findOne({ where: { slug: searchSlug } })

  return foundVillain
}

const addVillain = async (newVillain) => {
  const addedVillain = await villainsModel.create(newVillain)

  return addedVillain
}

module.exports = { getAllVillains, getOneVillain, addVillain }
