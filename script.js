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
    var cityName = $("<h5>");
    cityName.text(response.name);
    currentCityDiv.append(cityName);

    var todaysDate = $("<p>");
    //set icon
    var icon = $("<img>");
    console.log(response.weather[0].icon);
    var iconUrl = 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png';
    icon.attr("src", iconUrl);
    currentCityDiv.append(icon);
    //set temperature
    var temp = $("<p>");
    temp.text( 'Temperature: ' + Math.round(((response.main.temp - 273.15) * 1.8) + 32) + "°F");
    currentCityDiv.append(temp);
    // set humidity
    var humidity = $("<p>");
    humidity.text( 'Humidity: ' + response.main.humidity);
    currentCityDiv.append(humidity);
    //set windspeed
    var windSpeed = $("<p>");
    windSpeed.text('Wind Speed: ' + response.wind.speed + ' MPH');
    currentCityDiv.append(windSpeed);
    //set UV index
    var uvIndex = $("<p>");
    // uvIndex.text('UV index: ' + )


  });
});

});