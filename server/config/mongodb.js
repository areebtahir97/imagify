import mongoose from "mongoose";

const connectDB=async ()=>{
    mongoose.connection.on('connected',()=>{    //it will execute whenever then db is connected
        console.log('Database Connected')
    })
    await  mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}

export default connectDB;