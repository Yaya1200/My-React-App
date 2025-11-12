import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import pg from 'pg';
import cors from 'cors';

const app = express();
const Port = 5000;
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const account = new pg.Client({
  user: 'postgres',     
  host: 'localhost',
  database: 'takenote',
  password: '42750305',
  port: 5433,           
});
account.connect();


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

