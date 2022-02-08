teamListEl = document.querySelector("#teams").children;
teamFormSearchEl = document.querySelector("#find-team");
// console.log(teamListEl);


function formSubmitHandler(event) {
    // prevents refresh
    event.preventDefault();

    if (teamListEl) {
        getStats();
    }
};
teamFormSearchEl.addEventListener("submit", formSubmitHandler);


// display stats 
function displayStats() {

}


// GET STATS
function getStats () {
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
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });
};



// // RECEIVING stats 
// function getReceptions() {
//     fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/receiving-stats/offense/2019", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "nfl-team-stats.p.rapidapi.com",
//             "x-rapidapi-key": "a8143de9d6msh6d1195065a85dbfp18ac06jsn532055b2fc85"
//         }
//     })
//     .then(response => {
//         console.log(response);
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.error(err);
//     });
// };
//

// RUSHING stats 
// function getRushing() {
//     fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/rushing-stats/defense/1999", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "nfl-team-stats.p.rapidapi.com",
//             "x-rapidapi-key": "a8143de9d6msh6d1195065a85dbfp18ac06jsn532055b2fc85"
//         }
//     })
//     .then(response => {
//         console.log(response);
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.error(err);
//     });
// };

// PASSING stats 
// function getPassing() {
//     fetch("https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/passing-stats/offense/2021", {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-host": "nfl-team-stats.p.rapidapi.com",
//             "x-rapidapi-key": "a8143de9d6msh6d1195065a85dbfp18ac06jsn532055b2fc85"
//         }
//     })
//     .then(response => {
//         console.log(response);
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.error(err);
//     });
// };