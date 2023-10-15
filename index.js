const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const db = require("./connection");
const response = require("./response");

// pov user
// method get dapat diakses dibrowser, nampilin data
// method post tidak dapat diakses dibrowser, mengirim data ke sistem
// method put tidak dapat diakses dibrowser, mengupdate data ke sistem
// method delete tidak dapat diakses dibrowser, menghapus data di sistem

app.use(bodyParser.json());

// middleware
const middleware = (req, res, next) => {
  if (req.query.via == "admin" || req.path == "/users") {
    next();
  } else {
    response(403, "You are not admin", "Error", res);
  }
};

app.use(middleware);

app.get("/", (req, res) => {
  response(200, "API V1 Ready To Go", "Succes", res);
});

app.get("/controlpanel", (req, res) => {
  response(200, "Control Panel Page", "Succes", res);
});

app.get("/users", (req, res) => {
  response(200, "Users Page", "Succes", res);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
