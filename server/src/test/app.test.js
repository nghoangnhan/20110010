const app = require("../app.js");
const request = require("supertest")(app);

// Test get all planets
request
  .get("/planets/")
  .expect(200)
  .expect("Content-Type", "application/json; charset=utf-8")
  .end(function (err, res) {
    if (err) throw err;
  });

// Test get all launches
request
  .get("/launches/")
  .expect(200)
  .expect("Content-Type", "application/json; charset=utf-8")
  .end(function (err, res) {
    if (err) throw err;
  });

// Test add new launch
request
  .post("/launches/")
  .send({
    mission: "test launch",
    rocket: "test rocket",
    launchDate: "2035-01-01",
    target: "test target",
  })
  .expect(201)
  .expect("Content-Type", "application/json; charset=utf-8")
  .end(function (err, res) {
    if (err) throw err;
  });

// Test add new launche but missing fields (missing target)
request
  .post("/launches/")
  .send({
    mission: "test launch",
    rocket: "test rocket",
    launchDate: "2035-01-01",
  })
  .expect(400)
  .expect("Content-Type", "application/json; charset=utf-8")
  .end(function (err, res) {
    if (err) throw err;
  });

// Test delete a launch
request
  .delete("/launches/100")
  .expect(200)
  .expect("Content-Type", "application/json; charset=utf-8")
  .end(function (err, res) {
    if (err) throw err;
  });
