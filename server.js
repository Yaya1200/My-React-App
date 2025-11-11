import express from  'express';
const app = express();
const Port = 5000;
app.post("/api/data", (req,res)=>{
  console.log(req.body);
})

app.listen(Port, ()=>{
  console.log(`listening to port ${Port}`)
})