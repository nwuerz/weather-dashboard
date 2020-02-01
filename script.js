var searchDiv = $('.searchDiv');
var searchBtn = $('.searchBtn');
var cityQuery = $('#cityQuery');
var currentCityDiv = $('.currentCityDiv');
var forecastDiv = $('.forecastDiv');

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + 'dallas' + "&appId=60d05752da37a46049341d1d3af701da";
 
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    searchBtn.on("click", function () {
      console.log(response);
      console.log(cityQuery.val());
    })
});
