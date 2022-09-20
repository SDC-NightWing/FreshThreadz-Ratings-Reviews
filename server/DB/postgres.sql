DROP DATABASE IF EXISTS ratings_reviews;

CREATE DATABASE ratings_reviews;

\c ratings_reviews



CREATE TABLE reviews (
  review_id serial PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR (350) NOT NULL,
  body VARCHAR (2000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR (50) NOT NULL,
  reviewer_email VARCHAR (50) NOT NULL,
  response VARCHAR (500),
  helpfulness INT NOT NULL
);

CREATE TABLE review_photos (
  id serial PRIMARY KEY,
  review_id INT NOT NULL,
  photo_url VARCHAR (200) NOT NULL,
  FOREIGN KEY (review_id)
    REFERENCES reviews (review_id)
);

CREATE TABLE characteristics (
  id serial PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR (100) NOT NULL
);

CREATE TABLE characteristic_reviews (
  id serial PRIMARY KEY,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY (characteristic_id)
    REFERENCES characteristics(id),
  FOREIGN KEY (review_id)
    REFERENCES reviews (review_id)
);

COPY reviews
FROM '/Users/blakelenhard/desktop/sdc_data/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY review_photos
FROM '/Users/blakelenhard/desktop/sdc_data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics
FROM '/Users/blakelenhard/desktop/sdc_data/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews
FROM '/Users/blakelenhard/desktop/sdc_data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

ALTER TABLE reviews
ALTER COLUMN date TYPE TIMESTAMP
USING (to_timestamp(date::decimal/1000));

SELECT setval(pg_get_serial_sequence('reviews', 'review_id'), coalesce(max(review_id),0) + 1, false) FROM reviews;

SELECT setval(pg_get_serial_sequence('review_photos', 'id'), coalesce(max(id),0) + 1, false) FROM review_photos;

SELECT setval(pg_get_serial_sequence('characteristics', 'id'), coalesce(max(id),0) + 1, false) FROM characteristics;

SELECT setval(pg_get_serial_sequence('characteristic_reviews', 'id'), coalesce(max(id),0) + 1, false) FROM characteristic_reviews;

CREATE INDEX reviews_product_id_index ON reviews(product_id);
CREATE INDEX reviews_recommend_index ON reviews(recommend);
CREATE INDEX reviews_rating_index ON reviews(rating);


CREATE INDEX review_photos_review_id_index ON review_photos(review_id);

CREATE INDEX characteristics_product_id ON characteristics(product_id);

CREATE INDEX characteristic_reviews_characteristic_id ON characteristic_reviews(characteristic_id);
CREATE INDEX characteristic_reviews_value_index ON characteristic_reviews(value);