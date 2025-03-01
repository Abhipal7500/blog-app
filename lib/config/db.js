import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const ConnectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("MongoDB Already Connected");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1); 
    }
};
