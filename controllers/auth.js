const User = require('../models/user')
const { validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')

exports.signup = async (req, res, next) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			const err = new Error('Validation Failed')
			err.statusCode = 422
			err.data = errors.array()
			throw err
		}

		const { name, email, password } = { ...req.body }
		const hashedPassword = await bcrypt.hash(password, 12)

		const user = new User({
			name,
			email,
			password: hashedPassword,
		})

		const result = await user.save()
		return res.status(201).json({
			message: 'User was created Successfully!',
			userId: result._id,
			user: result,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}

exports.signup = async (req, res, next) => {
	try {
		const email = req.body.email
		const password = req.body.password

		const user = await User.findOne({ email: email })
		if (!user) {
			const err = new Error('Cannot find User with this email!')
			err.statusCode = 401 //status code for unauthenticated
			throw err
		}

		if (!(await bcrypt.compare(password, user.password))) {
			const err = new Error('Wrong Password!')
			err.statusCode = 401
			throw err
		}

		// Now here will manage JSON web token for managing authentication
	} catch {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}
