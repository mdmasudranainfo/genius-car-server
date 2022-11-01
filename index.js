//
//
//
//
//
//

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
require("dotenv").config();

//
// mongodb
// user: user
// pass :5hp3dEzbS7vklxIX
//

//
app.get("/", (req, res) => {
  res.send("server is raning");
});
app.listen(port, () => {
  console.log("server running");
  console.log(process.env.DB_PASSWORD);
});
