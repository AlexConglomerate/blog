const express = require('express')
const router = express.Router({mergeParams: true})


router.use('/upload', require('./upload.routes'))
router.use('/posts', require('./posts.routes'))
router.use('/auth', require('./auth.routes'))
router.use('/users', require('./users.routes'))

// router.use('/teams', require('./teams.routes'))
// router.use('/vacations', require('./vacations.routes'))
// router.use('/schedules', require('./schedules.routes'))
// router.use('/completeRedux', require('./completeRedux.routes'))



module.exports = router