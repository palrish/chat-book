import User from "../Models/userModel.js"

export const getUser = async(req, res) => {
    try{
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({error: "Internal server error."});
    }
}

export const getUserForSidebar = async(req, res) => {
    try{
        const userId = req.user._id;
        const user = await User.find({_id: {$ne: userId}}).select("-password");
        res.status(201).json(user);
    }catch(err){
        res.status(500).json({error: "Internal server error."});
    }
}