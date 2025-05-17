import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected',() => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('Mongodb Connection error. Please make sure the server is running' + err)
            process.exit();
        })
    } catch (error) {
        console.log('Opps Something went wrong !!')
        console.log(error);
    }
}