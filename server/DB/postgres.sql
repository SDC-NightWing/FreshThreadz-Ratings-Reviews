DROP DATABASE IF EXISTS ratings_reviews;

CREATE DATABASE ratings_reviews;

\c ratings_reviews



CREATE TABLE reviews (
  review_id serial PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date VARCHAR(100) NOT NULL,
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
  phot_url VARCHAR (200) NOT NULL,
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
