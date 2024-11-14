const mongoose=require("mongoose");

const connection=async()=>{
    try{
        const connectionInstance=await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDb connected: ${connectionInstance.connection.host}`)
    }catch(error){
        console.log("Error in MongoDb connection",error)
    }
}

module.exports=connection;