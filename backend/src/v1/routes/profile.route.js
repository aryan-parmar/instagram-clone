const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authCheck = require('../middleware/authCheck')
const authCheckBasic = require('../middleware/authCheckBasic')
const fs = require('fs');
const { v4: uuid } = require('uuid')
const User = require("../../models/User.model");
const Post = require("../../models/post.model");

router.post('/follow', authCheck, async (req, res, next) => {
    if (req.user) {
        let requestProfile = req.body.profileName
        let user = await User.findOne({ _id: req.user.user_id })
        if (requestProfile && user) {
            let requestProfileData = await User.findOne({ Username: requestProfile })
            if (requestProfileData) {
                if (requestProfileData._id.toString() !== req.user.user_id) {
                    if (!user.Following.includes(requestProfileData._id)) {
                        user.Following.push(requestProfileData._id)
                        requestProfileData.Follower.push(req.user.user_id)
                        await user.save()
                        await requestProfileData.save()
                        return res.status(200).json({ err: null })
                    } else {
                        return res.status(400).json({ err: "Already a follower" })
                    }
                } else {
                    return res.status(400).json({ err: "Cannot follow self" })
                }
            } else {
                return res.status(404).json({ err: "Profile not found" })
            }
        } else {
            return res.status(404).json({ err: "User not found" })
        }
    }
})

router.post('/unfollow', authCheck, async (req, res, next) => {
    if (req.user) {
        let requestProfile = req.body.profileName
        let user = await User.findOne({ _id: req.user.user_id })
        if (requestProfile && user) {
            let requestProfileData = await User.findOne({ Username: requestProfile })
            if (requestProfileData) {
                if (requestProfileData._id.toString() !== req.user.user_id) {
                    if (user.Following.includes(requestProfileData._id)) {
                        user.Following.pop(requestProfileData._id)
                        requestProfileData.Follower.pop(req.user.user_id)
                        await user.save()
                        await requestProfileData.save()
                        return res.status(200).json({ err: null })
                    } else {
                        return res.status(400).json({ err: "Already a follower" })
                    }
                } else {
                    return res.status(400).json({ err: "Cannot follow self" })
                }
            } else {
                return res.status(404).json({ err: "Profile not found" })
            }
        } else {
            return res.status(404).json({ err: "User not found" })
        }
    }
})

module.exports = router;