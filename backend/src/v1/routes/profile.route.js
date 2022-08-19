const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/authCheck')
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
                        if(!user.Private){
                            user.Following.push(requestProfileData._id)
                            requestProfileData.Follower.push(req.user.user_id)
                            await user.save()
                            await requestProfileData.save()
                            return res.status(200).json({ err: null, status:"Following" })
                        }
                        else{
                            requestProfileData.PendingRequest.push(user._id)
                            await requestProfileData.save()
                            return res.status(200).json({ err: null,status:"Requested" })

                        }
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

router.post('/me', authCheck, async(req,res,next)=>{
    if (req.user){
        let user = await User.findOne({_id:req.user.user_id},{Username:1,PendingRequest:1}).populate("PendingRequest","Username ProfilePicture Private Follower")
        if (user){
            return res.status(200).json({ err: null, request:user })
        }else {
            return res.status(404).json({ err: "Some error" })
        }
    }
    else {
        return res.status(404).json({ err: "User not found" })
    }
})
router.post('/confirmFriend', authCheck, async(req,res,next)=>{
    if (req.user){
        let id = req.body.id
        let user = await User.findOne({_id:req.user.user_id},{PendingRequest:1,Follower:1})
        let r = await User.findOne({_id: id})
        if (user && id && r){
            user.PendingRequest.pop(id)
            user.Follower.push(id)
            r.Following.push(user._id)
            await user.save()
            await r.save()
            return res.status(200).json({ err: null })
        }else {
            return res.status(404).json({ err: "Some error" })
        }
    }
    else {
        return res.status(404).json({ err: "User not found" })
    }
})
router.post('/rejectFriend', authCheck, async(req,res,next)=>{
    if (req.user){
        let id = req.body.id
        let user = await User.findOne({_id:req.user.user_id},{PendingRequest:1})
        if (user && id && r){
            user.PendingRequest.pop(id)
            await user.save()
            return res.status(200).json({ err: null })
        }else {
            return res.status(404).json({ err: "Some error" })
        }
    }
    else {
        return res.status(404).json({ err: "User not found" })
    }
})
module.exports = router;