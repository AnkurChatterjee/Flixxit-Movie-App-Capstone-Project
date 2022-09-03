const router = require('express').Router();
const { response } = require('express');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Register
router.post("/register", async (request,response) => {
    const newUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: CryptoJS.AES.encrypt(request.body.password, process.env.SECRET_KEY).toString()
    });
    try{
        const user = await newUser.save();
        response.json(user);
    } catch(err){
        response.json(err);
    }
})

//Login
router.post('/login', async (request,response) => {
    try{
        const user = await User.findOne({email: request.body.email})
        if(!user){
            response.json({message: "Username not found"})
        } else {
            const originalPassword = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
            const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY, {expiresIn: "5d"});
            const {password, ...info} = user._doc;
            originalPassword!==request.body.password ? response.json({message: "Incorrect Password"}) :
            response.json({...info, accessToken});
        }
    }catch(err){
        response.json(err);
    }
})

module.exports = router;