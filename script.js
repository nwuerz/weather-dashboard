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
    //set city name
    var cityName = $("<h5>");
    cityName.text(response.name);
    currentCityDiv.append(cityName);
    //set todays date
    var todaysDate = $("<h6>");
    todaysDate.text(moment().format("dddd, MMMM Do YYYY"));
    currentCityDiv.append(todaysDate);
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
    //save country code in var to be used in 5 day forecast
    var countryCode = response.sys.country;
    //save city name in var to be used in 5 day forecast-----
    //make ajax call for uv index
    var uvUrl =  'https://api.openweathermap.org/data/2.5/uvi/forecast?lat=' + response.coord.lat + '&lon=' + response.coord.lon + '&appid=60d05752da37a46049341d1d3af701da';
    $.ajax({
      url: uvUrl,
      method: "GET",
    }).then(function(response) {
      //set UV index
      var uvIndex = $("<p>");
      uvIndex.text('UV index: ' + response[0].value);
      currentCityDiv.append(uvIndex);
      });
      //make ajax call for 5 day forecast
      var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + response.name + ',{' + countryCode + '}'+ '&appid=60d05752da37a46049341d1d3af701da';
      $.ajax({
        url: forecastUrl,
        method: "GET",
      }).then(function(response) {
        //slice response to obtain only the next 5 days
        console.log(response.list.slice(0, 5));
        //store forecast array to a variable
        var forecastArray = response.list.slice(0, 5);
        console.log(forecastArray);
        //create an element for each item that we need to display in the forecast array
        for (let i = 0; i < forecastArray.length; i++) {
          //date element
          var forecastDate = $("<p>");
          forecastDate.text(forecastArray[i].wind.speed);
          forecastDiv.append(forecastDate);
          //icon element
          var forecastIcon = $("<img>");
          var forecastIconUrl = 'https://openweathermap.org/img/wn/' + forecastArray[i].weather[0].icon + '@2x.png';
          forecastIcon.attr("src", forecastIconUrl);
          forecastDiv.append(forecastIcon);
          //temp element
          var forecastTemp = $("<p>");
          forecastTemp.text('Temp: ' + Math.round(((forecastArray[i].main.temp - 273.15) * 1.8) + 32) + "°F");
          forecastDiv.append(forecastTemp);
          //humidity element
          var forecastHumidity = $("<p>");
          forecastHumidity.text('Humidity: ' + forecastArray[i].main.humidity);
          forecastDiv.append(forecastHumidity);

        }


        
        //append each element to its div

        // for (let i = 0; i < forecastArray.length; i++) {
        //   var dayOne = $("<div>");
        //   dayOne.text()
        // }

      });
  });
});

});