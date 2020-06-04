const fs = require("fs");
const puppeteer = require("puppeteer");
const config = require("./config");
const Logger = require("./src/utils/logger");
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
5a. Scrape multiple
6. Pagination
7a. Save to CSV
7b. Save to multiple CSV's
TODO:
8. Skipping users with 0 games
9. Proper error handling
10. Input validation
11. Handling non existing users
FUTURE:
- Scrape only new
- Scrape details from game url
*/


Logger.info("Running 'darts-scraper'...");
const { INPUT_DIR, OUTPUT_DIR, MODE } = config;

// Main
(async () => {
    // Get users to scrape
    const users = getUsers(INPUT_DIR);
    if(users && users.length===0) return;
    Logger.success(`Scraping for ${users.length} user${users.length>1 ? "s": ""}...`);

    // Init puppeteer
    const browser = await puppeteer.launch({headless: !MODE.toLowerCase().startsWith("dev")});
    process.on('unhandledRejection', (reason, promise) => {
        Logger.error('Unhandled Rejection at: Promise', promise, 'reason:', reason);
        browser.close();
    });
    const page = await browser.newPage();

    // Log in
    await logIn(page, process.env.LOGIN, process.env.PWD); // evaluate console logs the login and pwd, handle.type(credentials)

    // Scrape users data
    const usersData = await Promise.all(users.map(async user => {
        const page = await browser.newPage();
        const history = await scrapeUserHistory(page, user);
        // history.reverse(); // chronological date, FUTURE: may just remove it so it can pick first saved as latest in order to fetch only new ones
        Logger.info(`Found ${history.length} games for user '${user}'`);
        
        return { user: user, history: history };
    }));
    
    // Save history
    initOutputDirectory(OUTPUT_DIR);
    usersData.forEach(userData => {
        saveUserHistory(userData, OUTPUT_DIR);
    });
    
    await browser.close();
})();
