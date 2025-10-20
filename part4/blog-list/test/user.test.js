const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const app = require('../app')
const api = supertest(app)
const User = require('../model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const initialUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: '123456',
    _id: '68f686f8f74c3f7d495aa305',
  },
]

beforeEach(async () => {
  await User.deleteMany({})
  const promises = initialUsers.map(
    async u => new User({
      _id: u._id,
      username: u.username,
      name: u.name,
      passwordHash: await bcrypt.hash(u.password, 10),
    }).save())
  await Promise.all(promises)
})

describe('Add a new user', () => {
  test('Add a valid user', async () => {
    const validUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: '123456',
    }

    await api.post('/api/users/create').send(validUser).expect(201)
  })

  test('Add a user which is missing username', async () => {
    const invalidUser = {
      name: 'Matti Luukkainen',
      password: '123456',
    }

    await api.post('/api/users/create').send(invalidUser).expect(400)
  })

  test('Add a user which is missing password', async () => {
    const invalidUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    }

    await api.post('/api/users/create').send(invalidUser).expect(400)
  })

  test('Add a user which has invalid username', async () => {
    const invalidUser = {
      username: 'as',
      name: 'Matti Luukkainen',
      password: '123456',
    }

    await api.post('/api/users/create').send(invalidUser).expect(400)
  })

  test('Add a user which has invalid username', async () => {
    const invalidUser = {
      username: 'as',
      name: 'Matti Luukkainen',
      password: '123456',
    }

    await api.post('/api/users/create').send(invalidUser).expect(400)
  })

  test('Add a user which has invalid password', async () => {
    const invalidUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: '12',
    }

    await api.post('/api/users/create').send(invalidUser).expect(400)
  })

  test('Add a user which has duplicate username', async () => {
    const invalidUser = {
      username: 'hellas',
      name: 'Matti Luukkainen',
      password: '12',
    }

    await api.post('/api/users/create').send(invalidUser).expect(400)
  })

})

after(async () => {
  await mongoose.connection.close()
})
