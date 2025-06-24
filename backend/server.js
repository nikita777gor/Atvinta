import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import mongoose from "mongoose";

import {router} from './src/router/router.js';
import {errorMiddleware} from "./src/middlewares/error-middleware.js";

const app = express();
env.config();

const PORT = process.env.PORT || 5000;

const use = () => {
    app.use(express.json());
    app.use(cors());

    app.use('/api/project', router)


    //Middleware, обрабатывающий ошибки
    app.use(errorMiddleware);
}

const start = async () => {
    try{

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })

    }catch(err){
        console.log(err);
    }
}

use();
start();