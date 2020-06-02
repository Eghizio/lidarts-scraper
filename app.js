require('dotenv').config(); // customize .env file
const fs = require("fs");
const puppeteer = require("puppeteer");
const config = require("./config");
const { logIn, scrapeUserHistory } = require("./src/scrape");
const { getUsers, initOutputDirectory, saveUserHistory } = require("./src/io");

/*
DONE:
1. Init output dir
2a. Take input (login, pwd, target), single (environmental)
2b. Take input username, multiple (from file)
3. Access Web Page
4. Login
5a. Scrape one
6. Pagination
7a. Save to CSV
TODO:
5a. Scrape multiple
8. Error handling
LATER:
7b. Save to multiple CSV's
FUTURE:
- Scrape details from game url
*/


console.log("\x1b[35m%s\x1b[0m", "Running 'darts-scraper'...");
const { INPUT_DIR, OUTPUT_DIR, MODE } = config;


// Main
(async () => {
    // Get users to scrape
    const users = getUsers(INPUT_DIR);
    if(users && users.length===0) return;
    console.log("\x1b[32m%s\x1b[0m", `Scraping for ${users.length} user${users.length>1 ? "s": ""}...`);

    // Init puppeteer
    const browser = await puppeteer.launch({headless: MODE.toLowerCase()!=="dev"});
    const page = await browser.newPage();

    // Log in
    await logIn(page, process.env.LOGIN, process.env.PWD); // evaluate console logs the login and pwd, handle.type(credentials)

    // Scrape users data
    const usersData = [];
    users.forEach(async user => {
        const userHistory = await scrapeUserHistory(page, user);
        const history = await Promise.all(userHistory);
        // userHistory.reverse(); // chronological date
        usersData.push({ user: user, history: history });
    });

    // Save history
    initOutputDirectory(OUTPUT_DIR);
    usersData.forEach(userData => {
        saveUserHistory(userData, OUTPUT_DIR);
    });
    
    // await browser.close();
})();
