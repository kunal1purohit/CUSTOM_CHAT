import { chats } from "./data.js";
import express from "express";
import { configDotenv } from "dotenv";
import { connectdb } from "./Config/db.js";
import colors from 'colors';
import { router as userroutes } from "./Routes/userroutes.js";
import { notFound,errorHandler } from "./middle/errormiddle.js";

const app = express()
configDotenv();
connectdb();
app.use(express.json());// to accept json data

const port= process.env.PORT || 5001 ;


app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use('/api/user',userroutes);

app.use(notFound)
app.use(errorHandler)

app.listen(port,console.log("server started on ", port.yellow.bold));
