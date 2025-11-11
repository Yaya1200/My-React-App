import express from  'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
const app = express();
const Port = 5000;
const uri = "mongodb://localhost:27017";
const client = MongoClient(uri);
app.use(express.json());
app.use(cors());

app.post("/api/data", (req,res)=>{
  const {title, subject, content} = req.body;
  async function run(){
    try{
      await client.connect();
      const database = client.db("mydatabase");
      const collection = database.collection("mycollection");
      const inputs  = {title: title, subject: subject, content:content};
      const result = await collection.insertone(inputs);


    }
    catch(error){
      console.error(error)
    }
  }

})

app.listen(Port, ()=>{
  console.log(`listening to port ${Port}`)
})