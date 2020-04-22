$(document).ready(function () { 

var searchDiv = $('.searchDiv');
var searchBtn = $('.searchBtn');
var cityQuery = $('#cityQuery'); 
var currentCityDiv = $('.currentCityDiv');
var forecastDiv = $('.forecastDiv');
var owKey = "&appid=4eaac462bbd16db163a982fa95b94625";


//check for items in local storage and create a button
var storedCities = localStorage.getItem('city');
var citiesArr = [];
citiesArr.push(storedCities);
for (let i = 0; i < citiesArr.length; i++) {
  var cityBtn = $("<button>");
  cityBtn.text(citiesArr[i]);
  cityBtn.attr("class", "btn btn-light col-sm-12");
  searchDiv.append(cityBtn);
};

//display weather for an existing city ---------------------//
cityBtn.on("click", function() {
  //clear any weather info that is being displayed first
  currentCityDiv.html(" ");
  forecastDiv.html(" ");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + storedCities + owKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    //city city search to local storage
    localStorage.setItem('city', storedCities);

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
    var uvUrl =  'https://api.openweathermap.org/data/2.5/uvi/forecast?lat=' + response.coord.lat + '&lon=' + response.coord.lon + owKey;
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
      var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + response.name + ',{' + countryCode + '}'+ owKey;
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
          //forecast day div
          var forecastDayDiv = $("<div>");
          forecastDayDiv.attr("class", "col-sm-2 forecastDayDiv");
          //date element
          var todaysDate = moment().add(forecastArray[i]+1, 'days').format('l')
          var forecastDate = $("<p>");
          forecastDate.text(todaysDate);
          forecastDate.attr("class", "forecastDate");
          forecastDayDiv.append(forecastDate);
          //icon element
          var forecastIcon = $("<img>");
          var forecastIconUrl = 'https://openweathermap.org/img/wn/' + forecastArray[i].weather[0].icon + '@2x.png';
          forecastIcon.attr("src", forecastIconUrl);
          forecastDayDiv.append(forecastIcon);
          //temp element
          var forecastTemp = $("<p>");
          forecastTemp.text('Temp: ' + Math.round(((forecastArray[i].main.temp - 273.15) * 1.8) + 32) + "°F");
          forecastDayDiv.append(forecastTemp);
          //humidity element
          var forecastHumidity = $("<p>");
          forecastHumidity.text('Humidity: ' + forecastArray[i].main.humidity);
          forecastDayDiv.append(forecastHumidity);
          //append forcast day div to forecast container
          forecastDiv.append(forecastDayDiv);

        }

      });
  });
});

//display weather for a new city--------------------------------//
searchBtn.on("click", function () {
  //clear any weather info that is being displayed first
  currentCityDiv.html(" ");
  forecastDiv.html(" ");
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery.val() + owKey;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    //city city search to local storage
    localStorage.setItem('city', cityQuery.val());

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
    var uvUrl =  'https://api.openweathermap.org/data/2.5/uvi/forecast?lat=' + response.coord.lat + '&lon=' + response.coord.lon + owKey;
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
      var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + response.name + ',{' + countryCode + '}'+ owKey;
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
          //forecast day div
          var forecastDayDiv = $("<div>");
          forecastDayDiv.attr("class", "col-sm-2 forecastDayDiv");
          //date element
          var todaysDate = moment().add(forecastArray[i]+1, 'days').format('l')
          var forecastDate = $("<p>");
          forecastDate.text(todaysDate);
          forecastDate.attr("class", "forecastDate");
          forecastDayDiv.append(forecastDate);
          //icon element
          var forecastIcon = $("<img>");
          var forecastIconUrl = 'https://openweathermap.org/img/wn/' + forecastArray[i].weather[0].icon + '@2x.png';
          forecastIcon.attr("src", forecastIconUrl);
          forecastDayDiv.append(forecastIcon);
          //temp element
          var forecastTemp = $("<p>");
          forecastTemp.text('Temp: ' + Math.round(((forecastArray[i].main.temp - 273.15) * 1.8) + 32) + "°F");
          forecastDayDiv.append(forecastTemp);
          //humidity element
          var forecastHumidity = $("<p>");
          forecastHumidity.text('Humidity: ' + forecastArray[i].main.humidity);
          forecastDayDiv.append(forecastHumidity);
          //append forcast day div to forecast container
          forecastDiv.append(forecastDayDiv);

        }

      });
  });
});

});