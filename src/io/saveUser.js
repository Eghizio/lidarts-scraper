const fs = require("fs");
const Logger = require("../utils/logger");
const parseHistory = require("../utils/parseHistory");
const serializeHistory = require("../utils/serializeHistory");


const initOutputDirectory = (directory) => {
    if(!fs.existsSync(directory)){
        fs.mkdirSync(directory);
        Logger.success(`Output directory '${directory}' created!`);
    }
};

const saveUserHistory = (userData, directory) => {
    const { user, history } = userData;
    if(user===undefined || history===undefined) return; //yikes err handling xd

    if(!fs.existsSync(`${directory}/${user}`)){
        fs.mkdirSync(`${directory}/${user}`);
        Logger.success(`User directory '${user}' created at '${directory}'!`);
    }

    const parsedHistory = parseHistory(userData);
    const serializedHistory = serializeHistory(parsedHistory);

    const fileName = `${directory}/${user}/${user}-${Date.now()}.csv`;

    fs.writeFile(fileName, serializedHistory, "utf-8", (err) => {
        if(err){
            Logger.error(`Some error occured - file '${fileName}' either not saved or corrupted file saved.`);
        } else{
            Logger.success(`Saved '${fileName}'`);
        }
    });
};

module.exports = {
    initOutputDirectory,
    saveUserHistory
};