const express = require("express");
const app = express();
const PORT = 5000;

const friendRoutes = require("./routes/friendRoutes.js");

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", friendRoutes);

app.listen(PORT);
