const { Router } = require('express')

const {} = require('../controllers/auth')

const { body } = require('express-validator/check')

const router = Router()

router.put('/signup')

module.exports = router
