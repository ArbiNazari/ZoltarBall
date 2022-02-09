teamListEl = document.querySelector("#teams");
teamFormSearchEl = document.querySelector("#find-team");
heroContainerEl = document.querySelector("#hero-section");
searchBtnEl = document.querySelector(".btn-search");
var passFetchArr = [];
var winFetchArr = [];
var rushFetchArr = [];
var recFetchArr = [];
var teamSearched ='';




// GET STATS
function getStats() {
    teamSearched = teamListEl.value;
    console.log(teamSearched);
    fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/win-stats/2020", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "nfl-team-stats.p.rapidapi.com",
            "x-rapidapi-key": "a8143de9d6msh6d1195065a85dbfp18ac06jsn532055b2fc85"
        }
    })
        .then(response => {
            // console.log(response);
            return response.json();

        })
        .then(data => {

            winFetchArr = data;
            console.log(winFetchArr);

            fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/receiving-stats/offense/2019", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "nfl-team-stats.p.rapidapi.com",
                    "x-rapidapi-key": "a8143de9d6msh6d1195065a85dbfp18ac06jsn532055b2fc85"
                }
            })
                .then(response => {
                    // console.log(response);
                    return response.json();
                })
                .then(data => {
                    recFetchArr = data;
                    console.log(data);
                    fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/rushing-stats/defense/1999", {
                        "method": "GET",
                        "headers": {
                            "x-rapidapi-host": "nfl-team-stats.p.rapidapi.com",
                            "x-rapidapi-key": "a8143de9d6msh6d1195065a85dbfp18ac06jsn532055b2fc85"
                        }
                    })
                        .then(response => {
                            // console.log(response);
                            return response.json();
                        })
                        .then(data => {
                            rushFetchArr = data;
                            console.log(data);
                            fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/passing-stats/offense/2021", {
                                "method": "GET",
                                "headers": {
                                    "x-rapidapi-host": "nfl-team-stats.p.rapidapi.com",
                                    "x-rapidapi-key": "a8143de9d6msh6d1195065a85dbfp18ac06jsn532055b2fc85"
                                }
                            })
                                .then(function (response) {
                                    // console.log(response);
                                    return response.json();
                                })
                                .then(data => {
                                    passFetchArr = data;
                                    console.log(data);
                                    displayStats(teamSearched);
                                })
                                .catch(err => {
                                    console.error(err);
                                });
                        })
                        .catch(err => {
                            console.error(err);
                        });

                })
                .catch(err => {
                    console.error(err);
                });


        })
        .catch(err => {
            console.error(err);
        });

};


function displayStats(team) {
    // removes original hero banner 
    heroContainerEl.classList.remove("hero");
    heroContainerEl.classList.add("stats-team");


    var x = document.getElementById("teams");
    var y = x.options[x.selectedIndex].text;
    // console.log(value);

    var teamName = document.createElement("h2");
    teamName.innerHTML = y;
    heroContainerEl.append(teamName);

    var selectedTeam = document.getElementById("teams");
    var winTeamName = selectedTeam.getAttribute('value');
    var teamName = document.querySelector("data-team");

    // console.log("stuff");
    // console.log(winFetchArr);


    
    var selectedTeamData = {fullName: team,
                            mascotName: team.split(" ")[1]}



    //Wins Array

    for (var i = 0; i < winFetchArr.length; i++) {
        if (winFetchArr[i].name === selectedTeamData.fullName) {
                selectedTeamData.winRatePercentage = winFetchArr[i].winRatePercentage
        }
    }

    for (var i = 0; i < recFetchArr.length; i++) {
        if (recFetchArr[i].name === selectedTeamData.mascotName) {
                selectedTeamData.recYards = recFetchArr[i].yards
        }
    }
   

    // Passing Array
    for (var i = 0; i < passFetchArr.length; i++) {
        if (passFetchArr[i].name === selectedTeamData.mascotName) {
                selectedTeamData.passYards = passFetchArr[i].passYards;
                selectedTeamData.completions = passFetchArr[i].completions;
                selectedTeamData.touchdowns = passFetchArr[i].touchdowns;
        }
    }
  
    // Rushing Array
    for (var i = 0; i < rushFetchArr.length; i++) {
        if (rushFetchArr[i].name === selectedTeamData.mascotName) {
                selectedTeamData.rushYards = rushFetchArr[i].yards
        }
    }

    console.log(selectedTeamData);



    var teamWins = document.createElement("h4");
    teamWins.innerHTML = "Win Percentage: " + selectedTeamData.winRatePercentage;
    heroContainerEl.append(teamWins);

    var teamPassing = document.createElement("h4");
    teamPassing.innerHTML = "Passing yards per game: " + selectedTeamData.passYards + "<br />Completions: " + selectedTeamData.completions + "<br />Touchdowns: " + selectedTeamData.touchdowns;
    heroContainerEl.append(teamPassing);

    var teamRushing = document.createElement("h4");
    teamRushing.innerHTML = "Rushing yards per game: " + selectedTeamData.rushYards;
    heroContainerEl.append(teamRushing);

    var teamReceptions = document.createElement("h4");
    teamReceptions.innerHTML = "Receiving yards per game: " + selectedTeamData.recYards;
    heroContainerEl.append(teamReceptions);


};

// get stats button 
searchBtnEl.addEventListener("click", getStats);






