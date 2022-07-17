const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");

const app = express();
app.use(express.json()); 

app.use(express.static('scripts'));
app.use('/data', express.static('data'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, `./index.html`));
});

app.listen(8080, () => console.log("listening on port 8080"));
