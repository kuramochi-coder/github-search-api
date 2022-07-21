# GitHub-Search-API

This is a search app calling on GitHub's search API.

## Installation & Start-Up

1. Use the node package manager [npm](https://www.npmjs.com/) to install the required packages and start the application.
2. Update GitHub personal access token in your own .env file with the variable PERSONAL_ACCESS_TOKEN_GITHUB

```bash
npm ci
npm start
```

Application will be running on http://localhost:8080

## Main Page Features

1. Select category for search
2. Type into the search bar or press enter on keyboard or click on search to start searching.
3. Autocomplete search results will display below the search bar as you type but this is subject to the rate limiter of GitHub API.

![Main Page Layout](/assets/image/home-page.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)
