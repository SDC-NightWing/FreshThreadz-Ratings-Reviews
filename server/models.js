const pool = require("./DB/postgresDB.js");

module.exports = {
  reviewsModel: (params) => {
    //set the parameters for sorting
    const query = {
      text: `SELECT review_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness,
              (
                SELECT array_to_json(array_agg(row_to_json(d)))
                FROM (
                  SELECT id, photo_url
                  FROM review_photos
                  WHERE review_id = reviews.review_id
                ) d
              ) as photos
            FROM reviews
            WHERE product_id = ${params.id}
            AND reported = false
            ORDER BY ${params.sort}
            LIMIT ${params.count} OFFSET ${params.offSet}
          `,
    };
    return pool.query(query);
  },

  metaData: (params) => {
    const query = {
      text: `SELECT
      (
        SELECT json_object_agg(rating, count) AS ratings
        FROM (
          SELECT rating, COUNT(rating) AS count
          FROM reviews
          WHERE product_id = ${params.product_id}
          GROUP BY rating
        ) as rating
      ),
      (
        SELECT json_object_agg(recommend, count) as recommended
        FROM (
          SELECT recommend, count(recommend) as count
          FROM reviews
          WHERE product_id = ${params.product_id}
          GROUP BY recommend
        ) as recommend
      ),
      (
        SELECT json_object_agg(name, json_build_object('id', id, 'value', value)) as characteristics
        FROM (
          SELECT characteristics.name as name, characteristics.id as id, AVG(characteristic_reviews.value) as value
          FROM characteristics
          INNER JOIN characteristic_reviews
          ON characteristics.id = characteristic_reviews.characteristic_id
          WHERE characteristics.product_id = ${params.product_id}
          GROUP BY characteristics.id
        ) id_and_value
      )
      `,
    };
    return pool.query(query);
  },

  addReview: (params) => {
    const query = {
      text: ` INSERT INTO reviews (review_id, product_id, rating, date, summary, body, recommend, reported,  reviewer_name, reviewer_email, helpfulness)
      VALUES (DEFAULT, $1, $2, NOW(), $3, $4, $5, FALSE, $6, $7, 0)
      RETURNING review_id;
      `,
      values: [
        params.product_id,
        params.rating,
        params.summary,
        params.body,
        params.recommend,
        params.name,
        params.email,
      ],
    };
    return pool.query(query);
  },

  postPics: (url, review_id) => {
    const query = {
      text: `INSERT INTO review_photos (id, review_id, photo_url)
             VALUES (DEFAULT, $1, $2)`,
      values: [review_id, url],
    };
    return pool.query(query);
  },

  characteristicsReview: (id, value, review_id) => {
    const query = {
      text: ` INSERT INTO characteristic_reviews(id,characteristic_id, value, review_id)
      VALUES(DEFAULT, $1, $2, $3)
      `,
      values: [id, value, review_id],
    };
    return pool.query(query);
  },

  isHelpful: (review_id) => {
    const query = {
      update,
    };
  },

  reportReview: () => {},
};
