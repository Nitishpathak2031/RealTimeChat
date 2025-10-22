import mongoose from "mongoose"
export const connectdb = async() =>{

    try{
        const conn =await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb connected succesfully:",conn.connection.host)
    }
    catch(error){
        console.error("error in connection",error)
        process.exit(1);
    }

}