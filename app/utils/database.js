import mongoose from 'mongoose'

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://oddyseibcm:ithaca9610@cluster0.j3dptcy.mongodb.net/nextAppDataBase?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MongoDB connected successfully")
    } catch  {
        console.error("MongoDB connection failed")
        throw new Error("MongoDB connection failed")
    }
}

export default connectDB
