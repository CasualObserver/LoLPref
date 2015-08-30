var adcChamps = [], supportChamps = [], jungleChamps = [], midChamps = [], topChamps = [], overallChamps = [];
var topADC = [], topSupport = [], topJG = [], topMid = [], topTop = [], topOverall = [];
var supportStats = [], adcStats = [], jgStats = [], topStats = [], midStats = [], overallStats = [];
var sortedStats = [];
var TrueSummonerName;

var summonerTemplate;
$.ajax('./Templates/Summoner.html').then(function (template) {
    summonerTemplate = template;
});


function SearchBySummonerName(summonerName) {
    $.ajax({
        type: 'GET',
        url: "https://na.api.pvp.net" + "/api/lol/na/v1.4/summoner/by-name/" + summonerName + "?api_key=1d888cd4-9f56-4058-93c3-51ff2dd7f4d0",
        async: false,
        success: function (data) {
            $('#summonerName').val("");
            summonerName = summonerName.replace(/ /g, "").toLowerCase();
            TrueSummonerName = data[summonerName].name;
            GetSummonerRankedDS(data[summonerName].id);
        },
        error: function () {
            $('#summonerName').val("");
            alert("Summoner may not exist, or something else weird happened.");
        }
    });
};

function GetSummonerRankedDS(summonerId) {
    $.ajax({
        type: 'GET',
        url: "https://na.api.pvp.net" + "/api/lol/na/v1.3/stats/by-summoner/" + summonerId + "/ranked?api_key=1d888cd4-9f56-4058-93c3-51ff2dd7f4d0",
        async: false,
        success: function (data) {
            CreateRankedChampionArraySets(data.champions);
        },
        error: function () {
            alert("Error");
        }
    });
};

