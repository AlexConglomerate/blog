const express = require('express')
const router = express.Router({mergeParams: true})
const auth = require(`../middleware/auth.middleware`)
const multer = require('multer');

const upload = multer({dest: 'uploads/'});

router.post('/', [upload.single('file'), auth], async (req, res) => {
    const file = req.file;
    res.json({filename: file.filename});
});

router.get('/', async (req, res) => {
    const data = await Post.find();
    res.send(data);
});


module.exports = router
