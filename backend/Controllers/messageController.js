import Conversation from "../Models/conversationModel.js";
import Message from "../Models/messageModel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try{
        const {message} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, recieverId]}
        });
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            });
        }
        const newMessage = new Message({
            sender: senderId,
            reciever: recieverId,
            message: message
        });
        
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([newMessage.save(), conversation.save()]);

        // SOCKET

        const recieverSocketId = getRecieverSocketId(recieverId);
        if(recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    }catch(err){
        res.status(500).json({error: "Internal server error."});
    }
}

export const getMessage = async (req, res) => {
    try{
        const {id: chatToUserId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, chatToUserId]}
        }).populate("messages");

        if(!conversation){
            return res.status(201).json([]);
        }
        
        const messages = conversation.messages;
        res.status(201).json(messages);
    }catch(err){
        res.status(500).json({error: "Internal server error."});
    }
}