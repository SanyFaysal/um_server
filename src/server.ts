import { Server } from 'http';
import mongoose from 'mongoose';
import config from './config';
import colors from 'colors';
import app from './app';


async function server() {
    try {
        mongoose.connect(config.database_url as string);
        console.log(colors.yellow.bold("Database is connected successfully !"))

        app.listen(config.port, () => {
            console.log(colors.blue.bold(`Application is running on port : ${config.port}`))

        })
    } catch (error) {
        console.log('Something went wrong!')
    }
}

server()