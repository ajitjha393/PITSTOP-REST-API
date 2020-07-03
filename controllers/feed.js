const { validationResult } = require('express-validator/check')
const Post = require('../models/post')
const path = require('path')
const fs = require('fs')

exports.getPosts = async (req, res, next) => {
	// 200 means success
	try {
		const posts = await Post.find()
		return res.status(200).json({
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
	}

	if (!req.file) {
		const err = new Error('No image Provided...')
		err.statusCode = 422
		return next(err)
	}

	const { title, content } = { ...req.body }

	// Create posts in db

	const post = new Post({
		title,
		content,
		imageUrl: req.file.path,
		creator: {
			name: 'Bishwajit',
		},
	})

	try {
		const resPost = await post.save()
		console.log(resPost)

		// 201 Success in creating a resource in backend
		return res.status(201).json({
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

exports.updatePost = async (req, res, next) => {
	const postId = req.params.postId

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		const err = new Error('Validation Failed, Entered Data is incorrect')
		err.statusCode = 422
		return next(err)
	}

	const title = req.body.title
	const content = req.body.content
	let imageUrl = req.body.image

	if (req.file) {
		imageUrl = req.file.path
	}

	if (!imageUrl) {
		const err = new Error('No file picked...')
		err.statusCode = 422
		return next(err)
	}

	try {
		const post = await Post.findById(postId)
		if (!post) {
			const err = new Error('Could Not Find a post.')
			err.statusCode = 404
			throw err
		}
		if (imageUrl !== post.imageUrl) {
			clearImage(post.imageUrl)
		}
		post.title = title
		post.content = content
		post.imageUrl = imageUrl

		const result = await post.save()

		return res.status(200).json({
			message: 'Post Updated',
			post: result,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}

exports.deletePost = async (req, res, next) => {
	try {
		const postId = req.params.postId

		const post = await Post.findById(postId)
		if (!post) {
			const err = new Error('Could Not Find a post.')
			err.statusCode = 404
			throw err
		}
		// Check for user of post and logged in user
		/** Will add that later */

		clearImage(post.imageUrl)

		const result = await Post.findByIdAndRemove(postId)

		return res.status(200).json({
			message: 'Post Deleted Successfully',
			post: result,
		})
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500
		}

		next(err)
	}
}

const clearImage = (filepath) => {
	filepath = path.join(__dirname, '..', filepath)
	fs.unlink(filepath, (err) => console.log(err))
}
