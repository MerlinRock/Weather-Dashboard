var searchBoxEl = document.getElementById("searchBox")
var searchBtnEl = document.getElementById("searchBtn");
var cityDateIconEl = document.getElementById("cityDateIcon")
var temperatureEl = document.getElementById("temperature")
var humidityEl = document.getElementById("humidity")
var windSpeedEl = document.getElementById("windSpeed")
var uvIndexEl = document.getElementById("uvIndex")
var historyLiEl = document.getElementById("historyLi")

var historyList = []

// Gets the last city that was searched from local storage
var lastCitySearched = JSON.parse(localStorage.getItem("lastCitySearched"))

// Places the last city searched in the search box
if (lastCitySearched) {
    searchBoxEl.value = lastCitySearched
}

console.log(localStorage.length)

for (i = 0; i <= localStorage.length; i++) {
    var key = "key" + i;
    var searchedCity = JSON.parse(localStorage.getItem(key));
    if (searchedCity) {
        // var searchedCity = searchedCity.value;
        console.log(searchedCity)
        var historyLi = document.getElementById("historyLi");
        var newLi = document.createElement("li");
        newLi.textContent = searchedCity;
        newLi.setAttribute("class", "list-group-item");
        historyLi.prepend(newLi)
    }
}

// Listens for a click event on the search button
document.getElementById("searchBtn").addEventListener("click", saveLastCitySearchedToLocalStorage);

// Runs when the search button is clicked on
// Saves the search to local storage & adds button to search history
function saveLastCitySearchedToLocalStorage(event) {
    event.preventDefault()
    var cityInSearch = searchBoxEl.value
    historyList.push(cityInSearch)
    localStorage.setItem("lastCitySearched", JSON.stringify(cityInSearch));
    addSearchToHistoryList()
    saveHistoryList()
    callAjax()
}

function addSearchToHistoryList() {
    var searchedCity = searchBoxEl.value;
    var historyLi = document.getElementById("historyLi");
    var newLi = document.createElement("li");
    newLi.textContent = searchedCity;
    newLi.setAttribute("class", "list-group-item");
    historyLi.prepend(newLi)
}

function saveHistoryList() {
    for (i = 0; i < historyList.length; i++) {
        console.log(historyList.length)
        var key = "key" + i
        console.log("got here")
        console.log(key)
        localStorage.setItem(key, JSON.stringify(historyList[i]));
    }
}



// This is my APIkey
function callAjax() {
    var APIkey = "09b245b3eed9b9329fd01861ce9390d9"

    cityInSearch = searchBoxEl.value
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInSearch}&units=imperial&appid=${APIkey}`

    // // Performing .ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        city = response.name;
        date = moment().format("MMM Do YYYY");
        tempature = response.main.temp;
        console.log(tempature)
        humidity = response.main.humidity
        windSpeed = response.wind.speed;
        console.log(windSpeed)

        console.log(city)
        cityDateIconEl.textContent = city + " " + "(" + date + ")";
        temperatureEl.textContent = "Temperature: " + tempature + " " + String.fromCharCode(176) + "F";
        humidityEl.textContent = "Humidity: " + humidity
        windSpeedEl.textContent = "Wind Speed: " + windSpeed

        if( tempature <= 40) {
            uvIndex = 1
        }

        if( tempature > 40 && tempature < 50) {
            uvIndex = 2.5
        }

        if( tempature > 50 && tempature < 60) {
            uvIndex = 5.45
        }

        if( tempature > 60 && tempature < 70) {
            uvIndex = 7.5
        }

        if( tempature > 70 && tempature < 80) {
            uvIndex = 8.45
        }

        if( tempature > 80 && tempature < 100) {
            uvIndex = 9.59
        }

        uvIndexEl.textContent = "UV Index: " + uvIndex
    });
}
callAjax()