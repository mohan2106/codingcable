const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/',(req,res)=>{
    res.json('OTP Submitting Page');
})

router.post('/auth-otp',(req,res)=>{
    const phone = req.body.phone;
    User.findOne({phone})
        .then((user)=>{
            if(user){
                res.status(400).json('Phone Number already registered');
            }else{
                const otp= req.body.otp;
                if(otp=='1234'){
                    const user = new User({
                        phone,
                        phone_verified:true
                    });
                    console.log("authOtp",user);
                    user.save();
                    res.status(201).json(user);
                }else{
                    res.status(400).json('Incorrect Otp');
                    res.redirect('/users/signup/user._id');
                }
            }
        }).catch(e=>{
            res.status(500).json(e);
        })
    
})

router.get('/signup/:id',(req,res)=>{
    res.json('signUp page');
})

router.post('/signup/:id',async(req,res)=>{
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isPresent = await User.findOne({email});
    if(isPresent){
        res.status(400).json('Try differet email');
    }else{
        const user = await User.findById(id);
        console.log("user",user);
        try {
            user.name = name;
            user.email = email;
            user.password = password;
            var token = jwt.sign({user}, 'secretkey');
            await user.save();
            res.status(200).json({user,token});
        }catch (error) {
            res.status(400).json(error);
        }
    }        
})

router.get('/signin',(req,res)=>{
    res.json('signin Page');
})

router.post('/signin', async(req,res)=>{
    const phone = req.body.phone;
    const password = req.body.password;
    const user = await User.findOne({phone});
    if(!user){
        res.json("Phone Number is not registered").status(400);
    }else{
        console.log("password",password);
        console.log("auth Pass",user.password);
        
        
        var result = bcrypt.compareSync(password, user.password);
        if(result==true){

            var token = jwt.sign({user}, 'secretkey');

            // var token = jwt.sign({ password: user.password}, 'shhhhh');
            // console.log(token);
            // user.token = token;
            // console.log("user",user);
            // await user.save();
            res.status(200).json({user,token});
        }
        else
            res.status(400).json("Incorrect Password");
        }    
});

function ensureToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader != undefined){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.json("Unauthorized");
    }
}




module.exports = router;