import exp from "constants";
import mongoose from "mongoose"

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("DB connected successfully!");
    }catch(err){
        console.log("Error connecting DB", err);
    }
}

export default connectDB;