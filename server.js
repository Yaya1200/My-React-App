import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import pg from 'pg';
import cors from 'cors';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import session from 'express-session';
import passport from 'passport';

const app = express();
const Port = 5000;
env.config();
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const account = new pg.Client({
  user: process.env.PG_USERNAME,     
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,           
});
const saltRounds = 10;
account.connect();
app.use(session({
secret: "TOPSECRET",
resave: false,
saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());

let collection;

async function run() {
  try {
    await client.connect();
    const database = client.db("mydatabase");
    collection = database.collection("mycollection");
    app.listen(Port, () => console.log(`Server running on port ${Port}`));
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}
run();



app.get("/api/data", async (req, res) => {
  try {
    const response = await collection.find({}).toArray();
    res.json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/api/data", async (req, res) => {
  try {
    const { title, subject, content } = req.body;
    await collection.insertOne({ title, subject, content });
    res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/api/input/account", async(req,res)=>{
  try{
    const username = req.body.username;
    const password = req.body.password;
    const result = await account.query("SELECT * FROM myreactapp WHERE username = $1",[username]);
    if(result.rows.length > 0){
      res.json("The username and password already exists")
    }
    else{
      bcrypt.hash(password, saltRounds, async(err, hash)=>{
        if(err){
          console.log("error", err);
        }
        else{
          await account.query("INSERT INTO myreactapp (username, password) VALUES( $1, $2)", [username, hash]);
     res.json("Data inserted successfully");
      }})
    }

  }
  catch(error){
    console.error("error", error)
  }
})
app.post("/api/create/account", async(req,res)=>{
  try{
    const username = req.body.username;
    const loginpassword = req.body.password;
   const response =  await account.query("SELECT * FROM myreactapp WHERE username = $1",[username]);
   
    if(response.rows.length > 0){
        const user = response.rows[0];
         const hashedpassword = user.password;
         bcrypt.compare(loginpassword, hashedpassword, (err, result)=>{
          if(err){
            console.log("error", err)
          }
          else{
           res.json(result);
          }
         })
      
    }
    else{
      res.json(false);

    }  
  }
  catch(error){
    console.error("error", error)
  }
})

app.delete("/api/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Server error" });
  }
});

