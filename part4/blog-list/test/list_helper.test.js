const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0,
  },
]

const listWithSomeBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const emptyList = []

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('list with some blogs', () => {
    assert.equal(listHelper.totalLikes(listWithSomeBlogs), 36)
  })

  test('empty list should have 0 like.', () => {
    assert.equal(listHelper.totalLikes(emptyList), 0)
  })
})

describe('favourite likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('list with some blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithSomeBlogs),
      listWithSomeBlogs[2])
  })

  test('empty list.', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(emptyList), undefined)
  })
})

describe('most blogs', () => {
  test('list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('list with some blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithSomeBlogs),
      {
        author: 'Robert C. Martin',
        blogs: 3,
      })
  })

  test('empty list.', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(emptyList), undefined)
  })
})

describe('most likes', () => {
  test('list has only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('list with some blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithSomeBlogs),
      {
        author: 'Edsger W. Dijkstra',
        likes: 17,
      })
  })

  test('empty list.', () => {
    assert.deepStrictEqual(listHelper.mostLikes(emptyList), undefined)
  })
})