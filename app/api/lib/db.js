import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    console.log(process.env.NEXT_PUBLIC_MONGODB_URI, "This is the connection String")
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectMongoDB;
