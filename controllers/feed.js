const { validationResult } = require('express-validator/check')

exports.getPosts = (req, res, next) => {
	// 200 means success
	res.status(200).json({
		posts: [
			{
				title: 'First Post',
				content: 'This is first Post!',
				imageUrl: 'images/duck.jpg',
				creator: {
					name: 'Bishwajit',
				},
				createdAt: new Date(),
			},
		],
	})
}

exports.postAddPost = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({
			message: 'Validation Failed, Entered Data is incorrect',
			errors: errors.array(),
		})
	}

	const { title, content } = { ...req.body }

	// Create posts in db

	// 201 Success in creating a resource in backend
	res.status(201).json({
		message: 'Post created Successfully',
		post: {
			_id: new Date().toISOString(),
			title,
			content,
			creator: {
				name: 'Bishwajit',
			},
			createdAt: new Date(),
		},
	})
}
