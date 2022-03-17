// API Key
var apiKey = "d34c5a7f5b829f5df306f1143caac581";

// Displays the Weather as of Now
var currentWeather = function () {
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=alerts&appid="+apiKey;

        fetch(apiURL).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            }
        }).catch(function (error) {
            alert("Unable to connect to Open Weather");
        });
};

currentWeather();