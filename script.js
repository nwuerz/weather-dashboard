var searchDiv = $('.searchDiv');
var searchBtn = $('.searchBtn');
var cityQuery = $('#cityQuery').value;
var currentCityDiv = $('.currentCityDiv');
var forecastDiv = $('.forecastDiv');

var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "60d05752da37a46049341d1d3af701da";
 
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
    
});
