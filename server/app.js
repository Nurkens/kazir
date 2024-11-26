import express from 'express';
import mongoose from 'mongoose';
import router from './authRouter.js';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;


const app = express();

app.use(express.json());
app.use('/auth',router);

async function startApp(){
    try{
        await mongoose.connect(DB_URL);
        app.listen(PORT,()=>console.log(`The server is working on port ${PORT}`));
    }
    catch(error){
        console.log(error);
    }

}

startApp();