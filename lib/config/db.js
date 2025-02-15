import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Failed:", error);
        process.exit(1);
    }
};
