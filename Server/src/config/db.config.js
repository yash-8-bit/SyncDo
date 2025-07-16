import mongoose from "mongoose";

// function to make a connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DBURI);
    console.info("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
