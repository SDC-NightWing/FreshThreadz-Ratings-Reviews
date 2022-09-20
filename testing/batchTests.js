const max = 1000000;
const min = 1;

module.exports = {
  req1: {
    method: "GET",
    url: `http://localhost:3000/reviews/?product_id=${
      Math.floor(Math.random() * max) + min
    }`,
  },
  req2: {
    method: "GET",
    url: `http://localhost:3000/reviews/meta/?product_id=${
      Math.floor(Math.random() * max) + min
    }`,
  },
  req3: {
    method: "POST",
    url: "http://localhost:3000/reviews",
    body: JSON.stringify({
      product_id: `${Math.floor(Math.random() * max) + min}`,
      rating: "1",
      summary: "TESTING",
      body: "this is a furthur test",
      recommend: "true",
      name: "BLAKE THIS IS IN K6",
      email: "email",
      photos: [{ url: "urlhere" }, { url: "second url here" }],
      characteristics: { 219370: 5, 219371: 5 },
    }),
    params: {
      headers: { "Content-Type": "application/json" },
    },
  },
  req4: {
    method: "PUT",
    url: `http://localhost:3000/reviews/${
      Math.floor(Math.random() * max) + min
    }/helpful`,
  },
  req5: {
    method: "PUT",
    url: `http://localhost:3000/reviews/${
      Math.floor(Math.random() * max) + min
    }/report`,
  },
};
