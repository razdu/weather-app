const appid = 'eb98981901058b162b2802e1ddd392b9';
//You gonna need this for caching.
// let globalWeatherData;

getInitData();

$('#forecast').on('change', () => {
    let selectedCity = $('.my-city-list option').filter(':selected').text();
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?', `q=${selectedCity}&appid=${appid}&units=metric`, function (mWeatherData, textStatus) {
        (textStatus !== 'success') ? alert('Can\'t get data') : populateWeatherData(mWeatherData)
    });
})

function populateWeatherData(weatherData) {
    // globalWeatherData = weatherData
    $('[data-city]').html(weatherData.name + ", " + weatherData.sys.country);
    $('[data-feel]').html('feels like\n ' + weatherData.main.feels_like + "&degc");
    $('[data-humidity]').html('Humidity\n ' + weatherData.main.humidity + '%');
    $('[data-temp]').html('Temp\n ' + weatherData.main.temp + "&degc");
    $('[data-maxTemp]').html('max\n ' + weatherData.main.temp_max + "&degc");
    $('[data-minTemp]').html('min\n ' + weatherData.main.temp_min + "&degc");
    $('[data-weather]').html('Info: ' + weatherData.weather[0].description);
    $('[data-wind]').html(`Wind: ${setDirection(weatherData.wind.deg)}(${weatherData.wind.deg}&weatherData.wind.deg)<br> at speed: 
                            ${weatherData.wind.speed} [<sup>Km</sup>/<sub>h</sub>]`);
}

function setDirection(deg) {
    const dirCode = ["E", "ENE", "NNE", "N", "N", "NNW", "WNW", "W", "W", "WWS", "WSS", "S", "S", "SSE", "ESE", "E"];
    return dirCode[Math.floor(deg / 22.5)]
}

function getInitData() {
    $.getJSON("./il.cities.json", function (data) {
        $("<select/>", {
            "class": "my-city-list",
            html: data.map((item) => "<option value='" + item.city + "'>" + item.city + "</option>").join("")
        }).appendTo("#forecast");
    });
}
