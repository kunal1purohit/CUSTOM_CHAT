import { chats } from "./data.js";
import express from "express";
import { configDotenv } from "dotenv";
import { connectdb } from "./Config/db.js";
import colors from 'colors';
import { router as userroutes } from "./Routes/userroutes.js";

const app = express()
configDotenv();
connectdb();
app.use(express.json());

const port= process.env.PORT || 5001 ;


app.get('/',(req,res)=>{
    res.send("API is running");
})

app.use('/api/user',userroutes);

app.listen(port,console.log("server started on ", port.yellow.bold));
