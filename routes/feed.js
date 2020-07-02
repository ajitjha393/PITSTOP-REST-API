const { Router } = require('express')

const { getPosts, postAddPost, getPost } = require('../controllers/feed')

const { body } = require('express-validator/check')

const router = Router()

router.get('/posts', getPosts)
router.post(
	'/post',
	[
		body('title').trim().isLength({ min: 7 }),
		body('content').trim().isLength({ min: 5 }),
	],
	postAddPost
)

router.get('/post/:postId', getPost)

module.exports = router
