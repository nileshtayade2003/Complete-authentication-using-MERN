// const epxress = require('express')
import express from "express";
import { connectDB } from "./db/connectDB.js";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config();

import authRoutes from './routes/auth.route.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()) //allows us to parse incoming requests with json payload (form): req.body
app.use(cookieParser()); // allows us to parse incoming cookies
app.use(express.urlencoded({extended:true}))

app.use('/api/auth', authRoutes)

app.listen(PORT,()=>{
  connectDB();
  console.log("server is running on port 3000")
})

