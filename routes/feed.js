const { Router } = require('express')

const { getPosts, postAddPost } = require('../controllers/feed')

const router = Router()

router.get('/posts', getPosts)
router.post('/post', postAddPost)

module.exports = router
