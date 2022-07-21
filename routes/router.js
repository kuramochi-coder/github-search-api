const express = require("express");
const appRouter = express.Router();
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const accessToken = process.env.PERSONAL_ACCESS_TOKEN_GITHUB;
const gitHubBaseUrl = "https://api.github.com";

const axiosClient = axios.create({
  baseURL: gitHubBaseUrl,
  headers: {
    Accept: "application/vnd.github+json",
    Authorization: `token ${accessToken}`,
  },
});

function APIClientFactory({ method }) {
  return async function client(path, options) {
    return axiosClient
      .request({
        ...options,
        method: method,
        url: path,
        headers: {
          ...options?.headers,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        return err.response.data;
      });
  };
}

function githubSearchApiClient() {
  return {
    get: APIClientFactory({ method: "GET" }),
    post: APIClientFactory({ method: "POST" }),
    patch: APIClientFactory({ method: "PATCH" }),
    put: APIClientFactory({ method: "PUT" }),
    delete: APIClientFactory({ method: "DELETE" }),
  };
}

// Home page
appRouter.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, `../index.html`));
});

// GitHub API for /search/code
appRouter.get("/api/search/code/:searchText", (req, res) => {
  // /search/users
  try {
    let searchText = req.params.searchText;

    axiosClient.get(`/search/code?q=${searchText}`).then((result) => {
      res.send(result.data);
    });
  } catch (error) {
    console.log(error);
  }
});

// GitHub API for /search/commits
appRouter.get("/api/search/commits/:searchText", (req, res) => {
  // /search/users
  try {
    let searchText = req.params.searchText;

    axiosClient.get(`/search/commits?q=${searchText}`).then((result) => {
      res.send(result.data);
    });
  } catch (error) {
    console.log(error);
  }
});

// GitHub API for /search/issues
appRouter.get("/api/search/issues/:searchText", (req, res) => {
  // /search/users
  try {
    let searchText = req.params.searchText;

    axiosClient.get(`/search/issues?q=${searchText}`).then((result) => {
      res.send(result.data);
    });
  } catch (error) {
    console.log(error);
  }
});

// GitHub API for /search/labels
appRouter.get("/api/search/labels/:searchText", (req, res) => {
  // /search/users
  try {
    let searchText = req.params.searchText;

    axiosClient.get(`/search/labels?q=${searchText}`).then((result) => {
      res.send(result.data);
    });
  } catch (error) {
    console.log(error);
  }
});

// GitHub API for /search/repositories
appRouter.get("/api/search/repositories/:searchText", (req, res) => {
  // /search/users
  try {
    let searchText = req.params.searchText;

    axiosClient.get(`/search/repositories?q=${searchText}`).then((result) => {
      res.send(result.data);
    });
  } catch (error) {
    console.log(error);
  }
});

// GitHub API for /search/topics
appRouter.get("/api/search/topics/:searchText", (req, res) => {
  // /search/users
  try {
    let searchText = req.params.searchText;

    axiosClient.get(`/search/topics?q=${searchText}`).then((result) => {
      res.send(result.data);
    });
  } catch (error) {
    console.log(error);
  }
});

// GitHub API for /search/users
appRouter.get("/api/search/users/:searchText", (req, res) => {
  // /search/users
  try {
    let searchText = req.params.searchText;

    axiosClient.get(`/search/users?q=${searchText}`).then((result) => {
      res.send(result.data);
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = appRouter;
