import User from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../Utils/generateToken.js";

export const signup = async(req, res) => {
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords doesn't match."})
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error: "Username already exists."})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${fullName}`;
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${fullName}`;
        
        const newUser = new User({
            fullName,
            username,
            password: hashedPass,
            gender,
            profilePic: gender === 'male' ? boyPic : girlPic
        });

        generateTokenAndSetCookie(newUser._id, res);

        await newUser.save();
        
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    }catch{
        res.status(500).json({error: "Internal server error."});
    }
}

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!isPasswordCorrect || !user){
            return res.status(400).json({error: "Invalid username or password."});
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    }catch(err){
        res.status(500).json({error: "Internal server error."});
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message: "Logged out successfully."});
    }catch(err){
        res.status(500).json({error: "Internal server error."});
    }
}