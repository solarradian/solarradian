

import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.MONGODB_URI) {
    throw new Error("Please provide the MONGODB_URI in the .env file")
}

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...')
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // Add connection options for better stability
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`)
        console.log(`Database: ${conn.connection.name}`)
        
        return conn
    } catch (error) {
        console.error("Error Connection to MongoDB:", error.message)
        
        // More detailed error logging
        if (error.name === 'MongoNetworkError') {
            console.error('Network error - check your internet connection')
        } else if (error.name === 'MongoServerError') {
            console.error('MongoDB server error - check credentials and IP whitelist')
        }
        
        process.exit(1)
    }
}

export default connectDB