const { Router } = require('express')

const { getPosts } = require('../controllers/feed')

const router = Router()

router.get('/posts', getPosts)

module.exports = router
