import mongoose from "mongoose";

const connectDB = async () => {
    try {

        const connection = await mongoose.connect(process.env.MONGO_DB);

        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`Mongo DB connected to: ${url}`);

    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;