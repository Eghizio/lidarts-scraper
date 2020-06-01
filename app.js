require('dotenv').config(); // customize .env file
const fs = require("fs");
const puppeteer = require("puppeteer");
const config = require("./config");
const logIn = require("./src/login");
const scrapeUserHistory = require("./src/scrapeUserHistory");

/*
DONE:
1. Init output dir
2a. Take input (login, pwd, target), single (environmental)
3. Access Web Page
4. Login
TODO:
5. Scrape
6. Pagination
7a. Save to CSV
8. Error handling
LATER:
2b. Take input username, multiple (from file)
7b. Save to multiple CSV's
FUTURE:
- Scrape details from game url
*/

console.log("\x1b[35m%s\x1b[0m", "Running 'darts-scraper'...");
const { OUTPUT_DIR } = config;

// Initialize output directory
if(!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR);
    console.log("\x1b[32m%s\x1b[0m", `Output directory '${OUTPUT_DIR}' created!`)
}


// Main
(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await logIn(page, process.env.LOGIN, process.env.PWD);
    const userHistory = await scrapeUserHistory(page, process.env.TARGET);
    console.log(userHistory)
    await browser.close();
})();

// const text = await page.evaluate(() => {
//     const anchor = document.querySelector('#mw-content-text');
//     return anchor.textContent;
// });
// console.log(text);