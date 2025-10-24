import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcrypt"
import cloudnairy from "../lib/cloudinary.js";


export const signup = async(req,res)=>{
    const {fullname , email,password} = req.body;
    try{
        if(!fullname || !email || !password){
            return res.status(400).json({message:"all feild are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message:"password must be above 6 alpa"})
        }
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailregex.test(email)){
            return res.status(400).json({message:"invalid email format"})
        }
        
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"email exist"})
        
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullname,
            email,
            password:hashedpassword,
        })

        await newUser.save();

        if(newUser){
            generateToken(newUser._id,res)

            res.status(201).json({
                _id: newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                profilepic:newUser.profilepic,
            })
        }
        else{
            res.status(400).json({message:"invaild user data"})
        }
    }
    catch(error){
        console.log("error in signup",error)
        res.status(500).json({message:"internal server error"})
    }
};

export const login = async(req,res)=>{
const {email , password} = req.body;
if(!email || !password){
    return res.status(400).json({message:"all feild are required"})
}
try{
const user = await User.findOne({email});

if(!user) return res.status(400).json({message:"invaild credentials"});

const ispasswordCorrect = await bcrypt.compare(password,user.password)

if(!ispasswordCorrect) return res.status(400).json({message:"invaild credentials"});

generateToken(user.id,res)


res.status(200).json({
    _id:user._id,
    fullname:user.fullname,
    email: user.email,
    profilepic:user.profilepic
});
}
catch(error){
console.error("Error in login controller:",error);
res.status(500).json({message:"internal server error"});
}

}


export const logout = async(req,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"logout successfully"})
}

export const updateProfile = async(req,res) =>{
    try {
        const {profilepic} = req.body;
        if(!profilepic) return res.status(400).json({message:"profile picture is required"});

        const userId = req.user._id;
        const uploadResponce = await cloudnairy.uploader.upload(profilepic)
        const updatedUser = await User.findByIdAndUpdate(userId,{profilepic:uploadResponce.secure_url},{new:true})
        res.status(200).json(updatedUser);
    
    } catch (error) {
        console.log("error in update profile",error);
        res.status(500).json({message:"internal server error"})
    }
}