const express = require('express')
const router = express.Router()
const userServices = require('../services/userServices.js')
//登录功能
router.post('/api/login', userServices.login)
router.post('/api/register', userServices.register)
module.exports = router