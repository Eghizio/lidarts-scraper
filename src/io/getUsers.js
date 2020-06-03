const fs = require("fs");
const Logger = require("../utils/logger");


const getUsers = (input_file) => {
    const users = [];

    // Read file
    const data = fs.readFileSync(input_file, {encoding: "utf-8"});
    const formatedData = data.split(",").map(entry => entry.trim());

    users.push(...formatedData);
    Logger.debug("Found users: ", users);

    return users;
};

module.exports = getUsers;