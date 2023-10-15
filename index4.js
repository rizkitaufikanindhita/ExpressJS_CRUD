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
  // res.send("mantap");
  // res.json("OK");
  // res.send(404, "mantap error");
  // res.json(404, "mantap error");
  // res.send(200);
  // res.send(500);
  // res.send(404);
  response(200, "API V1 Reafy To Go", "Succes", res);
});

// const pangkatDua = (req, res) => {
//   const num = parseInt(req.query.num);
//   res.send(`Hasil pangkat duanya : ${num * num}`);
// };
// app.get("/pangkat", pangkatDua);

app.get("/mahasiswa", (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "Get data from db", res);
  });
});

app.get("/mahasiswa/:nim", (req, res) => {
  const nomer = req.params.nim;
  const sql = `SELECT nama FROM mahasiswa WHERE nim = ${nomer}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    response(200, result, "Get data from db", res);
  });
});

app.post("/mahasiswa", (req, res) => {
  const { nim, nama, alamat, prodi } = req.body;
  const sql = `INSERT INTO mahasiswa (nim, nama, alamat, prodi) VALUES (${nim}, '${nama}', '${alamat}', '${prodi}')`;
  db.query(sql, (err, result) => {
    if (err) response(500, err, "Error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "Add data to db", res);
    }
  });
});

app.put("/mahasiswa", (req, res) => {
  const { nim, nama, alamat, prodi } = req.body;
  const sql = `UPDATE mahasiswa SET nama = '${nama}', alamat = '${alamat}', prodi = '${prodi}' WHERE nim = ${nim}`;
  db.query(sql, (err, result) => {
    if (err) response(500, err, "Error", res);
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        pesan: result.message,
      };
      response(200, data, "Update data from db", res);
    } else {
      response(404, "nim tidak terdaftar", "Error", res);
    }
  });
});

app.delete("/mahasiswa", (req, res) => {
  const { nim } = req.body;
  const sql = `DELETE FROM mahasiswa WHERE nim = ${nim}`;
  db.query(sql, (err, result) => {
    if (err) response(500, err, "Error", res);
    if (result?.affectedRows) {
      const data = {
        isDeleted: result.affectedRows,
        pesan: "data berhasil dihapus",
      };
      response(200, data, "Delete data from db", res);
    } else {
      response(404, "nim tidak terdaftar", "Error", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
