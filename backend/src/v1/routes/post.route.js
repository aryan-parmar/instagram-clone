const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authCheck = require('../middleware/authCheck')
const authCheckBasic = require('../middleware/authCheckBasic')
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
            let user = await User.findOne({ _id: req.user.user_id }).populate('Follower', 'Username')
            user.Follower.forEach((follower) => {
                User.findOne({ Username: follower.Username }).then((u) => {
                    u.Timeline.unshift(posts._id)
                    u.save()
                })
            })
            res.status(200).json({ err: null })
        })
        // return res.status(200).json({ err: null })
    };
})
router.post('/getpost', authCheck, async (req, res, next) => {
    if (req.user) {
        let user = await User.findOne({ _id: req.user.user_id }, { Timeline: 1 }).populate("Timeline")
        user = await user.populate({
            path: 'Timeline',
            populate: {
                path: 'User_id',
                model: 'user',
                select: 'Username ProfilePicture Following'
            }
        })
        user = await user.populate({
            path: 'Timeline.User_id.Following',
            model: 'user',
            select: 'Username ProfilePicture'
        })
        return res.status(200).json({ err: null, posts: user })
    };
})
router.post('/getprofile', authCheckBasic, async (req, res, next) => {
    if (req.user) {
        let requestProfile = req.body.profileName
        let post = req.body.post
        let data = {}
        if (requestProfile) {
            let requestProfileData = await User.findOne({ Username: requestProfile })
            let user = await User.findOne({ _id: req.user.user_id })
            if (requestProfileData && user) {
                if (requestProfileData._id.toString() === req.user.user_id || requestProfileData.Follower.includes(req.user.user_id) || !requestProfileData.Private) {
                    let posts = await Post.find({ User_id: requestProfileData._id }, { PostImage: 1, _id: 1, Likes: 1 }).sort({ Date: -1 })
                    data['Username'] = requestProfileData.Username
                    data['FullName'] = requestProfileData.FullName
                    data['Posts'] = posts
                    data['PostCount'] = posts.length
                    data['Follower'] = requestProfileData.Follower.length
                    data['Following'] = requestProfileData.Following.length
                    data['Bio'] = requestProfileData.Bio
                    data['ProfilePicture'] = requestProfileData.ProfilePicture
                    data['Rejected'] = false
                    data["RUser"] = user.Username
                    data["RUserInFollower"] = await requestProfileData.Follower.includes(req.user.user_id)
                    data["RUserInPending"] = false
                    if (!data["RUserInFollower"]) data["RUserInPending"] = requestProfileData.PendingRequest.includes(req.user.user_id);
                    return res.status(200).json({ err: null, data })
                } else {
                    let posts = await Post.countDocuments({ User_id: requestProfileData._id })
                    data['Username'] = requestProfileData.Username
                    data['FullName'] = requestProfileData.FullName
                    data['PostCount'] = posts
                    data['Posts'] = []
                    data['Follower'] = requestProfileData.Follower.length
                    data['ProfilePicture'] = requestProfileData.ProfilePicture
                    data['Following'] = requestProfileData.Following.length
                    data['Bio'] = requestProfileData.Bio
                    data['Rejected'] = true
                    data["RUser"] = user.Username
                    data["RUserInFollower"] = false
                    data["RUserInPending"] = requestProfileData.PendingRequest.includes(req.user.user_id);
                    return res.status(200).json({ err: null, data })
                }
            }
            else {
                return res.status(404).json({ err: "Profile Not Found" })
            }

        }
        else if (post) {
            let postData = await Post.findOne({ _id: post })
            if (postData) {
                let user = await User.findOne({ _id: postData.User_id })
                if (user && (user._id.toString() === req.user.user_id || !user.Private || user.Follower.includes(req.user.user_id))) {
                    data['Username'] = user.Username
                    data['FullName'] = user.FullName
                    data['Posts'] = postData
                    data['user_id'] = user._id.toString()
                    data['ProfilePicture'] = user.ProfilePicture
                    return res.status(200).json({ err: null, data })
                } else {
                    return res.status(404).json({ err: "Post Not Found" })
                }
            }
            else {
                return res.status(404).json({ err: "Profile Not Found" })
            }
        }
        else {
            console.log("err")
        }
    } else {
        let requestProfile = req.body.profileName
        if (requestProfile) {
            let requestProfileData = await User.findOne({ Username: requestProfile })
            if (requestProfileData) {
                let data = {}
                let posts = await Post.countDocuments({ User_id: requestProfileData._id })
                data['Username'] = requestProfileData.Username
                data['FullName'] = requestProfileData.FullName
                data['PostCount'] = posts
                data['Posts'] = []
                if (!requestProfileData.Private) {
                    data['Posts'] = await Post.find({ User_id: requestProfileData._id }, { PostImage: 1, _id: 1, Likes: 1 }).sort({ Date: -1 })
                }
                data['Follower'] = requestProfileData.Follower.length
                data['ProfilePicture'] = requestProfileData.ProfilePicture
                data['Following'] = requestProfileData.Following.length
                data['Bio'] = requestProfileData.Bio
                data['Rejected'] = true
                data["RUser"] = null
                data["RUserInFollower"] = false
                data["RUserInPending"] = false
                return res.status(200).json({ err: null, data })
            }
            else {
                return res.status(404).json({ err: "Profile Not Found" })
            }
        }
        else {
            return res.status(404).json({ err: "Profile Not Found" })
        }
    }
    ;
})

router.post('/likeaction', authCheck, async (req, res, next) => {
    if (req.user) {
        let likedAction = req.body.likedAction
        let PostId = req.body.PostId
        if (PostId) {
            let user = await User.findOne({ _id: req.user.user_id })
            let post = await Post.findOne({ _id: PostId })
            if (!post.LikedBy.includes(req.user.user_id)) {
                if (likedAction) {
                    post.LikedBy.unshift(user._id)
                    post.Likes++
                    post.save()
                    return res.status(200).json({ err: null, Liked: true })
                }
                else {
                    return res.status(200).json({ err: null, Liked: false })
                }
            }
            else if (post.LikedBy.includes(req.user.user_id)) {
                if (!likedAction) {
                    post.LikedBy.pop(user._id)
                    post.Likes--
                    post.save()
                    return res.status(200).json({ err: null, Liked: false })
                } else {
                    return res.status(200).json({ err: null, Liked: true })
                }
            }
        }
    }
})

module.exports = router;