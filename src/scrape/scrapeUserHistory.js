const { MODE, HISTORY_XPath } = require("../../config");
const Logger = require("../utils/logger");


const getURL = (username, pageNumber=1) => `https://lidarts.org/@/${username}/game_history?page=${pageNumber}`;

const getNextPage = async (page) => {
    const [paginationNav] = await page.$x(HISTORY_XPath.pagination);

    const nextPage = await paginationNav.evaluate(nav => {
        let next = null;

        [...nav.children].some(item => {
            const link = item.querySelector("a.page-link");
            const aria = link.getAttribute("aria-label");

            if(aria === "Next"){
                next = link.href;
                return true;
            }
            return false;
        });

        return next;
    });

    return nextPage;
};

const scrapeGames = async (page) => {
    const [history_list] = await page.$x(HISTORY_XPath.list);
    const games = await history_list.evaluate(el => {
        const cards = [...el.children].filter(child => child.nodeName === "A");
        const games = cards.map(card => ({
            url: card.href,
            result: card.querySelector("h3").innerText,
            mode: card.querySelector("h5").innerText,
            date: card.querySelector("h6").innerText
        }));

        return games;
    });

    return games;
};

const paginate = async (page, nextPage, history) => {
    Logger.debug(`GOING TO ===> ${nextPage}`);
    await page.goto(nextPage, {waitUntil: 'networkidle2'});

    const data = await scrapeGames(page);
    history.push(...data);
    Logger.debug(`Found ${data.length} games at '${nextPage}'`);

    nextPage = await getNextPage(page);

    return nextPage ? await paginate(page, nextPage, history) : history;
};

// Get user history
const scrapeUserHistory = async (page, user) => {
    const initialHistory = [];

    let nextPage = getURL(user);
    
    // Paginate and Scrape data
    const history = await paginate(page, nextPage, initialHistory);

    return history;
};

module.exports = scrapeUserHistory;


