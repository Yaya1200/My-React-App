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
async function run() {
  try{
  await client.connect();
  const database = client.db("mydatabase");
  collection = database.collection("mycollection");
  app.listen(Port,()=>{
    console.log(`Listening to port ${Port}`);
  })
  }
  catch(error){
   console.log("error", error);
  };
  
  
}
  run();

app.post("/api/data", async(req,res)=>{
  const {title, subject, content} = req.body;
  const inputs  = {title: title, subject: subject, content:content};
  await collection.insertOne(inputs);

})

