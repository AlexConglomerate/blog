const express = require('express')
const router = express.Router({mergeParams: true})
const User = require(`../models/User`)
const auth = require(`../middleware/auth.middleware`)
const Post = require(`../models/Post`)

router.post('/', auth, async (req, res) => {
    try {
        const userId = req.user._id
        const file = req.file;
        const {caption, message, fileId} = req.body
        const data = await Post.create({caption, message, fileId, userId},)
        res.send(data)
    } catch (e) {
        console.log(`e`, e)
    }
})

router.delete('/:postId', auth, async (req, res) => {
    const {postId} = req.params
    const {acknowledged} = await Post.deleteOne({_id: postId})

    if (acknowledged) res.send(true)
    if (!acknowledged) res.send(false)
})


router.put('/', auth, async (req, res) => {
    try {
        const userId = req.user._id
        const {caption, message, _id} = req.body
        const data = await Post.findByIdAndUpdate({_id}, {caption, message}, {new: true})
        res.send(data)
    } catch (e) {
        console.log(`e`, e)
    }
})


router.get('/', async (req, res) => {
    const post = await Post.find()
    const user = await User.find()

    const mergeData = post.map(postItem => {
        const findedUser = user.find(userItem => postItem.userId == userItem._doc._id)
        const {name, email} = findedUser
        return {...postItem._doc, name, email}
    })

    res.send(mergeData)
})

router.get('/:postId', async (req, res) => {
    const {postId} = req.params
    const data = await Post.find({_id: postId})
    res.send(data)
})


module.exports = router
