const User = require('../models/user')
const { validationResult } = require('express-validator/check')

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
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}
