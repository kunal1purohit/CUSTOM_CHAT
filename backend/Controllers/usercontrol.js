import expressAsyncHandler from "express-async-handler";
import { User } from "../Models/usermodel.js";
import { generateToken } from "../Config/generatetoken.js";

export const registeruser = expressAsyncHandler(async(req,res)=>{
    const {name,email,password,pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("please enter all the feilds");
    }

    const userexists = await User.findOne({email});

    if(userexists){
        res.status(400);
        throw new Error("user already exists");
    }

    const user = await User.create({
        name,email,password,pic
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token : generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("failed to create user");
    }
});