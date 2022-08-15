const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authCheck = require('../middleware/authCheck')
const fs = require('fs');
const { v4: uuid } = require('uuid')
const User = require("../../models/User.model");
const Post = require("../../models/post.model");

router.post('/createpost',authCheck, async (req, res, next) => {
    if (req.user) {
        const Caption = req.body.Caption;
        const file = req.files.PostImage
        let folder = "post/"
        let Fileid = uuid()
        var fileExt = file.name.split('.').pop();
        while (fs.existsSync("./public/usercontent/" + folder + Fileid + '.' + fileExt)) {
            Fileid = uuid()
        }
        file.mv("./public/usercontent/" + folder + Fileid + '.' + fileExt, async (error) => {
            if (error) {
                return res.status(500).json({ err: error.message })
            }
            let posts = await Post.create({ User_id: req.user.user_id, PostImage:"/usercontent/" + folder + Fileid + '.' + fileExt, Caption });
            res.status(200).json({ err: null })
        })
        // return res.status(200).json({ err: null })
    };
})
router.post('/getpost', authCheck, async (req, res, next) => {
    if (req.user) {
        let posts = await Post.find({ User_id: req.user._id })
        return res.status(200).json({ err: null, posts })
    };
})

module.exports = router;