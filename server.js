import express from  'express';
import cors from 'cors';
const app = express();
const Port = 5000;
app.use(express.json());
app.use(cors());
app.post("/api/data", (req,res)=>{
  console.log(req.body);
})

app.listen(Port, ()=>{
  console.log(`listening to port ${Port}`)
})