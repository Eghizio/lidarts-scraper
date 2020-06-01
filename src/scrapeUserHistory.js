
const getURL = (username, page=1) => `https://lidarts.org/@/${username}/game_history?page=${page}`;



/*
Parent
/html/body/div/div/div/div/div

Container 1
/html/body/div/div/div/div/div/a[1]

User score:score User
/html/body/div/div/div/div/div/a[1]/div/div/h3
Mode
/html/body/div/div/div/div/div/a[1]/div/div/h5
Date
/html/body/div/div/div/div/div/a[1]/div/div/h6/span
*/
const HISTORY_XPath = {
    list: '/html/body/div/div/div/div/div', // .card-body

};


// Get user history
const scrapeUserHistory = async (page, target=process.env.TARGET) => {
    const history = [];

    // Navigate
    const target_url = getURL(target);
    await page.goto(target_url, {waitUntil: 'networkidle2'});

    // Paginate

    // const [submit_button] = await page.$x(LOGIN_XPath.submit);
    // await submit_button.click();
    // Scrape data
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

    history.push(...games);

    // Return
    return history;
};

module.exports = scrapeUserHistory;


