import mongoose from "mongoose";

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/student-management');
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };
  
    export default connectDB;