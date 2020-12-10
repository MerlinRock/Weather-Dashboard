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

    if(localStorage.key = key.toString) {
    var searchedCity = JSON.parse(localStorage.getItem(key));
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
    test()
}

function addSearchToHistoryList() {
    var searchedCity = searchBoxEl.value;
    var historyLi = document.getElementById("historyLi");
    var newLi = document.createElement("li");
    newLi.textContent = searchedCity;
    newLi.setAttribute("class", "list-group-item");
    historyLi.prepend(newLi)
}

function test() {
    for (i = 0; i < historyList.length; i++) {
        console.log(historyList.length)
        var key = "key" + i
        console.log("got here")
        console.log(key)
        localStorage.setItem(key, JSON.stringify(historyList[i]));
    }
}

console.log(historyList)




// This is my APIkey
var APIkey = "09b245b3eed9b9329fd01861ce9390d9"

cityInSearch = searchBoxEl.value
var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInSearch}&appid=${APIkey}`

// // Performing .ajax call
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response)
});