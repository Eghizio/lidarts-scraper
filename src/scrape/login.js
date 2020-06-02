const { LOGIN_PAGE, LOGIN_XPath } = require("../../config");


const logIn = async (page, login=process.env.LOGIN, password=process.env.PWD) => {
    await page.goto(LOGIN_PAGE, {waitUntil: 'networkidle2'});

    const [login_input] = await page.$x(LOGIN_XPath.login);
    await login_input.evaluate((el, newValue) => el.value = newValue, login);
    
    const [pwd_input] = await page.$x(LOGIN_XPath.password);
    await pwd_input.evaluate((el, newValue) => el.value = newValue, password);
    
    const [submit_button] = await page.$x(LOGIN_XPath.submit);
    await submit_button.click();

    await page.waitForNavigation();
    console.log("\x1b[32m%s\x1b[0m", "Logged in!");
};

module.exports = logIn;