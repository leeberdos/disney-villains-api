const Sequelize = require('sequelize')
const { villainsTemplate } = require('./villainsTemplate')

const connection = new Sequelize('l_villains', 'l_villains_user', 'villains', { host: '173.230.134.130', dialect: 'mysql' })

const villainsModel = villainsTemplate(connection, Sequelize)

module.exports = { villainsModel }
