require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.serverPort || 3000;
const router = require("./router.js");

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// treansfer to router file
app.get("/loaderio-048d6d632814fec753974e4546749fb2", (req, res) => res.send("loaderio-048d6d632814fec753974e4546749fb2"))
app.use("", router);

app.listen(port, () => {
  console.log(`Currently listening on http://localhost:${port}`);
});
