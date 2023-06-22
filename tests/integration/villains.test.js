// Step 1 import libraries
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  describe, it, afterEach, beforeEach, after, before
} = require('mocha')

// Step 2 Import functions/controllers we are testing
const { getAllVillainsController, getOneVillainController, addVillainController } = require('../../controllers/controllers')
const { villainsModel } = require('../../models/index')

// Step 2B Import Mock Data 
const { villainsMock, singleMock, invalidMock } = require('./villains.mocks')


// step 3 tie sinonChai to chai, import expect
chai.use(sinonChai)
const { expect } = chai

describe('Integration Tests - villains', () => {
  let stubbedSend
  let sandbox
  let stubbedFindAll
  let stubbedFindOne
  let stubbedCreate
  let stubbedStatus
  let response
  let stubbedSendStatus

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedSend = sandbox.stub()
    stubbedFindAll = sandbox.stub(villainsModel, 'findAll')
    stubbedFindOne = sandbox.stub(villainsModel, 'findOne')
    stubbedCreate = sandbox.stub(villainsModel, 'create')
    stubbedStatus = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    response = {
      send: stubbedSend,
      status: stubbedStatus,
      sendStatus: stubbedSendStatus
    }
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllVillainsController', () => {
    it('retrieve a list of villains from the database, then returns that list in res.send()', async () => {
      // Stub any external API or database
      stubbedFindAll.returns(villainsMock)

      // Call controller
      await getAllVillainsController({}, response)

      // Make assertions using expect
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsMock)
    })
    it('returns a 500 error when database is unable to retrieve villains', async () => {
      stubbedFindAll.throws('ERROR')

      await getAllVillainsController({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
  })

  describe('getOneVillainController', () => {
    it('finds the associated villain by slug then calls res.send with that villain', async () => {
      let singleDatabaseMock = { ...singleMock, slug: 'captain-hook' }

      stubbedFindOne.returns(singleDatabaseMock)

      const request = { params: { slug: 'captain-hook' } }

      await getOneVillainController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'captain-hook' } })
      expect(stubbedSend).to.have.been.calledWith(singleDatabaseMock)
    })
    it('Villain is not found in the database, and returns a 500 error', async () => {
      stubbedFindOne.throws('ERROR!')

      const request = { params: { slug: 'jack-sparrow' } }

      await getOneVillainController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'jack-sparrow' } })
      expect(stubbedSendStatus).to.have.been.calledWith(500)
    })
    it('Villain is not found in the database, and returns a 404 error', async () => {
      stubbedFindOne.returns({})

      const request = { params: { slug: 'jack-sparrow' } }

      await getOneVillainController(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'jack-sparrow' } })
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })
  })

  describe('addVillainController', () => {
    it('accepts new villain and saves it, sends 201 status', async () => {
      stubbedCreate.returns(singleMock)
      stubbedStatus.returns({ send: stubbedSend })

      const request = { body: singleMock }

      await addVillainController(request, response)

      expect(stubbedCreate).to.have.been.calledWith(singleMock)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(singleMock)
    })
    it('Lets the user know they did not impute a valid new villain', async () => {
      stubbedStatus = sinon.stub().returns({ send: stubbedSend })

      response = { status: stubbedStatus }
      const request = { body: invalidMock }

      await addVillainController(request, response)

      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedSend).to.have.been.calledWith('Villain information required : Name, Movie, Slug')
    })
  })
})
