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
app.use("", router);

app.listen(port, () => {
  console.log(`Currently listening on http://localhost:${port}`);
});
