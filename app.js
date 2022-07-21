const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");
const axios = require("axios");

const app = express();
app.use(express.json());

app.use(express.static("scripts"));
app.use("/data", express.static("data"));
app.use("/css", express.static("css"));

// Routes
const appRouter = require("./routes/router");
app.use("/", appRouter);

app.listen(8080, () => console.log("listening on port 8080"));
