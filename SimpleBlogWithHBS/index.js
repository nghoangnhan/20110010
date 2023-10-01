const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 5000;

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", routes);
app.listen(PORT);
