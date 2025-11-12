import express from  'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import axios from 'axios';
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

app.get("/api/data", async(req, res)=>{
  try{
    const response = await collection.find({}).toArray();
    res.json(response);
  }
  catch(error){
    console.error("error", error);
  }
})
app.post("/api/data", async(req,res)=>{
  const {title, subject, content} = req.body;
  const inputs  = {title: title, subject: subject, content:content};
  await collection.insertOne(inputs);

})
app.delete("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting ID:", id); 
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
});




