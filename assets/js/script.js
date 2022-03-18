// API Key
var apiKey = "d34c5a7f5b829f5df306f1143caac581";

// Variable Definitions
var currentTemperature = $('#currentWeather');

// Displays the Weather as of Now
var currentWeather = function (city) {
    var cityAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    // Checks City API
    fetch(cityAPI).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var latitude = data[0].lat;
                var longitude = data[0].lon;
                //console.log(data);

                // City Name
                var name = $('<h3></h3>').text(data[0].name);
                $('#currentWeather').append(name);

                // Checks Lat & Lon API
                var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=alerts&units=imperial&appid=" + apiKey;

                fetch(apiURL).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            //console.log(data);
                            // Temperature
                            var temp = $('<p></p>').text("Temp: " + data.current.temp);
                            $('#currentWeather').append(temp);
                            // Wind
                            var wind = $('<p></p>').text("Wind: " + data.current.wind_speed);
                            $('#currentWeather').append(wind);
                            // Humidity
                            var humidity = $('<p></p>').text("Humidity: " + data.current.humidity);
                            $('#currentWeather').append(humidity);
                            // UV Index
                            var uvi = $('<p></p>').text("Wind: " + data.current.uvi);
                            $('#currentWeather').append(uvi);
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

var futureWeather = function (city) {
    var cityAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    // Checks City API
    fetch(cityAPI).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                var latitude = data[0].lat;
                var longitude = data[0].lon;
                //console.log(data);

                // Checks Lat & Lon API
                var futureForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=current,minutely,hourly,alerts&units=imperial&appid=" + apiKey;

                fetch(futureForecast).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (data) {
                            console.log(data);
                            for (var i = 0; i < 5; i++) {
                                console.log(data.daily[i].dt);
                                var date = new Date(data.daily[i].dt);
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
    currentWeather(city);
    futureWeather(city);

});
