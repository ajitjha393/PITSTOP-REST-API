const { validationResult } = require('express-validator/check')
const Post = require('../models/post')

exports.getPosts = async (req, res, next) => {
	// 200 means success
	try {
		const posts = await Post.find()
		res.status(200).json({
			message: 'All posts fetched Successfully',
			posts,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
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

exports.getPost = async (req, res, next) => {
	const postId = req.params.postId
	try {
		const fetchedPost = await Post.findById(postId)
		if (!fetchedPost) {
			const err = new Error('Could Not Find a post.')
			err.statusCode = 404
			throw err
		}

		return res.status(200).json({
			message: 'Post Fetched Successfully',
			post: fetchedPost,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}
