import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URL);
        mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.error('MongoDB connection error:', err));
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;
