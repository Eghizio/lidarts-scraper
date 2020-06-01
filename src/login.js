const config = require("../config");

const { LOGIN_PAGE, LOGIN_XPath } = config;

// Log in
const logIn = async (page) => {
    await page.goto(LOGIN_PAGE, {waitUntil: 'networkidle2'});

    const [login_input] = await page.$x(LOGIN_XPath.login);
    await login_input.evaluate((el, newValue) => el.value = newValue, process.env.LOGIN);
    
    const [pwd_input] = await page.$x(LOGIN_XPath.password);
    await pwd_input.evaluate((el, newValue) => el.value = newValue, process.env.PWD);
    
    const [submit_button] = await page.$x(LOGIN_XPath.submit);
    await submit_button.click();

    await page.waitForNavigation();
};

module.exports = logIn;