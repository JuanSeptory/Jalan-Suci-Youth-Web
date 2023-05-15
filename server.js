/*

 Cari Cara agar bisa pisahkan menu halaman Admin dan View User
 Bikin Form lOGIN untuk Admin
 Inputan TANGGAL masih salah
 Responsive Layar

*/

const express = require('express');
const mysql = require('mysql');
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'src/script/Admin/');

// app.set('view engine', 'ejs');
// app.set('UserView', 'src/script/View/');

app.use('/img', express.static(__dirname + '/public/img'));
app.use('/style', express.static(__dirname + '/public/style'));

const db = mysql.createConnection({
  host: 'localhost',
  database: 'GPIJALANSUCI',
  user: 'root',
  password: '',
});

// VIEW USER
app.get('/', (req, res) => {
  res.render('home');
});

// Renungan.ejs
app.get('/Renungan', (req, res) => {
  const sql = 'SELECT * FROM renungan';
  db.query(sql, (err, result) => {
    const users = JSON.parse(JSON.stringify(result));
    res.render('Renungan', { users: users });
  });
});

// Info Ibadah.ejs
app.get('/InfoIbadah', (req, res) => {
  // cari cara agar bisa menggunakan LIKE AND
  const sql = `SELECT * FROM infoibadah`;
  db.query(sql, (err, result) => {
    const users = JSON.parse(JSON.stringify(result));
    res.render('InfoIbadah', { users: users });
  });
});

// Kontak.ejs
app.get('/Kontak', (req, res) => {
  res.render('Kontak');
});

// PATH BACK-END
db.connect((err) => {
  if (err) throw err;

  // GET Data Info Ibadah
  app.get('/DataInfoIbadah', (req, res) => {
    const sql = 'SELECT * FROM InfoIbadah';
    db.query(sql, (err, result) => {
      const InfoIbadah = JSON.parse(JSON.stringify(result));
      console.log(InfoIbadah);
      res.render('DataInfoIbadah', { InfoIbadah: InfoIbadah });
    });
  });

  // GET DATA PEMUDA
  app.get('/DataPemuda', (req, res) => {
    const sql = 'SELECT * FROM pemuda';
    db.query(sql, (err, result) => {
      const pemuda = JSON.parse(JSON.stringify(result));
      res.render('DataPemuda', { pemuda: pemuda });
    });
  });

  // GET DATA RENUNGAN
  app.get('/DataRenungan', (req, res) => {
    const sql = 'SELECT * FROM renungan';
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render('DataRenungan', { users: users });
    });
  });

  // GET INPUT RENUNGAN
  app.get('/inputRenungan', (req, res) => {
    res.render('inputRenungan');
  });

  // GET INPUT INFORMASI IBADAH
  app.get('/InputInfoIbadah', (req, res) => {
    res.render('InputInfoIbadah');
  });

  // GET INPUT DATA PEMUDA
  app.get('/InputDataPemuda', (req, res) => {
    res.render('InputDataPemuda');
  });

  // POST INPUT RENUNGAN
  app.post('/inputRenungan', (req, res) => {
    const insertSql = `INSERT INTO renungan (id_renungan, judul_renungan, isi_renungan) VALUES ('', '${req.body.postTitle}', '${req.body.postIsi}');`;
    db.query(insertSql.replace(/<\/?[^>]+(>|$)/g, ''));
    if (err) throw err;
    res.redirect('/DataRenungan');
  });

  // POST INPUT INFORMASI IBADAH
  app.post('/InputInfoIbadah', (req, res) => {
    const insertSql2 = `INSERT INTO infoibadah (id_ibadah, jenis_ibadah, tanggal_ibadah, lokasi) VALUES ('', '${req.body.JudulIbadah}', '${req.body.TanggalIbadah}', '${req.body.Lokasi}');`;
    db.query(insertSql2);
    if (err) throw err;
    res.redirect('/DataInfoIbadah');
  });

  // POST INPUT DATA PEMUDA
  app.post('/InputDataPemuda', (req, res) => {
    const Insert = `INSERT INTO pemuda (id_pemuda, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat) VALUES ('', '${req.body.NamaLengkap}', '${req.body.TempatLahir}', '${req.body.TanggalLahir}', '${req.body.JenisKelamin}', '${req.body.Alamat}')`;
    db.query(Insert);
    if (err) throw err;
    res.redirect('/DataPemuda');
  });
});

app.listen(8000, () => {
  console.log('Server Ready....');
});
