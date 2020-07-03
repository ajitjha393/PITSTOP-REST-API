const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	status: {
		type: Object,
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Post',
		},
	],
})

module.exports = model('User', userSchema)
