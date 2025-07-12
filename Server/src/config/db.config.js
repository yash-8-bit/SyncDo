import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
    console.info("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
