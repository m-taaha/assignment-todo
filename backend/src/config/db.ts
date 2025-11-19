import mongoose from "mongoose"

export const connectDB = async () => {

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }
    
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connnected successfully")
    }catch(error){
        console.log("MongoDB connection Failed:", error)
        process.exit(1);
    }
}