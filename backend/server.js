import { chats } from "./data.js";
import express from "express";
import { configDotenv } from "dotenv";
const app = express()
configDotenv();
const port= process.env.PORT || 5000 ;


app.get('/',(req,res)=>{
    res.send("API is running");
})

app.get('/api/chat/:id',(req,res)=>{
    const singlechat = chats.find((chat)=>(chat._id === req.params.id));
    res.send(singlechat);
})

app.listen(port,console.log("server started on ", port));
