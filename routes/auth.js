const express = require("express");
const router = express.Router();
const User=require("../models/User")
// Dummy route to test
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const bcrypt=require("bcryptjs")

router.get("/", (req, res) => {
  res.send("Auth route working");
});

router.post("/register",async (req,res)=>{
  try{
    const{name,email,password}=req.body
    console.log(name,email,password)
    const existingUser=await User.findOne({email})
    if (existingUser){
      return res.status(400).json({message:'Email already in use'})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    
    const newUser=new User({name,email,password:hashedPassword})
    
    await newUser.save();
    // res.send("Register route working")
    res.status(201).json({ message: "User registered successfully" });
  }
  catch(err){
    res.status(500).json({ message: "Error registering user",error:err.message });
  }
})

router.post("/login",async (req,res)=>{
  try{
    const{email,password}=req.body
    const user=await User.findOne({email})
    if (user){
      const isMatch=await bcrypt.compare(password,user.password)
      const token=jwt.sign(
        {userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
      )
      if (isMatch){
        res.status(200).json({message:"User logged in successfully",token,user})
      }
      else{
        return res.status(401).json({message:"Invalid password"})
      }
    }
    else{
      return res.status(404).json({message:"User not Found"})
    }
  }
  catch(err){
    res.status(500).json({ message: "Error logging in user",error:err.message})
  }
})

module.exports = router; // ✅ important