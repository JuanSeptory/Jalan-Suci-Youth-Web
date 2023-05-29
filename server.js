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

  // GET UPDATE DATA PEMUDA
  app.get('/UpdateDataPemuda/:id_pemuda', (req, res) => {
    res.render('UpdateDataPemuda', { id_pemuda: req.params.id_pemuda });
  });

  // GET UPDATE DATA IBADAH
  app.get('/UpdateDataIbadah/:id_ibadah', (req, res) => {
    res.render('UpdateDataIbadah', { id_ibadah: req.params.id_ibadah });
  });

  //  GET UPDATE ARTIKEL RENUNGAN
  app.get('/EditArtikelRenungan/:id_renungan', (req, res) => {
    res.render('EditArtikelRenungan', { id_renungan: req.params.id_renungan });
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

  // GET BY ID ARTIKEL RENUNGAN
  app.get('/ArtikelRenungan/:id_renungan', (req, res) => {
    const id_renungan = req.params.id_renungan;
    const Artikel = `SELECT * FROM renungan WHERE id_renungan = ${id_renungan}`;
    db.query(Artikel, (err, result) => {
      const getArtikel = JSON.parse(JSON.stringify(result));
      // console.log(getArtikel);
      res.render('ArtikelRenungan', { getArtikel: getArtikel });
    });
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
    const Insert = `INSERT INTO pemuda (id_pemuda, nama_lengkap, tempat_lahir, tanggal_lahir, JenisKelamin, alamat) VALUES ('', '${req.body.NamaLengkap}', '${req.body.TempatLahir}', '${req.body.TanggalLahir}', '${req.body.JenisKelamin}', '${req.body.Alamat}')`;
    db.query(Insert);
    if (err) throw err;
    res.redirect('/DataPemuda');
  });

  // PUT DATA PEMUDA
  app.post('/UpdateDataPemuda/:id_pemuda', (req, res) => {
    const id_pemuda = req.params.id_pemuda;
    // const newData = req.body;
    const Put = `UPDATE pemuda SET nama_lengkap = '${req.body.NamaLengkap}', tempat_lahir = '${req.body.TempatLahir}', tanggal_lahir = '${req.body.TanggalLahir}', jenis_kelamin = '${req.body.JenisKelamin}', alamat = '${req.body.Alamat}' WHERE id_pemuda = ${id_pemuda}`;
    db.query(Put, function (err, result) {
      if (err) throw err;
      // console.log(req.body.id_pemuda_params);
      // console.log(req.query);
      // console.log(err);
      res.redirect('/DataPemuda');
    });
  });

  // PUT DATA IBADAH
  app.post('/UpdateDataIbadah/:id_ibadah', (req, res) => {
    const id_ibadah = req.params.id_ibadah;
    const update = `UPDATE infoibadah SET jenis_ibadah = '${req.body.JudulIbadah}', tanggal_ibadah = '${req.body.TanggalIbadah}', lokasi = '${req.body.Lokasi}' WHERE id_ibadah = '${id_ibadah}'`;
    db.query(update, function (err, result) {
      if (err) throw err;
      res.redirect('/DataInfoIbadah');
    });
  });
});

// PUT EDIT ARTIKEL RENUNGAN
app.post('/EditArtikelRenungan/:id_renungan', (req, res) => {
  const id_renungan = req.params.id_renungan;
  const update = `UPDATE renungan SET judul_renungan = '${req.body.JudulRenungan}', isi_renungan = '${req.body.IsiRenungan}' WHERE id_renungan = '${id_renungan}'`;
  db.query(update, function (err, result) {
    if (err) throw err;
    res.redirect('/DataRenungan');
  });
});

// DELETE DATA PEMUDA
app.get('/HapusDataPemuda/:id_pemuda', (req, res) => {
  const id_pemuda = req.params.id_pemuda;
  const del = `DELETE FROM pemuda WHERE id_pemuda = ${id_pemuda}`;
  db.query(del, function (err, result) {
    if (err) throw err;
    res.redirect('/DataPemuda');
  });
});

// DELETE ARTIKEL RENUNGAN
app.get('/HapusArtikelRenungan/:id_renungan', (req, res) => {
  const id_renungan = req.params.id_renungan;
  const del = `DELETE FROM renungan WHERE id_renungan = ${id_renungan}`;
  db.query(del, function (err, result) {
    if (err) throw err;
    res.redirect('/DataRenungan');
  });
});

// DELETE INFO IBADAH
app.get('/HapusDaftarIbadah/:id_ibadah', (req, res) => {
  const id_ibadah = req.params.id_ibadah;
  const del = `DELETE FROM infoibadah WHERE id_ibadah = ${id_ibadah}`;
  db.query(del, function (err, result) {
    if (err) throw err;
    res.redirect('/DataInfoIbadah');
  });
});

app.listen(8000, () => {
  console.log('Server Ready....');
});
