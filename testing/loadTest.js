import http from "k6/http";
import { sleep, check } from "k6";
import { req1, req2, req3, req4, req5 } from "./batchTests.js";

export const options = {
  stages: [
    { duration: "10s", target: 400 },
    { duration: "1m", target: 1000 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<50"],
  },
  // insecureSkipTLSVerify: true,
  // noConnectionReuse: false,
  // stages: [
  //   { duration: "2m", target: 100 },
  //   { duration: "5m", target: 100 },
  //   { duration: "2m", target: 500 },
  //   { duration: "5m", target: 500 },
  //   { duration: "2m", target: 1000 },
  //   { duration: "5m", target: 1000 },
  //   { duration: "10m", target: 0 },
  // ],
  // thresholds: {
  //   http_req_duration: ["p(95)<50"],
  // },
};

export default function () {
  http.batch([req1, req2, req3, req4, req5]);
  sleep(1);
}
