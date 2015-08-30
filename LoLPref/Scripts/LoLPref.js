var adcChamps = [], supportChamps = [], jungleChamps = [], midChamps = [], topChamps = [];
var topADC = [], topSupport = [], topJG = [], topMid = [], topTop = [];
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
            alert("Summoner may not exist, or something else got fucked up.");
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
    }
    TopThreeSupport(supportChamps);
    TopThreeADC(adcChamps);
    TopThreeJG(jungleChamps);
    TopThreeTop(topChamps);
    TopThreeMid(midChamps);
    LoadSummonerUI(championDS, topSupport, topADC, topJG, topTop, topMid);
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

//====================================================================================================

function LoadSummonerUI(championDS, topSupport, topADC, topJG, topTop, topMid) {
    var controller = new Ractive({
        el: 'SummonerInfo',
        template: summonerTemplate,
        data: {
            TopIMG: {
                First: topTop[0],
                Second: topTop[1],
                Third: topTop[2]
            },
            JungleIMG: {
                First: topJG[0],
                Second: topJG[1],
                Third: topJG[2]
            },
            MidIMG: {
                First: topMid[0],
                Second: topMid[1],
                Third: topMid[2]
            },
            AdcIMG: {
                First: topADC[0],
                Second: topADC[1],
                Third: topADC[2]
            },
            SupportIMG: {
                First: topSupport[0],
                Second: topSupport[1],
                Third: topSupport[2]
            }
        }
    });
    controller.on({

    });
    controller.set('Summoner.Name', TrueSummonerName);
};