# Darts Scraper

Scraper for [lidarts.org](https://lidarts.org) data to CSV. Requested by my [friend](https://lidarts.org/@/doman100).

## Installation
>`npm install`
## Run:
>`npm start`

or

>`node app.js`

## Configuration
Create [`.env`](https://github.com/motdotla/dotenv) file and provide *Your [lidarts.org](https://lidarts.org/) credentials* as well as the *input file*.
+ LOGIN
+ PWD
+ TARGET

In order to customize the appliction, edit [`config.js`](https://github.com/Eghizio/lidarts-scraper/blob/master/config.js). You can customize the *selectors* if they change in the future.
+ INPUT_DIR
+ OUTPUT_DIR
+ MODE
+ LOGIN_PAGE
+ LOGIN_XPath
+ HISTORY_XPath
## License
This project was created by [Jakub "Eghizio" Wąsik](https://github.com/Eghizio) and is open source software licensed as MIT.
