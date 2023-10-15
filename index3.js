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
  res.send("utama");
});

app.get("/mahasiswa", (req, res) => {
  res.send("list mahasiswa");
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nomer = req.params.nim;
  // res.send(`mahasiswa dengan nim : ${nomer}`);
  const sql = `select nama from mahasiswa where nim = ${nomer}`;
  db.query(sql, (err, result) => {
    res.send(result[0]["nama"]);
  });
});

app.post("/login", (req, res) => {});

app.put("/user", (req, res) => {});

app.delete("/user", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
