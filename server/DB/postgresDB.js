const { Client, Pool } = require("pg");

// create connection pool with postgres
const pool = new Pool({
  user: process.env.PGUser,
  host: process.env.PGHost,
  database: process.env.PGDatabase,
  password: process.env.PGPassword,
  port: process.env.PGPort,
});

pool.connect();

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("psql db connection err");
  } else {
    console.log(`psql db connected and the host is: ${process.env.PGHost}`);
  }
});

module.exports = pool;
