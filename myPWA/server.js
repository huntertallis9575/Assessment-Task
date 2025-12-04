const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("./.database/datasource.db");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/anime/:id", (req, res) => {
  const animeID = req.params.id;

  db.get("SELECT * FROM extension WHERE extID = ?", [animeID], (err, row) => {
    if (err) {
      res.status(500).send("Database error");
      return;
    }
    if (!row) {
      res.status(404).send("Anime not found");
      return;
    }

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${row.name}</title>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
          <nav>
              <a href="/">⬅ Back</a>
          </nav>

          <main class="detail-page">
            <h1>${row.name}</h1>
            <img src="${row.image}" width="300">
            <h3>Power System</h3>
            <p>${row.power_systems}</p>

            <h3>About</h3>
            <p>${row.about}</p>
          </main>
        </body>
        </html>
      `);
  });
});

app.listen(8000, () => console.log("Server running on http://localhost:8000"));
