const pool = require("./DB/postgresDB.js");

module.exports = {
  reviewsModel: (err) => {
    return pool.query(`SELECT *
                      FROM reviews
                      WHERE (response != 'null');`);
  },
};
