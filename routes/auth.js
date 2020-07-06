const { Router } = require('express')

const {
	signup,
	login,
	updateUserStatus,
	getUserStatus,
} = require('../controllers/auth')

const { body } = require('express-validator/check')
const isAuth = require('../middleware/is-auth')
const User = require('../models/user')
const router = Router()

router.put(
	'/signup',

	[
		body('email')
			.isEmail()
			.withMessage('Please Enter a Valid Email')
			.custom(async (emailVal, { req }) => {
				if (await User.findOne({ email: emailVal })) {
					throw new Error('Email already exists...')
				}
				return true
			})
			.normalizeEmail(),

		body('password').trim().isLength({ min: 5 }),
		body('name').trim().not().isEmpty(),
	],
	signup
)

router.post('/login', login)

router.get('/status', isAuth, getUserStatus)

router.patch(
	'/status',
	isAuth,
	[body('status').trim().not().isEmpty()],
	updateUserStatus
)

module.exports = router
