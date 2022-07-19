const search = document.getElementById("search");
const resultsList = document.getElementById("results-list");
const form = document.getElementById("form");
const container = document.getElementById("progress-container");
const select = document.getElementById("select");
let optionSelected = "Code";
const gitHubBaseUrl = "https://api.github.com";
const accessToken = "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";
let apiSelected;

const SearchOptions = {
  CODE: "Code",
  COMMITS: "Commits",
  ISSUES: "Issues",
  LABELS: "Labels",
  REPOSITORIES: "Repositories",
  TOPICS: "Topics",
  USERS: "Users",
};

const SearchApi = {
  CODE: `/search/code`,
  COMMITS: `/search/commits`,
  ISSUES: `/search/issues`,
  LABELS: `/search/labels`,
  REPOSITORIES: `/search/repositories`,
  TOPICS: `/search/topics`,
  USERS: `/search/users`,
};

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
          Authorization: `token ${accessToken}`,
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

// Search GitHub using the search api.
const searchGithub = async (searchText) => {
  try {
    switch (optionSelected) {
      case SearchOptions.CODE:
        apiSelected = SearchApi.CODE;
        break;

      case SearchOptions.COMMITS:
        apiSelected = SearchApi.COMMITS;
        break;

      case SearchOptions.ISSUES:
        apiSelected = SearchApi.ISSUES;
        break;

      case SearchOptions.LABELS:
        apiSelected = SearchApi.LABELS;
        break;

      case SearchOptions.REPOSITORIES:
        apiSelected = SearchApi.REPOSITORIES;
        break;

      case SearchOptions.TOPICS:
        apiSelected = SearchApi.TOPICS;
        break;

      case SearchOptions.USERS:
        apiSelected = SearchApi.USERS;
        break;
      default:
        break;
    }

    let matches;
    if (searchText.length > 0) {
      container.classList.add("progress");
      const res = await axiosClient.get(`${apiSelected}?q=${searchText}`);

      const searchResults = res.data.items;

      // Get matches to the text input.
      matches = searchResults.filter((result) => {
        const regex = new RegExp(`^${searchText}`, "gi");

        switch (optionSelected) {
          case SearchOptions.COMMITS:
            return result.commit.message.match(regex);

          case SearchOptions.ISSUES:
            return result.title.match(regex);

          case SearchOptions.TOPICS:
            return result.description.match(regex);

          case SearchOptions.USERS:
            return result.login.match(regex);
          default:
            return result.name.match(regex);
        }
      });

      outputHtml(matches);
      container.classList.remove("progress");
    } else {
      matches = [];
      resultsList.innerHTML = "";
    }
  } catch (err) {
    console.log(err);
  }
};

// Show results in html.
const outputHtml = (matches) => {
  let html;
  if (matches.length > 0) {
    switch (optionSelected) {
      case SearchOptions.CODE:
        html = matches
          .map(
            (match) =>
              `<div class="card card-body mb-1"> 
                <h4>${match.name} (${match.sha})</h4>
                <a target="_blank" href="${match.html_url}">${match.html_url}</a>
              </div>`
          )
          .join("");
        break;

      case SearchOptions.COMMITS:
        html = matches
          .map(
            (match) =>
              `<div class="card card-body mb-1"> 
                    <h4>${match.commit.message} (${match.commit.author.name})</h4>
                    <a target="_blank" href="${match.html_url}">${match.html_url}</a>
                  </div>`
          )
          .join("");
        break;

      case SearchOptions.ISSUES:
        html = matches
          .map(
            (match) =>
              `<div class="card card-body mb-1"> 
                      <h4>${match.title} (${match.id})</h4>
                      <a target="_blank" href="${match.html_url}">${match.html_url}</a>
                    </div>`
          )
          .join("");
        break;

      case SearchOptions.TOPICS:
        html = matches
          .map(
            (match) =>
              `<div class="card card-body mb-1"> 
                    <h4>${match.description} (${match.name})</h4>
                  </div>`
          )
          .join("");
        break;

      case SearchOptions.USERS:
        html = matches
          .map(
            (match) =>
              `<div class="card card-body mb-1"> 
                      <h4>${match.login} (${match.id})</h4>
                      <a target="_blank" href="${match.html_url}">${match.html_url}</a>
                    </div>`
          )
          .join("");
        break;
      default:
        html = matches
          .map(
            (match) =>
              `<div class="card card-body mb-1"> 
                  <h4>${match.name} (${match.id})</h4>
                  <a target="_blank" href="${match.html_url}">${match.html_url}</a>
                </div>`
          )
          .join("");
        break;
    }

    resultsList.innerHTML = html;
  }
};

search.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchGithub(search.value);
  }
});

select.addEventListener("input", () => {
  optionSelected = select.value;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchGithub(search.value);
});
