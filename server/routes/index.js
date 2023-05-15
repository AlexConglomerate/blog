const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/upload', require('./upload.routes'))
router.use('/posts', require('./posts.routes'))
router.use('/auth', require('./auth.routes'))
router.use('/users', require('./users.routes'))

module.exports = router