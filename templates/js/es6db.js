import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URI)

        console.log(`MongoDb Connected Successfully: ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error while connecting to DB: ${error.message}`)
        process.exit(1)
    }
}

export default dbConnect
