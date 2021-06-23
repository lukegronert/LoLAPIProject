async function getNALCSSchedule() {
    const response = await fetch('https://fly.sportsdata.io/v3/lol/scores/json/Schedule/100001332?key=373398970de647feb305dd85eb4dde6d', {mode: 'cors'})
    return response.json();
}

// Need Team Names, Winner, Loser, Grayed out if not finished

function getGeneralScheduleData(response) {
    let scheduleData = [];
    response.map((game) => {
        const gameInfo = {
            TeamAName: game.TeamAName,
            TeamBName: game.TeamBName,
            TeamAScore: game.TeamAScore,
            TeamBScore: game.TeamBScore,
            GameId: game.GameId
        }
        scheduleData.push(gameInfo);
    })
    console.log(scheduleData)
}

// getNALCSSchedule().then(response => console.log(response));


async function getIndividualGameData(gameid) {
    const response = await fetch(`https://fly.sportsdata.io/v3/lol/stats/json/BoxScore/${gameid}?key=373398970de647feb305dd85eb4dde6d`, {mode:'cors'});
    return response.json();
}

// Team Names, Player Names, Player Positions, Champion Names, KDA, Gold
function getSelectedGameData(response) {
    const gameData = response[0];
    console.log(gameData)
    const playerMatchData = gameData.Matches[0].PlayerMatches;
    playerMatchData.map((player) => {
        getPlayerData(player.PlayerId).then(response => {
            console.log(player.Name, response.MatchName, player.Position)
        });
        // return {
        //     playerName: player.Name,
        //     summonerName: playerSummonerName,
        //     position: player.Position,
        // }
    })
    }
    // const player1Info = await getPlayerData(playerMatchData[0].PlayerId).then(info => {
    //         const playerName = info.CommonName;
    //         const summonerName = info.MatchName;
    //         console.log(playerName, summonerName)
    // });

async function getPlayerData(playerid) {
    const response = await fetch(`https://fly.sportsdata.io/v3/lol/scores/json/Player/${playerid}?key=373398970de647feb305dd85eb4dde6d`, {mode: 'cors'});
    return response.json();
}

getIndividualGameData(100011012).then(response => getSelectedGameData(response));