function CreateRankedChampionArraySets(championDS) {
    supportChamps = [];
    adcChamps = [];
    jungleChamps = [];
    topChamps = [];
    midChamps = [];
    for (i = 0; i < championDS.length; i++) {
        var c = championDS[i].id;
        if(c == 12 || c == 432 || c == 201 || c == 40 || c == 117 || c == 89 || c == 267 || c == 111 || c == 20 || c == 25 || c == 37 || c == 37 || c == 16 || c == 223 || c == 44 || c == 412 || c == 26 || c == 143 || c == 43 || c == 79 || c == 31 || c == 1){
            supportChamps.push(championDS[i]);
        }
        if (c == 22 || c == 51 || c == 42 || c == 119 || c == 81 || c == 104 || c == 222 || c == 429 || c == 96 || c == 236 || c == 21 || c == 133 || c == 15 || c == 17 || c == 18 || c == 29 || c == 6 || c == 110 || c == 67) {
            adcChamps.push(championDS[i]);
        }
        if (c == 266 || c == 32 || c == 131 || c == 36 || c == 60 || c == 9 || c == 105 || c == 79 || c == 28 || c == 120 || c == 59 || c == 24 || c == 10 || c == 121 || c == 64 || c == 54 || c == 57 || c == 75 || c == 111 || c == 76 || c == 56 || c == 20 || c == 2 || c == 80 || c == 78 || c == 33 || c == 421 || c == 58 || c == 107 || c == 92 || c == 113 || c == 35 || c == 102 || c == 98 || c == 14 || c == 72 || c == 48 || c == 23 || c == 77 || c == 254 || c == 106 || c == 19 || c == 62 || c == 5 || c == 154 || c == 245) {
            jungleChamps.push(championDS[i]);
        }
        if (c == 266 || c == 12 || c == 84 || c == 31 || c == 122 || c == 131 || c == 36 || c == 60 || c == 114 || c == 105 || c == 3 || c == 41 || c == 86 || c == 150 || c == 79 || c == 120 || c == 39 || c == 59 || c == 24 || c == 126 || c == 10 || c == 85 || c == 64 || c == 54 || c == 57 || c == 82 || c == 75 || c == 111 || c == 76 || c == 56 || c == 20 || c == 2 || c == 80 || c == 78 || c == 133 || c == 421 || c == 58 || c == 107 || c == 92 || c == 68 || c == 13 || c == 98 || c == 102 || c == 27 || c == 14 || c == 72 || c == 50 || c == 48 || c == 23 || c == 77 || c == 67 || c == 6 || c == 254 || c == 8 || c == 106 || c == 19 || c == 62 || c == 5 || c == 157 || c == 83 || c == 154 || c == 127 || c == 117) {
            topChamps.push(championDS[i]);
        }
        if (c == 103 || c == 84 || c == 34 || c == 1 || c == 268 || c == 63 || c == 69 || c == 31 || c == 131 || c == 28 || c == 81 || c == 9 || c == 105 || c == 3 || c == 74 || c == 43 || c == 96 || c == 127 || c == 117 || c == 99 || c == 90 || c == 25 || c == 82 || c == 76 || c == 61 || c == 13 || c == 35 || c == 16 || c == 50 || c == 134 || c == 91 || c == 17 || c == 4 || c == 110 || c == 45 || c == 161 || c == 112 || c == 101 || c == 238 || c == 115 || c == 26 || c == 143 || c == 245) {
            midChamps.push(championDS[i]);
        }
        if (c != 0) {
            overallChamps.push(championDS[i]);
        }
        //if (c == 266 || c == 103 || c == 84 || c == 12 || c == 32 || c == 34 || c == 1 || c == 22 || c == 268 || c == 432 || c == 53 || c == 63 || c == 201 || c == 51 || c == 69 || c == 31 || c == 42 || c == 122 || c == 131 || c == 36 || c == 119 || c == 245 || c == 60 || c == 28 || c == 81 || c == 9 || c == 114 || c == 105 || c == 3 || c == 41 || c == 86 || c == 150 || c == 79 || c == 104 || c == 120 || c == 74 || c == 39 || c == 40 || c == 59 || c == 24 || c == 126 || c == 222 || c == 429 || c == 43 || c == 30 || c == 38 || c == 55 || c == 10 || c == 85 || c == 121 || c == 96 || c == 7 || c == 64 || c == 89 || c == 127 || c == 236 || c == 117 || c == 99 || c == 54 || c == 90 || c == 57 || c == 11 || c == 21 || c == 82 || c == 25 || c == 267 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0 || c == 0) {

        //}
    }
    TopThreeSupport(supportChamps);
    TopThreeADC(adcChamps);
    TopThreeJG(jungleChamps);
    TopThreeTop(topChamps);
    TopThreeMid(midChamps);
    TopThreeOverall(overallChamps);
    SetUpStats(championDS, topSupport, topADC, topJG, topTop, topMid, topOverall);
    LoadSummonerUI(championDS, topSupport, topADC, topJG, topTop, topMid, topOverall, supportStats, adcStats, jgStats, topStats, midStats, overallStats);
};

function TopThreeSupport(supportChamps) {
    topSupport = [];
    var gamesPlayed = [];
    var firstChamp = null;
    var secondChamp = null;
    var thirdChamp = null;
    for (i = 0; i < supportChamps.length; i++) {
        gamesPlayed.push(supportChamps[i].stats.totalSessionsPlayed);
    };
    gamesPlayed.sort(function (a, b) { return b - a });
    for (i = 0; i < supportChamps.length; i++) {
        if (supportChamps[i].stats.totalSessionsPlayed == gamesPlayed[0] && firstChamp == null) {
            firstChamp = supportChamps[i].id;
        }
        else if (supportChamps[i].stats.totalSessionsPlayed == gamesPlayed[1] && secondChamp == null) {
            secondChamp = supportChamps[i].id;
        }
        else if (supportChamps[i].stats.totalSessionsPlayed == gamesPlayed[2] && thirdChamp == null) {
            thirdChamp = supportChamps[i].id;
        }
    };
    //alert(firstChamp + " | " + secondChamp + " | " + thirdChamp);
    topSupport.push(firstChamp);
    topSupport.push(secondChamp);
    topSupport.push(thirdChamp);
    //alert(topSupport);
};

