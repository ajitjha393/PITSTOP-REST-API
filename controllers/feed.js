const { validationResult } = require('express-validator/check')
const Post = require('../models/post')

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

exports.postAddPost = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const err = new Error('Validation Failed, Entered Data is incorrect')
		err.statusCode = 422
		return next(err)
		// return res.status(422).json({
		// 	message: 'Validation Failed, Entered Data is incorrect',
		// 	errors: errors.array(),
		// })
	}

	const { title, content } = { ...req.body }

	// Create posts in db

	const post = new Post({
		title,
		content,
		imageUrl: 'images/duck.jpg',
		creator: {
			name: 'Bishwajit',
		},
	})

	try {
		const resPost = await post.save()
		console.log(resPost)

		// 201 Success in creating a resource in backend
		res.status(201).json({
			message: 'Post created Successfully',
			post: resPost,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}
