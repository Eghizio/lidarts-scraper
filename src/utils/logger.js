const { MODE } = require("../../config");

class Logger{
    // Need to update node to 12, yikes i havent updated for a year xd
    // Logger.COLOR = {
    //     BLACK: "\x1b[30m%s\x1b[0m",
    //     RED: "\x1b[31m%s\x1b[0m",
    //     GREEN: "\x1b[32m%s\x1b[0m",
    //     YELLOW: "\x1b[33m%s\x1b[0m",
    //     BLUE: "\x1b[34m%s\x1b[0m",
    //     MAGENTA: "\x1b[35m%s\x1b[0m",
    //     CYAN: "\x1b[36m%s\x1b[0m",
    //     WHITE: "\x1b[37m%s\x1b[0m",
    // };
    
    static log(){
        // console.log(Logger.COLOR.WHITE, ...arguments)
        console.log("\x1b[37m%s\x1b[0m", ...arguments)
    }

    static success(){
        // console.log(Logger.COLOR.GREEN, ...arguments);
        console.log("\x1b[32m%s\x1b[0m", ...arguments);
    }

    static error(){
        // console.log(Logger.COLOR.RED, ...arguments);
        console.log("\x1b[31m%s\x1b[0m", ...arguments);
    }

    static info(){
        // console.log(Logger.COLOR.MAGENTA, ...arguments);
        console.log("\x1b[35m%s\x1b[0m", ...arguments);
    }

    static debug(){
        // if(MODE.toLowerCase() === "dev") console.log(Logger.COLOR.YELLOW, ...arguments);
        if(MODE.toLowerCase().startsWith("dev")) console.log("\x1b[33m%s\x1b[0m", ...arguments);
    }

}

module.exports = Logger;