function TopThreeADC(adcChamps) {
    topADC = [];
    var gamesPlayed = [];
    var firstChamp = null;
    var secondChamp = null;
    var thirdChamp = null;
    for (i = 0; i < adcChamps.length; i++) {
        gamesPlayed.push(adcChamps[i].stats.totalSessionsPlayed);
    };
    gamesPlayed.sort(function (a, b) { return b - a });
    for (i = 0; i < adcChamps.length; i++) {
        if (adcChamps[i].stats.totalSessionsPlayed == gamesPlayed[0] && firstChamp == null) {
            firstChamp = adcChamps[i].id;
        }
        else if (adcChamps[i].stats.totalSessionsPlayed == gamesPlayed[1] && secondChamp == null) {
            secondChamp = adcChamps[i].id;
        }
        else if (adcChamps[i].stats.totalSessionsPlayed == gamesPlayed[2] && thirdChamp == null) {
            thirdChamp = adcChamps[i].id;
        }
    };
    //alert(firstChamp + " | " + secondChamp + " | " + thirdChamp);
    topADC.push(firstChamp);
    topADC.push(secondChamp);
    topADC.push(thirdChamp);
    //alert(topADC);
};

function TopThreeJG(jungleChamps) {
    topJG = [];
    var gamesPlayed = [];
    var firstChamp = null;
    var secondChamp = null;
    var thirdChamp = null;
    for (i = 0; i < jungleChamps.length; i++) {
        gamesPlayed.push(jungleChamps[i].stats.totalSessionsPlayed);
    };
    gamesPlayed.sort(function (a, b) { return b - a });
    for (i = 0; i < jungleChamps.length; i++) {
        if (jungleChamps[i].stats.totalSessionsPlayed == gamesPlayed[0] && firstChamp == null) {
            firstChamp = jungleChamps[i].id;
        }
        else if (jungleChamps[i].stats.totalSessionsPlayed == gamesPlayed[1] && secondChamp == null) {
            secondChamp = jungleChamps[i].id;
        }
        else if (jungleChamps[i].stats.totalSessionsPlayed == gamesPlayed[2] && thirdChamp == null) {
            thirdChamp = jungleChamps[i].id;
        }
    };
    //alert(firstChamp + " | " + secondChamp + " | " + thirdChamp);
    topJG.push(firstChamp);
    topJG.push(secondChamp);
    topJG.push(thirdChamp);
    //alert(topJG);
};

function TopThreeTop(topChamps) {
    topTop = [];
    var gamesPlayed = [];
    var firstChamp = null;
    var secondChamp = null;
    var thirdChamp = null;
    for (i = 0; i < topChamps.length; i++) {
        gamesPlayed.push(topChamps[i].stats.totalSessionsPlayed);
    };
    gamesPlayed.sort(function (a, b) { return b - a });
    for (i = 0; i < topChamps.length; i++) {
        if (topChamps[i].stats.totalSessionsPlayed == gamesPlayed[0] && firstChamp == null) {
            firstChamp = topChamps[i].id;
        }
        else if (topChamps[i].stats.totalSessionsPlayed == gamesPlayed[1] && secondChamp == null) {
            secondChamp = topChamps[i].id;
        }
        else if (topChamps[i].stats.totalSessionsPlayed == gamesPlayed[2] && thirdChamp == null) {
            thirdChamp = topChamps[i].id;
        }
    };
    //alert(firstChamp + " | " + secondChamp + " | " + thirdChamp);
    topTop.push(firstChamp);
    topTop.push(secondChamp);
    topTop.push(thirdChamp);
    //alert(topTop);
};

