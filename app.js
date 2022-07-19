const express = require("express");
const path = require("path");
const { fileURLToPath } = require("url");
const axios = require("axios");

const app = express();
app.use(express.json());

app.use(express.static("scripts"));
app.use("/data", express.static("data"));
app.use("/css", express.static("css"));

const accessToken = "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";

const gitHubBaseUrl = "https://api.github.com";

app.get("/api/search/:searchText", (req, res) => {
  // /search/users
  try {
    let searchText = req.params.searchText;
    console.log("searchText", searchText)
    axios
      .get(`${gitHubBaseUrl}/search/users?q=${searchText}`, {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${accessToken}`,
        },
      })
      .then((result) => {
        console.log("entire result", result)
        console.log("result.data",result.data);
        res.send(result.data);
      });

    // res.send('GET request to the homepage')

    // res.send(results);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/users", (req, res) => {
  res.send("GET request to the homepage");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, `./index.html`));
});

app.listen(8080, () => console.log("listening on port 8080"));
