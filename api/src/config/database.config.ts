import mongoose from "mongoose";
import {envConfig} from "./env.config";

export default () => {
    let URI = envConfig.DATABASE_URL;
    let OPTION = {user: '', pass: '', autoIndex: true};
    const connect = () => {
        mongoose.connect(URI, OPTION)
            .then((res) => {
                console.log('Database Connection Successful!');
            })
            .catch((err) => {
                console.log('Database Connection Failed!', err);
                process.exit(1);
            });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
};