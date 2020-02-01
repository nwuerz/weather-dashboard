$(document).ready(function () { 

var searchDiv = $('.searchDiv');
var searchBtn = $('.searchBtn');
var cityQuery = $('#cityQuery'); 
var currentCityDiv = $('.currentCityDiv');
var forecastDiv = $('.forecastDiv');


searchBtn.on("click", function () {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery.val() + "&appId=60d05752da37a46049341d1d3af701da";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    console.log(cityQuery.val()); 
  });
});

});