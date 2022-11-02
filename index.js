//
//
//
//
//
//

const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
require("dotenv").config();

//
// mongodb
// user:
//
// const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://mdmasudranainfo:${process.env.DB_PASSWORD}@cluster0.9ybk3ec.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
    const PorCollection = client.db("Genius-car").collection("Product");
    const orderCollection = client.db("Genius-car").collection("order");
    // const result = await PorCollection.insertOne({ name: "MD Masud" });
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = PorCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await PorCollection.findOne(query);
      res.send(service);
    });

    // post order
    app.post("/order", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });
    // post order end
    // post get
    app.get("/order", async (req, res) => {
      let query = {};
      // query peramitar
      if (req.query.email) {
        query.email = req.query.email;
      }
      const cursor = orderCollection.find(query);
      const order = await cursor.toArray();
      res.send(order);
    });
    // post get end

    // delete Operation
    app.delete("/order/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });
    // delete Operation End
    // update
    app.patch("/order/:id", async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;
      const query = { _id: ObjectId(id) };
      const updateDoc = {
        $set: { status: status },
      };
      const result = await orderCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    // update Operation end
  } catch (err) {
    console.log(err);
  }
};
run().catch((err) => console.log(err));
//
app.get("/", (req, res) => {
  res.send("server is raning");
});
app.listen(port, () => {
  console.log(`server running ${port}`);
});
