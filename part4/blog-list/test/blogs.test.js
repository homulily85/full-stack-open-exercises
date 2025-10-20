const supertest = require('supertest')
const { test, beforeEach, after, describe } = require('node:test')
const app = require('../app')
const api = supertest(app)
const Blog = require('../model/blog')
const User = require('../model/user')
const mongoose = require('mongoose')
const assert = require('node:assert')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
    user: '68f686f8f74c3f7d495aa305',
  }, {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
    user: '68f686f8f74c3f7d495aa305',
  }, {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
    user: '68f686f8f74c3f7d495aa305',
  }, {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
    user: '68f686f8f74c3f7d495aa307',
  }, {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
    user: '68f686f8f74c3f7d495aa307',
  }, {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
    user: '68f686f8f74c3f7d495aa307',
  }]

let user0 = null

const initialUsers = [
  {
    username: 'homulily85',
    password: '123456',
    name: 'homulily',
    _id: '68f686f8f74c3f7d495aa305',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9'],
  },
  {
    username: 'homulily8',
    password: '123456',
    name: 'homulily',
    _id: '68f686f8f74c3f7d495aa307',
    blogs: [
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc'],
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let promises = initialBlogs.map(b => new Blog(b).save())
  await Promise.all(promises)

  await User.deleteMany({})
  promises = initialUsers.map(
    async u => new User({
      _id: u._id,
      username: u.username,
      name: u.name,
      blogs: u.blogs,
      passwordHash: await bcrypt.hash(u.password, 10),
    }).save())
  await Promise.all(promises)

  user0 = await api.post('/api/users/login').send(initialUsers[0])
})

describe('Test for GET method to /api/blogs', () => {
  test('API correctly returns data in json format with status code 200',
    async () => {
      await api.get('/api/blogs').
        expect(200).
        expect('Content-Type', /application\/json/)
    })

  test('API correctly returns number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  })

  test('The unique identifier property of the blog posts is named id, not _id',
    async () => {
      const response = await api.get('/api/blogs')
      const blogs = response.body
      blogs.forEach(b => assert.strictEqual('id' in b, true))
    })
})

describe('Test for POST method to /api/blogs', () => {
  test(
    'Making an HTTP POST request to the /api/blogs URL successfully creates a new blog post.',
    async () => {

      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }

      await api.post('/api/blogs').
        set('Authorization', `Bearer ${user0.body.token}`).
        send(newBlog).
        expect(201).
        expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const blogs = response.body
      assert.strictEqual(blogs.length, initialBlogs.length + 1)

      const newBlogFromAPI = blogs[blogs.length - 1]
      delete newBlogFromAPI.id
      delete newBlogFromAPI.user

      assert.deepStrictEqual(newBlogFromAPI, newBlog)

    })

  test(
    'If the likes property is missing from the POST request, it will default to the value 0.',
    async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      }

      await api.post('/api/blogs').
        set('Authorization', `Bearer ${user0.body.token}`).
        send(newBlog).
        expect(201).
        expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const blogs = response.body
      assert.strictEqual(blogs.length, initialBlogs.length + 1)

      const newBlogFromAPI = blogs[blogs.length - 1]
      assert.deepStrictEqual(newBlogFromAPI.likes, 0)
    })

  test(
    'If the title or url properties are missing from the POST request data the backend responds to the request with the status code 400 Bad Request',
    async () => {
      const missingTitleBlog = {
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      }

      const missingURLBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
      }

      await api.post('/api/blogs').
        set('Authorization', `Bearer ${user0.body.token}`).
        send(missingTitleBlog).
        expect(400)

      await api.post('/api/blogs').
        set('Authorization', `Bearer ${user0.body.token}`).
        send(missingURLBlog).
        expect(400)

    })

  test('POST without token', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    await api.post('/api/blogs').
      send(newBlog).expect(401)

  })
})

describe('Test for DELETE method to /api/blogs', () => {
  test('Deleting an existing blog post resource', async () => {
    await api.delete(`/api/blogs/${initialBlogs[0]._id}`).
      set('Authorization', `Bearer ${user0.body.token}`).
      expect(204)

    const response = await api.get('/api/blogs')
    const blogs = response.body
    assert.strictEqual(blogs.find(b => b.id === initialBlogs[0]._id), undefined)
  })

  test('Deleting a non-existing blog post resource', async () => {
    await api.delete(`/api/blogs/${initialBlogs[0]._id}`).
      set('Authorization', `Bearer ${user0.body.token}`).
      expect(204)
  })

  test('Deleting others blogs', async ()=>{
    await api.delete(`/api/blogs/${initialBlogs[4]._id}`).
      set('Authorization', `Bearer ${user0.body.token}`).
      expect(403)
  })
})

test('Updating a non-existing blog post resource', async () => {
  await api.put(`/api/blogs/5a422bc61b54a676234d17f7`).
    send({ author: 'dadsdas' }).
    expect(400)
})

test('Updating an existing blog post resource', async () => {
  await api.put(`/api/blogs/${initialBlogs[0]._id}`).
    send({ author: 'a' }).
    expect(200)

  const response = await api.get('/api/blogs')
  const blogs = response.body

  const updatedBlog = structuredClone(initialBlogs[0])
  updatedBlog.author = 'a'
  updatedBlog.id = updatedBlog._id
  delete updatedBlog._id
  delete updatedBlog.__v
  delete blogs[0].user
  delete updatedBlog.user

  assert.deepStrictEqual(blogs[0], updatedBlog)

})

after(async () => {
  await mongoose.connection.close()
})

