import express from  'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
const app = express();
const Port = 5000;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
app.use(express.json());
app.use(cors());
let collection;
 async function run(){
    try{
      await client.connect();
      const database = client.db("mydatabase");
      collection = database.collection("mycollection");
      console.log("the data is stored successfully");x
      app.listen(Port, ()=>{
  console.log(`listening to port ${Port}`)
})
    }
    catch(error){
      console.error(error)
    }

  }
  run();

app.post("/api/data", async(req,res)=>{
  const {title, subject, content} = req.body;
  const inputs  = {title: title, subject: subject, content:content};
  await collection.insertOne(inputs);
 
  


})

