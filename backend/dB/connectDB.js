import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

if(!process.env.MONGODB_URI){

    throw new Error(
        "Please provide the MONGODB_URI  oin the .env file"
    )
    
}


 const connectDB = async () =>{

    try {
        
     const conn = await mongoose.connect(process.env.MONGODB_URI);

     console.log(`MongoDB Connected: , ${conn.connection.host}`);
    } catch (error) {
        console.log("Error Connection to MongoDB" , error.message);
        process.exit(1);
    }
}


export default connectDB;
 
