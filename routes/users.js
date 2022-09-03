const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken')

//Update
router.put("/:id", verify, async (request,response) => {
    if(request.user?.id === request.params.id || request.user?.isAdmin){
        if(request.body.password){
            request.body.password = CryptoJS.AES.encrypt(request.body.password, process.env.SECRET_KEY).toString();
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(request.params.id, {$set: request.body}, {new: true})
            response.json(updatedUser);
        } catch(err) {
            response.status(500).json(err)
        }
    } else {
        response.status(403).json({message: 'You are not authorised for this action'})
    }
})

//Delete
router.delete("/:id", verify, async (request,response) => {
    if(request.user?.id === request.params.id || request.user?.isAdmin){
        try{
            await User.findByIdAndDelete(request.params.id);
            response.json({message: 'User has been deleted'});
        } catch(err) {
            response.status(500).json(err)
        }
    } else {
        response.status(403).json({message: 'You are not authorised for this action'})
    }
})

//Get by id
router.get("/find/:id", async (request,response) => {
    try{
        const user = await User.findById(request.params.id)
        const {password, ...info} = user._doc;
        response.json(info);
    } catch(err) {
        response.status(500).json(err)
    }
})

//Get all
router.get("/", verify, async (request,response) => {
    const query = request.query.new;
    if(request.user?.isAdmin){
        try{
            const users = query ? await User.find().sort({_id: -1}).limit(2) : await User.find();
            response.json(users);
        } catch(err) {
            response.status(500).json(err)
        }
    } else {
        response.status(403).json({message: 'You are not authorised for this action'})
    }
})

//Get user stats
router.get("/stats", async (request,response) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() -1);
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    try{
        const data = await User.aggregate([
            {
                $project: {
                    month: {$month: "$createdAt"}
                }
            },{
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])
        response.json(data);
    } catch(err) {
        response.status(500).json(err);
    }
})

module.exports = router;