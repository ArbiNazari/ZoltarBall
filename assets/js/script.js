// get team data 
fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/receiving-stats/offense/2019", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "nfl-team-stats.p.rapidapi.com",
		"x-rapidapi-key": "a8143de9d6msh6d1195065a85dbfp18ac06jsn532055b2fc85"
	}
})
.then(response => {
	console.log(response);
    return response.json();
})
.then(data => {
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
	console.log(response);
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(err => {
	console.error(err);
});