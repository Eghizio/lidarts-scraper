const fs = require("fs");
const parseHistory = require("../utils/parseHistory");
const serializeHistory = require("../utils/serializeHistory");


const initOutputDirectory = (directory) => {
    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory);
        console.log("\x1b[32m%s\x1b[0m", `Output directory '${directory}' created!`)
    }
};

const saveUserHistory = (userData, directory) => {
    const { user, history } = userData;
    if(user===undefined || history===undefined) return; //yikes err handling xd

    if(!fs.existsSync(`${directory}/${user}`)){
        fs.mkdirSync(`${directory}/${user}`);
        console.log("\x1b[32m%s\x1b[0m", `User directory '${user}' created at '${directory}'!`)
    }

    const parsedHistory = parseHistory(userData);
    const serializedHistory = serializeHistory(parsedHistory);

    fs.writeFile(`${directory}/${user}/${user}-${Date.now()}.csv`, serializedHistory, "utf-8", (err) => {
        if(err){
            console.log("Some error occured - file either not saved or corrupted file saved.");
        } else{
            console.log("It\'s saved!");
        }
    });
};

module.exports = {
    initOutputDirectory,
    saveUserHistory
};