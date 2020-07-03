const { Router } = require('express')

const {
	getPosts,
	postAddPost,
	getPost,
	updatePost,
	deletePost,
} = require('../controllers/feed')

const { body } = require('express-validator/check')

const router = Router()

router.get('/posts', getPosts)
router.post(
	'/post',
	[
		body('title').trim().isLength({ min: 5 }),
		body('content').trim().isLength({ min: 5 }),
	],
	postAddPost
)

router.get('/post/:postId', getPost)

router.put(
	'/post/:postId',
	[
		body('title').trim().isLength({ min: 5 }),
		body('content').trim().isLength({ min: 5 }),
	],
	updatePost
)

router.delete('/post/:postId', deletePost)

module.exports = router
