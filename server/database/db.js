import mongoose from "mongoose";


export const Connection = async (username, password) =>{
   const URL = `mongodb://${username}:${password}@ac-9vc5ajx-shard-00-00.6njlko0.mongodb.net:27017,ac-9vc5ajx-shard-00-01.6njlko0.mongodb.net:27017,ac-9vc5ajx-shard-00-02.6njlko0.mongodb.net:27017/?ssl=true&replicaSet=atlas-i8pphl-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{

     await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
     console.log("connected")
    } catch(error){
        console.log("error while connecting ", error.message);
    }
}

export default Connection