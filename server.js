import express from  'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
const app = express();
const Port = 5000;
const uri = "mongodb://localhost:27017";
const client = MongoClient(uri)
app.use(express.json());
app.use(cors());

app.post("/api/data", (req,res)=>{
  const {title, subject, content} = req.body;

})

app.listen(Port, ()=>{
  console.log(`listening to port ${Port}`)
})