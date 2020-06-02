const fs = require("fs");


const getUsers = (input_file) => {
    const users = [];

    // Read file
    const data = fs.readFileSync(input_file, {encoding: "utf-8"});
    const formatedData = data.split(",").map(entry => entry.trim());

    users.push(...formatedData);

    return users;
};

module.exports = getUsers;