const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { Blog } = require('../models')
const router = require('express').Router()

router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: ['id', 'name', 'username'],
        include: {
            model: Blog,
            attributes: {
                exclude: 'userId'
            }
        }
    })
    res.json(users)
})

router.post('/', async (req, res, next) => {
    try {
        const users = await User.create(
            { name: req.body.name, username: req.body.username })
        res.json(users)
    } catch (e) {
        next(e)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (user) {
            user.username = req.body.username
            await user.save()
            res.json(user)
        } else {
            res.status(404).end()
        }
    } catch (e) {
        next(e)
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username,
        },
        attributes: ['username', 'id', 'name'],
    })

    if (!user || req.body.password !== 'root') {
        res.status(400).send('incorrect username or password')
        return
    }

    const token = jwt.sign(
        { username: user.username, name: user.name, id: user.id }, SECRET)

    res.send({ ...user.toJSON(), token })
})

module.exports = router