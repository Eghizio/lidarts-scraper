# Darts Scraper

Scraper for [lidarts.org](https://lidarts.org) data to CSV. Requested by my [friend](https://lidarts.org/@/doman100).

Web scraper for gathering users game history into CSV format files using: `node.js`, `dotenv` and `puppeteer`.

## Installation
>`npm install`

## Setup
Create [`.env`](https://github.com/motdotla/dotenv) file and provide *Your [lidarts.org](https://lidarts.org/) credentials* as well as the *input file* and *mode*. For defaults see [__Configuration__](https://github.com/Eghizio/lidarts-scraper/blob/master/README.md#configuration) below.
```python
# .env

# Credentials - required
LOGIN = "Username"
PWD = "Password"
# Input
INPUT_FILE = "input.txt"
# Mode
MODE = "production"
```

### Credentials
Your [lidarts.org](https://lidarts.org/) **credentials**. **[.env](https://github.com/motdotla/dotenv)** is a local environmental file.

### Input
Path to **input file** containing names of users. Usernames must be seperated by 
comma. Any excessive spaces are trimmed.
```python
# input.txt
doman100, Eghizio
```

### Mode
Any *string* starting with `dev` will enable development mode with debug logs and disabling headless mode. **Mode** is case insensitive.

## Run:

### Run with [`npm`](https://docs.npmjs.com/cli/run-script):
>`npm start`

### Run with `node.js`:
>`node app.js`

### Run with environmental variables:
>`env LOGIN=Username PWD=Password INPUT_FILE=input.txt node app.js`

## Configuration
In order to customize the appliction, edit [`config.js`](https://github.com/Eghizio/lidarts-scraper/blob/master/config.js). You can customize the *selectors* if they change in the future.
+ INPUT_DIR
+ OUTPUT_DIR
+ MODE
+ *LOGIN_PAGE*
+ *LOGIN_XPath*
+ *HISTORY_XPath*

### Default configuration
```js
// config.js
const INPUT_DIR = process.env.INPUT_FILE || "input.txt";
const OUTPUT_DIR = "game_history";
const MODE = process.env.MODE || "production";
```

## License
This project was created by [Jakub "Eghizio" Wąsik](https://github.com/Eghizio) and is open source software licensed as MIT.
