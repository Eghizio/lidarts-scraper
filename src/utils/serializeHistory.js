
// Returns serilized history String
const serializeHistory = (userHistory) => {
    if(userHistory && userHistory.length===0) return "";
    
    let serialized = userHistory.reduce((acc, game) => 
        acc + "\n" + Object.values(game).map(s => s.toString().trim()).join(",")
    , Object.keys(userHistory[0]).join(","));

    return serialized;
};

module.exports = serializeHistory;