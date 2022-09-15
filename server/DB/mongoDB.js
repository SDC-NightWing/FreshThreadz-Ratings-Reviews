const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/ratings_reviews");

const db = mongoose.connection;
db.on("error", () => {
  console.log("connection error");
});
db.once("open", () => {
  console.log("Connected successfully");
});

const reviewSchema = new Schema({
  review_id: Number,
  product_id: Number,
  rating: Number,
  date: Number,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
  photos: [{ id: Number, URL: String }],
});

const metaSchema = new Schema({
  product_id: Number,
  ratings: { 1: Number, 2: Number, 3: Number, 4: Number, 5: Number },
  recommend: { yes: Number, no: Number },
  characteristics: { type: { id: Number, value: Number } },
});

const ReviewModel = mongoose.model("Review", reviewSchema);
const MetaModel = mongoose.model("Meta", metaSchema);

module.exports = {
  ReviewModel = ReviewModel,
  MetaModel = MetaModel
};
