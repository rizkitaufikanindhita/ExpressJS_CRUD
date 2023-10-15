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

app.get("/", (req, res) => {
  const sql = "select * from mahasiswa";
  db.query(sql, (err, result) => {
    response(200, result, "Get data from db", res);
  });
});

app.get("/find", (req, res) => {
  console.log("find nim : ", req.query.nim);

  const sql = `select nama from mahasiswa where nim = ${req.query.nim}`;
  db.query(sql, (err, result) => {
    response(200, result, "Get data from db", res);
  });
});

app.post("/login", (req, res) => {
  console.log({ requestFromOutside: req.body });
  const user = req.body.username;
  console.log(user);
  res.send("Login Berhasil");
});

app.put("/user", (req, res) => {
  console.log({ updateData: req.body });
  res.send("User berhasil diupdate");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
