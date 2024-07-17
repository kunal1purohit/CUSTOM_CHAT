import mongoose from "mongoose";

export const connectdb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            
        });
        console.log("mongodb connected : " , conn.connection.host.cyan)
    } catch (error) {
        console.log(1000000);
        console.log("err : ", error);
        process.exit();
    }
}