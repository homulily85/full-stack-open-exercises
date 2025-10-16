const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0)
}

const favoriteBlog = (blogs) => {
  if (blogs === null || blogs.length === 0) {
    return undefined
  }
  return blogs.reduce((prev, curr) => prev.likes < curr.likes ? curr : prev)
}

const mostBlogs = (blogs) => {
  if (blogs === null || blogs.length === 0) {
    return undefined
  }
  const blogCount = _.countBy(blogs, 'author')
  const mostBlogsArray = (_.maxBy(Object.entries(blogCount),
    ([, count]) => count))

  return {
    author: mostBlogsArray[0],
    blogs: mostBlogsArray[1],
  }
}

const mostLikes = (blogs) => {
  if (blogs === null || blogs.length === 0) {
    return undefined
  }
  const groupByAuthor = _.groupBy(blogs, 'author')
  for (let author in
    groupByAuthor) {
    groupByAuthor[author] = _.sumBy(groupByAuthor[author], 'likes')
  }

  const mostLikesArray = (_.maxBy(Object.entries(groupByAuthor),
    ([, count]) => count))

  return {
    author: mostLikesArray[0],
    likes: mostLikesArray[1],
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}