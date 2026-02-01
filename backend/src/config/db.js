import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://devildevsingh69_db_user:UM2Ier9P5t4DOopU@cluster0.ikf5zzi.mongodb.net/?appName=Cluster0");
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
