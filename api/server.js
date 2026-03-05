const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./app.db");




 db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS login (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    INSERT OR IGNORE INTO login (username, password)
    VALUES
      ('Ritwick', 'Aarambh'),
      ('Sonal', 'Aarambh')
  `);

});
// Create table (runs once; safe to keep)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER
    )
  `);
});
app.post("/login", (req, res) => {

  const { username, password } = req.body;

  db.get(
    "SELECT * FROM login WHERE username=? AND password=?",
    [username, password],
    (err, row) => {

      if (row) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }

    }
  );

});
// Read all
app.get("/patients", (req, res) => {
  db.all("SELECT * FROM patients ORDER BY id DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create
app.post("/patients", (req, res) => {
  const { name, age } = req.body;
  db.run(
    "INSERT INTO patients(name, age) VALUES(?, ?)",
    [name, age ?? null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, age });
    }
  );
});

app.listen(4000, () => console.log("API running on http://localhost:4000"));