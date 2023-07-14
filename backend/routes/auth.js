const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRETE = "1A34F/5S/5421"
router.post('/createuser',[
    body('Name','Enter a valid name').isLength({min:3}),
    body('Email','Enter a valid email').isEmail(),
    body('password','password must be atleast 5 character').isLength({min:5}),


], async (req,res) =>{
    let Success=false;
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()});
    }
    //Check whether the user with this email exista already
    try{
        let user = await User.findOne({Email:req.body.Email});
        if(user){
            Success=false
            return res.status(400).json({Success,error:"Sorry a user with this email already exists"})
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        //create a new user
        user = await User.create({
            Name:req.body.Name,
            password:req.body.password,
            Email:req.body.Email,
        });
        const data={
            user:{
                id:user.id
            }
        }
        const authentication = jwt.sign(data,JWT_SECRETE)
        //console.log(jwtData)
        Success=true
        res.json({Success,authentication})
       // res.json(user)
    }catch(error){
        console.error(error.message);
        Success=false;
        res.status(500).send(Success,"Some Error occured");

    }
    //console.log(req.body)
    //res.send("Hello")
    //const user  = User(req.body)
    //user.save()
    //console.log(user)
   // res.send(req.user)
  // User.create({
    //Name:req.body.Name,
    //Email:req.body.Email,
    //password:req.body.password,
 //.then(user=>res.json(user))
   //.catch(err=>console.log(err))
   //res.send(req.body)
// user can login your account through right credential 
})
router.post('/login',[
    body('Email',' Enter Email').isEmail(),
    body('password','enter password').exists()

],async (req,res)=>{
    let Success=false;
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()});
    }
    const {Email,password} = req.body;
    try{
        let user = await User.findOne({Email});
        if(!user){
            Success = false;
            return res.status(400).json({Success,errors:"Please Enter right email"})
        }

        
        const passwordCompare =  bcrypt.compare(password,user.password);
        //create a new user
        if(!passwordCompare){
            Success=false;
            return res.status(500).json({Success,errors:"Please Enter Right credentials"})

        }

        
        const data={
            user:{
                id:user.id
            }
        }
        const authentication = jwt.sign(data,JWT_SECRETE)
        //console.log(jwtData)
        Success=true;
        res.json({Success,authentication})
       // res.json(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some Error occured");

    }

});
router.post('/getuser',fetchuser,async (req,res)=>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)

    }
    catch(error){
        console.error(error.message);
        res.status(501).send("internal server error");
    }

})
module.exports = router