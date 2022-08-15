const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authCheck = require('../middleware/authCheck')
const fs = require('fs');
const { v4: uuid } = require('uuid')
const User = require("../../models/User.model");
const Post = require("../../models/post.model");

router.post('/createpost', authCheck, async (req, res, next) => {
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
            let posts = await Post.create({ User_id: req.user.user_id, PostImage: "/usercontent/" + folder + Fileid + '.' + fileExt, Caption });
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
router.post('/getprofile', authCheck, async (req, res, next) => {
    if (req.user) {
        let requestProfile = req.body.profileName
        let post = req.body.post
        let data = {}
        if (requestProfile) {
            let requestProfileData = await User.findOne({ Username: requestProfile })
            if (requestProfileData) {
                if (requestProfileData._id.toString() === req.user.user_id || requestProfileData.Following.includes(req.user._id) || !requestProfileData.Private) {
                    let user = await User.findOne({ _id: req.user.user_id })
                    let posts = await Post.find({ User_id: requestProfileData._id }, { PostImage: 1, _id: 1, Likes: 1 })
                    console.log(posts)
                    console.log(user)
                    data['Username'] = user.Username
                    data['FullName'] = user.FullName
                    data['Posts'] = posts
                    data['Follower'] = requestProfileData.Follower.length
                    data['Following'] = requestProfileData.Following.length
                    data['Bio'] = requestProfileData.Bio
                    data['ProfilePicture'] = requestProfileData.ProfilePicture
                    return res.status(200).json({ err: null, data })
                } else {
                    let user = await User.findOne({ _id: req.user._id })
                    data['Username'] = user.Username
                    data['FullName'] = user.FullName
                    data['Posts'] = []
                    data['Follower'] = requestProfileData.Follower.length
                    data['Following'] = requestProfileData.Following.length
                    data['Bio'] = requestProfileData.Bio
                    return res.status(200).json({ err: null, data })
                }
            }
            else {
                return res.status(404).json({ err: "Profile Not Found" })
            }
            
        } 
        else if(post) {
            let postData = await Post.findOne({ _id: post })
            if (postData) {
                let user = await User.findOne({ _id: postData.User_id })
                if (user && (user._id.toString() === req.user.user_id || !user.Private || user.Following.includes(req.user.user_id))) {
                    data['Username'] = user.Username
                    data['FullName'] = user.FullName
                    data['Posts'] = postData
                    data['user_id'] = user._id.toString()
                    data['ProfilePicture'] = user.ProfilePicture
                    return res.status(200).json({ err: null, data })
                } else {
                    return res.status(404).json({ err: "Post Not Found"})
                }
            }
            else {
                return res.status(404).json({ err: "Profile Not Found" })
            }
        }
        else {
            console.log("err")
        }
    };
})

module.exports = router;