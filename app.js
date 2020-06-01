require('dotenv').config(); // customize .env file
const fs = require("fs");
const puppeteer = require("puppeteer");

/*
DONE:
1. Init output dir
2a. Take input (login, pwd, target), single (environmental)
TODO:
3. Access Web Page
4. Login?
5. Scrape
6. Pagination
7a. Save to CSV
LATER:
2b. Take input username, multiple (from file)
7b. Save to multiple CSV's
*/

console.log("\x1b[35m%s\x1b[0m", "Running 'darts-scraper'...");

// Constants
const OUTPUT_DIR = "game_history";
// const LOGIN = process.env.LOGIN;
// const PWD = process.env.PWD;


// Initialize output directory
if(!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
    console.log("\x1b[32m%s\x1b[0m", `Output directory '${OUTPUT_DIR}' created!`)
}

const getURL = (username, page=1) => `https://lidarts.org/@/${username}/game_history?page=${page}`;

const target_url = getURL(process.env.TARGET);
console.log(target_url)