function TopThreeMid(midChamps) {
    topMid = [];
    var gamesPlayed = [];
    var firstChamp = null;
    var secondChamp = null;
    var thirdChamp = null;
    for (i = 0; i < midChamps.length; i++) {
        gamesPlayed.push(midChamps[i].stats.totalSessionsPlayed);
    };
    gamesPlayed.sort(function (a, b) { return b - a });
    for (i = 0; i < midChamps.length; i++) {
        if (midChamps[i].stats.totalSessionsPlayed == gamesPlayed[0] && firstChamp == null) {
            firstChamp = midChamps[i].id;
        }
        else if (midChamps[i].stats.totalSessionsPlayed == gamesPlayed[1] && secondChamp == null) {
            secondChamp = midChamps[i].id;
        }
        else if (midChamps[i].stats.totalSessionsPlayed == gamesPlayed[2] && thirdChamp == null) {
            thirdChamp = midChamps[i].id;
        }
    };
    //alert(firstChamp + " | " + secondChamp + " | " + thirdChamp);
    topMid.push(firstChamp);
    topMid.push(secondChamp);
    topMid.push(thirdChamp);
    //alert(topMid);
};

function TopThreeOverall(overallChamps) {
    topOverall = [];
    var gamesPlayed = [];
    var firstChamp = null;
    var secondChamp = null;
    var thirdChamp = null;
    for (i = 0; i < overallChamps.length; i++) {
        gamesPlayed.push(overallChamps[i].stats.totalSessionsPlayed);
    };
    gamesPlayed.sort(function (a, b) { return b - a });
    for (i = 0; i < overallChamps.length; i++) {
        if (overallChamps[i].stats.totalSessionsPlayed == gamesPlayed[0] && firstChamp == null) {
            firstChamp = overallChamps[i].id;
        }
        else if (overallChamps[i].stats.totalSessionsPlayed == gamesPlayed[1] && secondChamp == null) {
            secondChamp = overallChamps[i].id;
        }
        else if (overallChamps[i].stats.totalSessionsPlayed == gamesPlayed[2] && thirdChamp == null) {
            thirdChamp = overallChamps[i].id;
        }
    };
    //alert(firstChamp + " | " + secondChamp + " | " + thirdChamp);
    topOverall.push(firstChamp);
    topOverall.push(secondChamp);
    topOverall.push(thirdChamp);
    //alert(topMid);
};

function SetUpStats(championDS, topSupport, topADC, topJG, topTop, topMid, topOverall) {
    supportStats = []; adcStats = []; jgStats = []; topStats = []; midStats = [];
    for (i = 0; i < championDS.length; i++) {
        if ($.inArray(championDS[i].id, topSupport) > -1) {           
            supportStats.push(championDS[i].stats);
        }
        if ($.inArray(championDS[i].id, topADC) > -1) {
            adcStats.push(championDS[i].stats);
        }
        if ($.inArray(championDS[i].id, topJG) > -1) {
            jgStats.push(championDS[i].stats);
        }
        if ($.inArray(championDS[i].id, topTop) > -1) {
            topStats.push(championDS[i].stats);
        }
        if ($.inArray(championDS[i].id, topMid) > -1) {
            midStats.push(championDS[i].stats);
        }
        if ($.inArray(championDS[i].id, topOverall) > -1) {
            overallStats.push(championDS[i].stats);
        }
    };
    SortStats(supportStats);
    supportStats = sortedStats;
    SortStats(adcStats);
    adcStats = sortedStats;
    SortStats(jgStats);
    jgStats = sortedStats;
    SortStats(topStats);
    topStats = sortedStats;
    SortStats(midStats);
    midStats = sortedStats;
    SortStats(overallStats);
    overallStats = sortedStats;
};

function SortStats(stats) {
    sortedStats = [];
    var a = stats[0];
    var b = stats[1];
    var c = stats[2];
    if (a.totalSessionsPlayed >= b.totalSessionsPlayed) {
        if (a.totalSessionsPlayed >= c.totalSessionsPlayed) {
            if (b.totalSessionsPlayed >= c.totalSessionsPlayed) {
                sortedStats = [a, b, c];
            }
            else {
                sortedStats = [a, c, b];
            }
        }
        else {
            sortedStats = [c, a, b];
        }
    }
    else {
        if (b.totalSessionsPlayed >= c.totalSessionsPlayed) {
            if (a.totalSessionsPlayed >= c.totalSessionsPlayed) {
                sortedStats = [b, a, c];
            }
            else {
                sortedStats = [b, c, a];
            }
        }
        else {
            sortedStats = [c, b, a];
        }
    }
};

