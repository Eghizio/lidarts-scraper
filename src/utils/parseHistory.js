
const parseResult = (result, userName) => {
    // Retrieve data
    const [user1, score, user2] = result.split(" ");
    const [score1, score2] = score.split(":").map(s => Number(s));
    const players = [{name: user1, score: score1}, {name: user2, score: score2}];

    // Identify user
    const [user] = players.filter(player => player.name===userName);
    const opponent = players[0]===user ? players[1] : players[0];
    // is draw possible?
    const winner = players[0].score>players[1].score ? players[0].name : players[1].name;

    return {
        opponent: opponent.name,
        user_score: user.score,
        opponent_score: opponent.score,
        winner: winner
    };
};

const parseDate = (date) => {
    return date;
};

// Returns parsed history Array
const parseHistory = (userData) => {
    const { user, history } = userData;

    const parsedHistory = history.map(game => {
        const { result, date, mode, url } = game;

        const { opponent, user_score, opponent_score, winner } = parseResult(result, user);
        const parsedDate = parseDate(date);

        return {
            player1: user,
            player2: opponent,
            score1: user_score,
            score2: opponent_score,
            winner: winner,
            date: parsedDate,
            mode: mode,
            url: url
        };
    });

    return parsedHistory;
};

module.exports = parseHistory;