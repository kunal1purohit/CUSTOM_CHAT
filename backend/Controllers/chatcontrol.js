import expressAsyncHandler from "express-async-handler";
import { Chat } from "../Models/chatmodel.js";
import { User } from "../Models/usermodel.js";
export const accesschat = expressAsyncHandler(async(req,res)=>{
    const {userid}  = req.body;
    if(!userid){
        console.log("userid param not send with request");
        return res.sendStatus(400);
    }
    var ischat = await Chat.find({
        isgrpchat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userid}}},
        ],
    }).populate("users","-password").populate("latestmess");
    ischat = await User.populate(ischat,{
        path:"latestmess.sender",
        select:"name pic email"
    });
    if(ischat.length > 0){
        res.send(ischat[0]);
    }else{
        var chatdata={
            chatname:"sender",
            isgrpchat:false,
            users:[req.user._id,userid],
        };
        try {
            const createdchat = await Chat.create(chatdata);
            const fullchat = await Chat.findOne({
                _id:createdchat._id
            }).populate("users","password");
            res.status(200).send(fullchat);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
});

export const fetchchats = expressAsyncHandler(async(req,res)=>{
   try{
       Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
       .populate("users","-password")
       .populate("latestmess")
       .populate("grpadmin","-password")
       .sort({updatedAt:1})
       .then(async results=>{
        results = await User.populate(results,{
            path:"latestmess.sender",
            select:"name pic email"
            });
        res.status(200).send(results);
       })
       
   }catch(error){
    res.status(400);
    throw new Error(error.message);
   }
});

export const creategroupchat = expressAsyncHandler(async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"please fill all the feilds"});
    }
    
    var users = JSON.parse(req.body.users);
    
    if(users.length<2){
        res.status(400).send("more than 2 users are required");
    }
    users.push(req.user);
   
    
    try {
        const grpchat = await Chat.create({
            chatname:req.body.name,
            isgrpchat:true,
            users:users,
            grpadmin:req.user
        })

        console.log(grpchat);

        const fullgrpchat = await Chat.findOne({_id :grpchat._id})
        .populate("users","-password")
        .populate("grpadmin","-password")

        

        res.status(200).json(fullgrpchat)

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const renamegroup = expressAsyncHandler(async(req,res)=>{
    const {chatid,chatname} = req.body;
    const updatedchat = await Chat.findByIdAndUpdate(
        chatid,
        {
            chatname,
        },
        {
            new:true,
        }
    )
    .populate("users","-password")
    .populate("grpadmin","-password")

    if(!updatedchat){
        res.status(404);
        throw new Error("chat not found");
    }else{
        res.json(updatedchat)
    }

})

export const addtogroup = expressAsyncHandler(async(req,res)=>{
    const {chatid,userid} = req.body;
    const added = Chat.findByIdAndUpdate(
        chatid,
        {
            $push:{users:userid},
        },
        {new:true}
        .populate("users","-password")
        .populate("grpadmin","-password")
    
        
    )

    if(!added){
        res.status(404);
        throw new Error("chat not found");
    }else{
        res.json(added)
    }
})

export const removefromgroup = expressAsyncHandler(async(req,res)=>{
    const {chatid,userid} = req.body;
    const added = Chat.findByIdAndUpdate(
        chatid,
        {
            $push:{users:userid},
        },
        {new:true}
        .populate("users","-password")
        .populate("grpadmin","-password")
    
        
    )

    if(!added){
        res.status(404);
        throw new Error("chat not found");
    }else{
        res.json(added)
    }
})