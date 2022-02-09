teamListEl = document.querySelector("#teams");
teamFormSearchEl = document.querySelector("#find-team");
heroContainerEl = document.querySelector("#hero-section");
searchBtnEl = document.querySelector(".btn-search");
var passFetchArr = [];
var winFetchArr = [];
var rushFetchArr = [];
var recFetchArr = [];
// console.log(teamListEl);


function displayStats() {
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
	var winTeamName = selectedTeam.getAttribute('data-team');
	var teamName = selectedTeam.val;
	
    console.log("stuff");
    console.log(winFetchArr);

	//Wins Array
	$.each(winFetchArr, function() {
		if(winTeamName == this.name) {

			winRatePercentage = this.winRatePercentage;
           
		}
	});
	//Receiving Array
	$.each(recFetchArr, function() {
		if(teamName == this.name) {
			yards = this.yards;
		}
	});
    // Passing Array
    $.each(passFetchArr, function() {
		if(teamName == this.name) {
			passYards = this.pass;
            completions = this.completions;
            touchdowns = this.touchdowns;
		}
	});
     // Rushing Array
     $.each(rushFetchArr, function() {
		if(teamName == this.name) {
			rushYards = this.rush;
		}
	});

        var teamWins = document.createElement("h4");
        teamWins.innerHTML = "Win Percentage: " + winRatePercentage;
        heroContainerEl.append(teamWins);

        var teamPassing = document.createElement("h4");
        teamPassing.innerHTML = "Passing yards per game: " + passing + "<br />Completions: " + completions + "<br />Touchdowns: " + touchdowns;
        heroContainerEl.append(teamPassing);

        var teamRushing = document.createElement("h4");
        teamRushing.innerHTML = "Rushing yards per game: " + rushYards;
        heroContainerEl.append(teamRushing);

        var teamReceptions = document.createElement("h4");
        teamReceptions.innerHTML = "Receiving yards per game: " + yards;
        heroContainerEl.append(teamReceptions);


};

// get stats button 
searchBtnEl.addEventListener("click", getStats);


// GET STATS
function getStats() {
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
        
        winFetchArr = $.parseJSON(data);
        console.log(data);
        
    })
    .catch(err => {
        console.error(err);
    });

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
    })
    .catch(err => {
        console.error(err);
    });

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
    })
    .catch(err => {
        console.error(err);
    });

    fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/passing-stats/offense/2021", {
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
        passFetchArr = data;
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });

    displayStats();
};




