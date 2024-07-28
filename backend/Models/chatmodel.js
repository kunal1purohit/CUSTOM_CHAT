import mongoose from "mongoose";
const chatmodel = mongoose.Schema(
    {
        chatname: {type:String, trim:true},
        isgrpchat: {type:Boolean , default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        },],
        latestmess:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        grpadmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }

    },
    {
        timestamps:true
    }

);

export const  Chat = mongoose.model("Chat",chatmodel);
