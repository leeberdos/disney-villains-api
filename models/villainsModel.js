const { villainsModel } = require('./index')

const getAllVillains = async () => {
  try {
    const allVillains = await villainsModel.findAll()

    return allVillains
  } catch (error) {
    throw new Error('ERROR!')
  }
}

const getOneVillain = async (searchSlug) => {
  try {
    const foundVillain = await villainsModel.findOne({ where: { slug: searchSlug } })

    return foundVillain
  } catch (error) {
    throw new Error('Database error')
  }
}

const addVillain = async (newVillain) => {
  const addedVillain = await villainsModel.create(newVillain)

  return addedVillain
}

module.exports = { getAllVillains, getOneVillain, addVillain }
