const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authCheck = require('../middleware/authCheck')
const User = require("../../models/User.model");
const Post = require("../../models/post.model");

router.post('/createpost', authCheck, async (req, res, next) => {
    if (req.user) {
        const { PostImage, Caption } = req.body;
        let posts = await Post.create({ User_id: req.user._id, PostImage, Caption });
        return res.status(200).json({ err: null })
    };
})
router.post('/getpost', authCheck, async (req, res, next) => {
    if (req.user) {
        let posts = await Post.find({ User_id: req.user._id })
        console.log(posts)
        return res.status(200).json({ err: null, posts })
    };
})

module.exports = router;