const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xllaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("HousePlant");
    const servicesCollections = database.collection("HousePlantServices");
    const userCollections = database.collection("HousePlantUsers");
    const reviewCollections = database.collection("HousePlantReviews");

    // products get method
    app.get("/services", async (req, res) => {
      const cursor = servicesCollections.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    // users post method
    app.post("/users", async (req, res) => {
      const data = req.body;
      const result = await userCollections.insertOne(data);
      res.json();
    });
 
    // reviews post method
    app.post("/reviews", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await reviewCollections.insertOne(data);
      res.json();
    });

    // users get method
    app.get("/users", async (req, res) => {
      const cursor = userCollections.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    // reviews get method
    app.get("/reviews", async (req, res) => {
      const cursor = reviewCollections.find({});
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    // users get by email query
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userCollections.findOne(query);
      res.json(user);
    });
  } finally {
    // client.close();
  }
}

run().catch(console.log("something error"));

app.get("/", (req, res) => {
  res.send("HOUSEPLANT Server is running");
});

app.listen(port, () => {
  console.log("server is running on port:", port);
});