//====================================================================================================

function LoadSummonerUI(championDS, topSupport, topADC, topJG, topTop, topMid, topOverall, supportStats, adcStats, jgStats, topStats, midStats, overallStats) {
    var controller = new Ractive({
        el: 'SummonerInfo',
        template: summonerTemplate,
        data: {
            Summoner:{
                Name: TrueSummonerName
            },
            Top: {
                FirstIMG: topTop[0],
                FirstGames: topStats[0].totalSessionsPlayed,
                FirstWins: Math.round(((topStats[0].totalSessionsWon / topStats[0].totalSessionsPlayed) * 100) * 10) / 10,
                FirstKills: Math.round((topStats[0].totalChampionKills / topStats[0].totalSessionsPlayed) * 10) / 10,
                FirstDeaths: Math.round((topStats[0].totalDeathsPerSession / topStats[0].totalSessionsPlayed) * 10) / 10,
                FirstAssists: Math.round((topStats[0].totalAssists / topStats[0].totalSessionsPlayed) * 10) / 10,
                SecondIMG: topTop[1],
                SecondGames: topStats[1].totalSessionsPlayed,
                SecondWins: Math.round(((topStats[1].totalSessionsWon / topStats[1].totalSessionsPlayed) * 100) * 10) / 10,
                SecondKills: Math.round((topStats[1].totalChampionKills / topStats[1].totalSessionsPlayed) * 10) / 10,
                SecondDeaths: Math.round((topStats[1].totalDeathsPerSession / topStats[1].totalSessionsPlayed) * 10) / 10,
                SecondAssists: Math.round((topStats[1].totalAssists / topStats[1].totalSessionsPlayed) * 10) / 10,
                ThirdIMG: topTop[2],
                ThirdGames: topStats[2].totalSessionsPlayed,
                ThirdWins: Math.round(((topStats[2].totalSessionsWon / topStats[2].totalSessionsPlayed) * 100) * 10) / 10,
                ThirdKills: Math.round((topStats[2].totalChampionKills / topStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdDeaths: Math.round((topStats[2].totalDeathsPerSession / topStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdAssists: Math.round((topStats[2].totalAssists / topStats[2].totalSessionsPlayed) * 10) / 10,
            },
            Jungle: {
                FirstIMG: topJG[0],
                FirstGames: jgStats[0].totalSessionsPlayed,
                FirstWins: Math.round(((jgStats[0].totalSessionsWon / jgStats[0].totalSessionsPlayed) * 100) * 10) / 10,
                FirstKills: Math.round((jgStats[0].totalChampionKills / jgStats[0].totalSessionsPlayed) * 10) / 10,
                FirstDeaths: Math.round((jgStats[0].totalDeathsPerSession / jgStats[0].totalSessionsPlayed) * 10) / 10,
                FirstAssists: Math.round((jgStats[0].totalAssists / jgStats[0].totalSessionsPlayed) * 10) / 10,
                SecondIMG: topJG[1],
                SecondGames: jgStats[1].totalSessionsPlayed,
                SecondWins: Math.round(((jgStats[1].totalSessionsWon / jgStats[1].totalSessionsPlayed) * 100) * 10) / 10,
                SecondKills: Math.round((jgStats[1].totalChampionKills / jgStats[1].totalSessionsPlayed) * 10) / 10,
                SecondDeaths: Math.round((jgStats[1].totalDeathsPerSession / jgStats[1].totalSessionsPlayed) * 10) / 10,
                SecondAssists: Math.round((jgStats[1].totalAssists / jgStats[1].totalSessionsPlayed) * 10) / 10,
                ThirdIMG: topJG[2],
                ThirdGames: jgStats[2].totalSessionsPlayed,
                ThirdWins: Math.round(((jgStats[2].totalSessionsWon / jgStats[2].totalSessionsPlayed) * 100) * 10) / 10,
                ThirdKills: Math.round((jgStats[2].totalChampionKills / jgStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdDeaths: Math.round((jgStats[2].totalDeathsPerSession / jgStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdAssists: Math.round((jgStats[2].totalAssists / jgStats[2].totalSessionsPlayed) * 10) / 10,
            },
            Mid: {
                FirstIMG: topMid[0],
                FirstGames: midStats[0].totalSessionsPlayed,
                FirstWins: Math.round(((midStats[0].totalSessionsWon / midStats[0].totalSessionsPlayed) * 100) * 10) / 10,
                FirstKills: Math.round((midStats[0].totalChampionKills / midStats[0].totalSessionsPlayed) * 10) / 10,
                FirstDeaths: Math.round((midStats[0].totalDeathsPerSession / midStats[0].totalSessionsPlayed) * 10) / 10,
                FirstAssists: Math.round((midStats[0].totalAssists / midStats[0].totalSessionsPlayed) * 10) / 10,
                SecondIMG: topMid[1],
                SecondGames: midStats[1].totalSessionsPlayed,
                SecondWins: Math.round(((midStats[1].totalSessionsWon / midStats[1].totalSessionsPlayed) * 100) * 10) / 10,
                SecondKills: Math.round((midStats[1].totalChampionKills / midStats[1].totalSessionsPlayed) * 10) / 10,
                SecondDeaths: Math.round((midStats[1].totalDeathsPerSession / midStats[1].totalSessionsPlayed) * 10) / 10,
                SecondAssists: Math.round((midStats[1].totalAssists / midStats[1].totalSessionsPlayed) * 10) / 10,
                ThirdIMG: topMid[2],
                ThirdGames: midStats[2].totalSessionsPlayed,
                ThirdWins: Math.round(((midStats[2].totalSessionsWon / midStats[2].totalSessionsPlayed) * 100) * 10) / 10,
                ThirdKills: Math.round((midStats[2].totalChampionKills / midStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdDeaths: Math.round((midStats[2].totalDeathsPerSession / midStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdAssists: Math.round((midStats[2].totalAssists / midStats[2].totalSessionsPlayed) * 10) / 10,
            },
            Adc: {
                FirstIMG: topADC[0],
                FirstGames: adcStats[0].totalSessionsPlayed,
                FirstWins: Math.round(((adcStats[0].totalSessionsWon / adcStats[0].totalSessionsPlayed) * 100) * 10) / 10,
                FirstKills: Math.round((adcStats[0].totalChampionKills / adcStats[0].totalSessionsPlayed) * 10) / 10,
                FirstDeaths: Math.round((adcStats[0].totalDeathsPerSession / adcStats[0].totalSessionsPlayed) * 10) / 10,
                FirstAssists: Math.round((adcStats[0].totalAssists / adcStats[0].totalSessionsPlayed) * 10) / 10,
                SecondIMG: topADC[1],
                SecondGames: adcStats[1].totalSessionsPlayed,
                SecondWins: Math.round(((adcStats[1].totalSessionsWon / adcStats[1].totalSessionsPlayed) * 100) * 10) / 10,
                SecondKills: Math.round((adcStats[1].totalChampionKills / adcStats[1].totalSessionsPlayed) * 10) / 10,
                SecondDeaths: Math.round((adcStats[1].totalDeathsPerSession / adcStats[1].totalSessionsPlayed) * 10) / 10,
                SecondAssists: Math.round((adcStats[1].totalAssists / adcStats[1].totalSessionsPlayed) * 10) / 10,
                ThirdIMG: topADC[2],
                ThirdGames: adcStats[2].totalSessionsPlayed,
                ThirdWins: Math.round(((adcStats[2].totalSessionsWon / adcStats[2].totalSessionsPlayed) * 100) * 10) / 10,
                ThirdKills: Math.round((adcStats[2].totalChampionKills / adcStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdDeaths: Math.round((adcStats[2].totalDeathsPerSession / adcStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdAssists: Math.round((adcStats[2].totalAssists / adcStats[2].totalSessionsPlayed) * 10) / 10,
            },
            Support: {
                FirstIMG: topSupport[0],
                FirstGames: supportStats[0].totalSessionsPlayed,
                FirstWins: Math.round(((supportStats[0].totalSessionsWon / supportStats[0].totalSessionsPlayed) * 100) * 10) / 10,
                FirstKills: Math.round((supportStats[0].totalChampionKills / supportStats[0].totalSessionsPlayed) * 10) / 10,
                FirstDeaths: Math.round((supportStats[0].totalDeathsPerSession / supportStats[0].totalSessionsPlayed) * 10) / 10,
                FirstAssists: Math.round((supportStats[0].totalAssists / supportStats[0].totalSessionsPlayed) * 10) / 10,
                SecondIMG: topSupport[1],
                SecondGames: supportStats[1].totalSessionsPlayed,
                SecondWins: Math.round(((supportStats[1].totalSessionsWon / supportStats[1].totalSessionsPlayed) * 100) * 10) / 10,
                SecondKills: Math.round((supportStats[1].totalChampionKills / supportStats[1].totalSessionsPlayed) * 10) / 10,
                SecondDeaths: Math.round((supportStats[1].totalDeathsPerSession / supportStats[1].totalSessionsPlayed) * 10) / 10,
                SecondAssists: Math.round((supportStats[1].totalAssists / supportStats[1].totalSessionsPlayed) * 10) / 10,
                ThirdIMG: topSupport[2],
                ThirdGames: supportStats[2].totalSessionsPlayed,
                ThirdWins: Math.round(((supportStats[2].totalSessionsWon / supportStats[2].totalSessionsPlayed) * 100) * 10) / 10,
                ThirdKills: Math.round((supportStats[2].totalChampionKills / supportStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdDeaths: Math.round((supportStats[2].totalDeathsPerSession / supportStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdAssists: Math.round((supportStats[2].totalAssists / supportStats[2].totalSessionsPlayed) * 10) / 10,
            },
            Overall: {
                FirstIMG: topOverall[0],
                FirstGames: overallStats[0].totalSessionsPlayed,
                FirstWins: Math.round(((overallStats[0].totalSessionsWon / overallStats[0].totalSessionsPlayed) * 100) * 10) / 10,
                FirstKills: Math.round((overallStats[0].totalChampionKills / overallStats[0].totalSessionsPlayed) * 10) / 10,
                FirstDeaths: Math.round((overallStats[0].totalDeathsPerSession / overallStats[0].totalSessionsPlayed) * 10) / 10,
                FirstAssists: Math.round((overallStats[0].totalAssists / overallStats[0].totalSessionsPlayed) * 10) / 10,
                SecondIMG: topOverall[1],
                SecondGames: overallStats[1].totalSessionsPlayed,
                SecondWins: Math.round(((overallStats[1].totalSessionsWon / overallStats[1].totalSessionsPlayed) * 100) * 10) / 10,
                SecondKills: Math.round((overallStats[1].totalChampionKills / overallStats[1].totalSessionsPlayed) * 10) / 10,
                SecondDeaths: Math.round((overallStats[1].totalDeathsPerSession / overallStats[1].totalSessionsPlayed) * 10) / 10,
                SecondAssists: Math.round((overallStats[1].totalAssists / overallStats[1].totalSessionsPlayed) * 10) / 10,
                ThirdIMG: topOverall[2],
                ThirdGames: overallStats[2].totalSessionsPlayed,
                ThirdWins: Math.round(((overallStats[2].totalSessionsWon / overallStats[2].totalSessionsPlayed) * 100) * 10) / 10,
                ThirdKills: Math.round((overallStats[2].totalChampionKills / overallStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdDeaths: Math.round((overallStats[2].totalDeathsPerSession / overallStats[2].totalSessionsPlayed) * 10) / 10,
                ThirdAssists: Math.round((overallStats[2].totalAssists / overallStats[2].totalSessionsPlayed) * 10) / 10,
            }
        }
    });
    controller.on({});
};