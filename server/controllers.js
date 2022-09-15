const { reviewsModel } = require("./models.js");

module.exports = {
  // controller to handle request for reviews
  getReviews: (req, res) => {
    reviewsModel().then((data) => {
      console.log(data.rows);
      res.send(data.rows).status(201);
    });
  },

  // controller to handle request for meta data
  getMeta: (req, res) => {
    console.log(req);
  },

  // controller to handle posting a review
  newReview: (req, res) => {
    console.log(req);
  },

  // controller to update if a review is helpful
  helpful: (req, res) => {
    console.log(req);
  },

  // controller for reporting a review
  report: (req, res) => {
    console.log(req);
  },
};
