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
    const ordersCollections = database.collection("HousePlantOrders");

    // products get method
    app.get("/services", async (req, res) => {
      const cursor = servicesCollections.find({});
      const services = await cursor.toArray();
      res.send(services);
    });

    // products get method by query
    app.get("/service", async (req, res) => {
      const id = req.query._id;
      const query = { _id: ObjectId(id) };
      const service = await servicesCollections.findOne(query);
      res.send(service);
    });

    // order get method by query
    app.get("/order", async (req, res) => {
      const email = req.query.email;
      const query = { email: email };
      const order = ordersCollections.find(query);
      const result = await order.toArray();
      res.send(result);
    });

    // order delete method
    app.delete("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ordersCollections.deleteOne(query);
      res.json(result);
    });

    // order put method
    app.put("/orders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: "approved",
        },
      };
      const result = await movies.updateOne(filter, updateDoc, options);
      console.log(result);
      res.json(result);
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
      const result = await reviewCollections.insertOne(data);
      res.json();
    });

    // orders post method
    app.post("/orders", async (req, res) => {
      const data = req.body;
      const result = await ordersCollections.insertOne(data);
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

    // orders get method
    app.get("/orders", async (req, res) => {
      const cursor = ordersCollections.find({});
      const orders = await cursor.toArray();
      res.send(orders);
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

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("HOUSEPLANT Server is running");
});

app.listen(port, () => {
  console.log("server is running on port:", port);
});
