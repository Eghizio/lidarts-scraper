const INPUT_DIR = process.env.TARGET || "input.txt";
const OUTPUT_DIR = "game_history";

const MODE = process.env.MODE || "production";
const LOGIN_PAGE = "https://lidarts.org/login";

const LOGIN_XPath = {
    login: '//*[@id="email"]',
    password: '//*[@id="password"]',
    submit: '/html/body/div/div/div[1]/div/div/form/button'
};
const HISTORY_XPath = {
    list: '/html/body/div/div/div/div/div',
    pagination: '/html/body/div/div/div/div/div/ul'
};

const config = {
    INPUT_DIR,
    OUTPUT_DIR,
    MODE,
    LOGIN_PAGE,
    LOGIN_XPath,
    HISTORY_XPath
};

module.exports = config;