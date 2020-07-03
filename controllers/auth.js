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
