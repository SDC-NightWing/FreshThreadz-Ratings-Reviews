var express = require("express");
var router = require("express").Router();
const {
  getReviews,
  getMeta,
  newReview,
  helpful,
  report,
} = require("./controllers.js");

router.get("/reviews/", getReviews);

router.get("/reviews/meta", getMeta);

router.post("/reviews", newReview);

router.put("/reviews/:review_id/helpful", helpful);

router.put("/reviews/:review_id/report", report);

module.exports = router;
