const router = require('express').Router()
const { Blog } = require('../models')
const User = require('../models/user')
const tokenExtractor = require('../middlewares/tokenExtractor')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    const where = {}

    if (req.query.search) {
        where[Op.or] = [
            {
                title: { [Op.iLike]: `%${req.query.search}%` },
            },
            {
                author: { [Op.iLike]: `%${req.query.search}%` },
            },
        ]
    }

    const blogs = await Blog.findAll({
        attributes: {
            exclude: 'userId',
        },
        include: {
            model: User,
            attributes: ['username', 'name', 'id'],
        },
        where,
        order: [['likes', 'DESC']],
    })

    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const newBlog = await Blog.create(
            { ...req.body, userId: req.decodedToken.id })
        res.json(newBlog)
    } catch (e) {
        next(e)
    }
})

router.delete('/:id', tokenExtractor, async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            if (req.decodedToken.id !== blog.userId) {
                return res.status(403).send('you do not own this blog')
            }
            await blog.destroy()
            res.json(blog)
        } else {
            res.status(404).end()
        }
    } catch (e) {
        res.status(500).json({ e })
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            blog.likes = req.body.likes
            await blog.save()
            res.json(blog)
        } else {
            res.status(404).end()
        }
    } catch (e) {
        next(e)
    }
})

module.exports = router