// get modal elements
var modal = document.getElementById('simpleModal');
//get open modal button
var modalBtn = document.getElementById('modalBtn');
//get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// list of teams
teamListEl = document.querySelector("#teams");
modalBodyEl = document.querySelector(".modal-body");
searchBtnEl = document.querySelector(".btn-search");

// Listen for click
modalBtn.addEventListener('click', openModal);

// Listen for close click
closeBtn.addEventListener('click', closeModal);

// listen for outside click
window.addEventListener('click', outsideClick);

// function to open modal
function openModal(){
    modal.style.display = 'block';
}

// function to close modal
function closeModal(){
    modal.style.display = 'none';
}

// function to close modal if outside click
function outsideClick(e){
    if(e.target == modal){
    modal.style.display = 'none';
    }
}

// CODE TO RETRIEVE STATS
var passFetchArr = [];
var winFetchArr = [];
var rushFetchArr = [];
var recFetchArr = [];
var teamSearched = '';




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

    modalBodyEl.classList.add("stats-team");


    var x = document.getElementById("teams");
    var y = x.options[x.selectedIndex].text;
    // console.log(value);

    var teamName = document.createElement("h2");
    teamName.innerHTML = y;
    modalBodyEl.append(teamName);

    var selectedTeam = document.getElementById("teams");
    var winTeamName = selectedTeam.getAttribute('value');
    var teamName = document.querySelector("data-team");

    // console.log("stuff");
    // console.log(winFetchArr);
    var teamNameLength = team.split(" ").length;
    console.log("This string", teamNameLength);



    var selectedTeamData = {
        fullName: team,
        mascotName: team.split(" ")[teamNameLength - 1]
    }

    console.log(selectedTeamData);



    //Wins Array

    for (var i = 0; i < winFetchArr.length; i++) {
        if (selectedTeamData.fullName === "Washington Commanders") {
            if (winFetchArr[i].name === "Washington Football Team xz") {
                selectedTeamData.winRatePercentage = winFetchArr[i].winRatePercentage;
            }
        } else if (winFetchArr[i].name === selectedTeamData.fullName) {
            selectedTeamData.winRatePercentage = winFetchArr[i].winRatePercentage;
        }
    }

    // Receiving array 
    for (var i = 0; i < recFetchArr.length; i++) {
        if (selectedTeamData.fullName === "Washington Commanders") {
            if (recFetchArr[i].name === "Redskins") {
                selectedTeamData.recYards = recFetchArr[i].yards;
            }
        } else if (recFetchArr[i].name === selectedTeamData.mascotName) {
            selectedTeamData.recYards = recFetchArr[i].yards;
        }
    }


    // Passing Array
    for (var i = 0; i < passFetchArr.length; i++) {
        if (selectedTeamData.fullName === "Washington Commanders") {
            if (passFetchArr[i].name === "Football Team") {
                selectedTeamData.passYards = passFetchArr[i].passYards;
                selectedTeamData.completions = passFetchArr[i].completions;
                selectedTeamData.touchdowns = passFetchArr[i].touchdowns;
            }
        } else if (passFetchArr[i].name === selectedTeamData.mascotName) {
            selectedTeamData.passYards = passFetchArr[i].passYards;
            selectedTeamData.completions = passFetchArr[i].completions;
            selectedTeamData.touchdowns = passFetchArr[i].touchdowns;
        }
    }

    // Rushing Array
    for (var i = 0; i < rushFetchArr.length; i++) {
        if (selectedTeamData.fullName === "Washington Commanders") {
            if (rushFetchArr[i].name === "Redskins") {
                selectedTeamData.rushYards = rushFetchArr[i].yards;
            }
        } else if (rushFetchArr[i].name === selectedTeamData.mascotName) {
            selectedTeamData.rushYards = rushFetchArr[i].yards;
        }
    }

    // console.log(selectedTeamData);

    var teamSeasonStats = document.createElement("h3");
    teamSeasonStats.innerHTML = "Season stats";
    modalBodyEl.append(teamSeasonStats);

    var teamWins = document.createElement("h4");
    teamWins.innerHTML = "Win Percentage: " + selectedTeamData.winRatePercentage;
    modalBodyEl.append(teamWins);

    var teamPassing = document.createElement("h4");
    teamPassing.innerHTML = "Passing yards: " + selectedTeamData.passYards + "<br />Completions: " + selectedTeamData.completions + "<br />Touchdowns: " + selectedTeamData.touchdowns;
    modalBodyEl.append(teamPassing);

    var teamRushing = document.createElement("h4");
    teamRushing.innerHTML = "Rushing yards: " + selectedTeamData.rushYards;
    modalBodyEl.append(teamRushing);

    var teamReceptions = document.createElement("h4");
    teamReceptions.innerHTML = "Receiving yards: " + selectedTeamData.recYards;
    modalBodyEl.append(teamReceptions);

};

// get stats button 
searchBtnEl.addEventListener("click", getStats);

//weather

var cities = [];
var cityInputEl = document.querySelector("#city");
var cityFormEl = document.querySelector("#city-search");
var citySearchInputEl = document.querySelector("#searched-city");
var weatherContainerEl = document.querySelector("#current-weather");
var forecastTitle = document.querySelector("#todayforecast");
var citySearchEl = document.querySelector(".btn-search");


var formSumbitHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({ city });
        cityInputEl.value = "";
    } else {
        alert("Please Enter The Name of a City");
    }
    saveSearch();
    pastSearch(city);
}

var saveSearch = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
};

var getCityWeather = function (city) {
    var apiKey = "fd40419dcea7a910a399de9c4f2cc307"
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
                displayWeather(data, city);
            });
        });
};

var displayWeather = function (weather, searchCity) {
    weatherContainerEl.textContent = "";
    citySearchInputEl.textContent = searchCity;

    var currentDate = document.createElement("span")
    currentDate.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchInputEl.appendChild(currentDate);

    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + " ??F ";
    temperatureEl.classList = "list-group-item"

    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + " % ";
    humidityEl.classList = "list-group-item"

    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH ";
    windSpeedEl.classList = "list-group-item"

    modalBodyEl.appendChild(temperatureEl);

    modalBodyEl.appendChild(humidityEl);

    modalBodyEl.appendChild(windSpeedEl);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat, lon)
};

citySearchEl.addEventListener("click", formSumbitHandler);
// pastSearchButtonEl.addEventListener("click", pastSearchHandler);