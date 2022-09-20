const { response } = require("express");
const {
  reviewsModel,
  metaData,
  addReview,
  isHelpful,
  reportReview,
  postPics,
  characteristicsReview,
} = require("./models.js");

module.exports = {
  // controller to handle request for reviews
  getReviews: (req, res) => {
    //define query params to either what they are requested or presets
    const params = {
      id: req.query.product_id,
      page: !req.query.page ? 1 : req.query.page,
      count: !req.query.count ? 5 : req.query.count,
      sort: req.query.sort || "newest",
    };

    // off set is based off of the value of page set outside initializer
    params.offSet = params.page === "1" ? 0 : (params.page - 1) * params.count;

    // gives the correct query to sort value
    if (params.sort === "helpful") {
      params.sort = "helpfulness DESC";
    } else if (params.sort === "newest") {
      params.sort = `date DESC`;
    } else if (params.sort === "relevant") {
      params.sort = `date DESC, LENGTH(body) DESC, helpfulness DESC`;
    }

    // pass request to the model
    reviewsModel(params)
      .then((data) => {
        const result = {
          product: params.id,
          page: params.page,
          count: params.count,
          results: data.rows,
        };
        res.send(result).status(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // controller to handle request for meta data
  getMeta: (req, res) => {
    const params = {
      product_id: req.query.product_id,
    };
    metaData(params)
      .then((data) => {
        res.send(data.rows[0]).status(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // controller to handle posting a review
  newReview: (req, res) => {
    const params = req.body;

    addReview(params)
      .then((result) => {
        const photos = params.photos;
        const characteristics = params.characteristics;
        const review_id = result.rows[0].review_id;

        for (key in characteristics) {
          const id = key;
          const value = characteristics[key];
          characteristicsReview(id, value, review_id);
        }

        photos.map((photoObj) => {
          const url = photoObj.url;

          postPics(url, review_id);
        });
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // controller to update if a review is helpful
  helpful: (req, res) => {
    const review_id = req.params.review_id;
    isHelpful(review_id)
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  // controller for reporting a review
  report: (req, res) => {
    const review_id = req.params.review_id;
    reportReview(review_id)
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
  },
};
