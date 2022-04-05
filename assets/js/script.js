// API Key
var apiKey = "d34c5a7f5b829f5df306f1143caac581";

// Variable Definitions
var cityList = [];
var count = 0;

// Displays the Weather as of Now
var currentWeather = function (city) {
    $('#currentWeather').empty();

    var cityAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    // Checks City API
    fetch(cityAPI).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var latitude = data[0].lat;
                var longitude = data[0].lon;
                $("#currentWeather").addClass("border");
                // City Name
                var name = $('<h3></h3>').text(data[0].name);
                $('#currentWeather').append(name);

                // Checks Lat & Lon API
                var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=" + apiKey;

                fetch(apiURL).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            // Displays Date
                            var date = new Date(data.current.dt * 1000).toLocaleDateString("en-US");
                            $(name).append(" " + date);

                            // Displays Icon
                            var icon = data.current.weather[0].icon;
                            var image = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                            var weatherIcon = $('<img></img>').attr("src", image);
                            $(name).append(weatherIcon);

                            // Temperature
                            var temp = $('<p></p>').text("Temp: " + data.current.temp + "°F");
                            $('#currentWeather').append(temp);

                            // Wind
                            var wind = $('<p></p>').text("Wind: " + data.current.wind_speed + " MPH");
                            $('#currentWeather').append(wind);

                            // Humidity
                            var humidity = $('<p></p>').text("Humidity: " + data.current.humidity + "%");
                            $('#currentWeather').append(humidity);

                            // UV Index
                            var uvi = $('<p id="uvIndex"></p>').text("UV Index: " + data.current.uvi);
                            $('#currentWeather').append(uvi);

                            if (data.current.uvi >= 0 && data.current.uvi <= 2) {
                                $("#uvIndex").css("background-color", "green").css("color", "white");
                            } else if (data.current.uvi >= 3 && data.current.uvi <= 5) {
                                $("#uvIndex").css("background-color", "yellow").css("color", "black");
                            } else if (data.current.uvi >= 6 && data.current.uvi <= 7) {
                                $("#uvIndex").css("background-color", "orange").css("color", "white");
                            } else if (data.current.uvi >= 8 && data.current.uvi <= 10) {
                                $("#uvIndex").css("background-color", "red").css("color", "white");
                            } else {
                                $("#uvIndex").css("background-color", "white").css("color", "white");
                            }
                        });
                    }
                }).catch(function (error) {
                    alert("Unable to connect to Open Weather");
                });
            });
        }
    }).catch(function (error) {
        alert("Unable to connect to Open Weather");
    });

    futureWeather(city);
};

var futureWeather = function (city) {
    $('#futureWeather').empty();

    var cityAPI = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    // Checks City API
    fetch(cityAPI).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var latitude = data[0].lat;
                var longitude = data[0].lon;

                // Checks Lat & Lon API
                var futureForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=" + apiKey;

                fetch(futureForecast).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            // Displays 5 Day Forecast
                            for (var i = 1; i < 6; i++) {
                                var col = $('<div class="col-2 card"></div>')
                                $('#futureWeather').append(col);

                                // Displays Date
                                var date = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US");
                                var displayDate = $('<h4></h4>').text(date);
                                col.append(displayDate);

                                // Displays Icon
                                var icon = data.daily[i].weather[0].icon;
                                var image = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                                var weatherIcon = $('<img></img>').attr("src", image);
                                col.append(weatherIcon);

                                // Displays Temperature
                                var temperature = $('<p></p>').text("Temp: " + data.daily[i].temp.day + "°F");
                                col.append(temperature);

                                // Displays Wind
                                var wind = $('<p></p>').text("Wind: " + data.daily[i].wind_speed + "MPH");
                                col.append(wind);

                                // Displays Humidity
                                var displayHumidity = $('<p></p>').text("Humidity: " + data.daily[i].humidity + "%");
                                col.append(displayHumidity);
                            }
                        });
                    }
                }).catch(function (error) {
                    alert("Unable to connect to Open Weather");
                });
            });
        }
    }).catch(function (error) {
        alert("Unable to connect to Open Weather");
    });
};

// Button Event Listener
$("#searchButton").on("click", function (event) {
    event.preventDefault();

    var city = $("#cityName").val();
    if (!cityList.includes(city)) {
        cityList.push(city);
        var cities = $('<li class="list-group-item list-group-item-info"></li>').text(city);
        $('#historyList').append(cities);
    }
    localStorage.setItem("City", JSON.stringify(cityList));
    currentWeather(city);
});

// History Search List Button Listener
$("#historyList").on("click", ".list-group-item", function () {
    var city = JSON.parse(localStorage.getItem("City"));
    var searchHistory = $(this).text();
    for (var i = 0; i < city.length; i++) {
        if (city[i] === searchHistory) {
            currentWeather(city[i]);
        }
    }
});