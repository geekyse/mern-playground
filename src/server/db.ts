import dotenv from 'dotenv';
import mongoose from 'mongoose'

export const dbConnection = async () => {
    dotenv.config();
    const dbConnection = process.env.DB_MONGODB_CONNECTION;

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 100,
        authSource: "admin"
    };

    await mongoose.connect(dbConnection, options, (error) => "Error while connecting to MongoDB");

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Mongo connection error :('));
    db.once('open', () =>'Mongo is successfully connected :)');
}
