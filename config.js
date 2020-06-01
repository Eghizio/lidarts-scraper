const OUTPUT_DIR = "game_history";
const LOGIN_PAGE = "https://lidarts.org/login";
const LOGIN_XPath = {
    login: '//*[@id="email"]',
    password: '//*[@id="password"]',
    submit: '/html/body/div/div/div[1]/div/div/form/button'
};

const config = {
    OUTPUT_DIR,
    LOGIN_PAGE,
    LOGIN_XPath
};

module.exports = config;