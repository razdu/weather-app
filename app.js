const appid = 'eb98981901058b162b2802e1ddd392b9';
//You gonna need this for caching.
// let globalWeatherData;

getInitData();

$('#forecast').on('change', () => {
    $.getJSON('https://api.openweathermap.org/data/2.5/weather?', `q=${$('.my-city-list option').filter(':selected').text()}&appid=${appid}&units=metric`, function (mWeatherData, textStatus) {
        (textStatus !== 'success') ? alert('Can\'t get data') : populateWeatherData(mWeatherData)
    });
})

function populateWeatherData(weatherData) {
    // globalWeatherData = weatherData
    $('[data-city]').text(weatherData.name + ", " + weatherData.sys.country);
    $('[data-feel]').text('feels like\n ' + weatherData.main.feels_like + "&degc");
    $('[data-humidity]').text('Humidity\n ' + weatherData.main.humidity + '%');
    $('[data-temp]').text('Temp\n ' + weatherData.main.temp + "&degc");
    $('[data-maxTemp]').text('max\n ' + weatherData.main.temp_max + "&degc");
    $('[data-minTemp]').text('min\n ' + weatherData.main.temp_min + "&degc");
    $('[data-weather]').text('Info: ' + weatherData.weather[0].description);
    $('[data-wind]').html(`Wind: ${setDirection(weatherData.wind.deg)}(${weatherData.wind.deg}&weatherData.wind.deg)<br> at speed: 
                            ${weatherData.wind.speed} [<sup>Km</sup>/<sub>h</sub>]`);
}

function setDirection(deg) {
    const dirCode = ["E", "ENE", "NNE", "N", "N", "NNW", "WNW", "W", "W", "WWS", "WSS", "S", "S", "SSE", "ESE", "E"];
    return dirCode[Math.floor(deg / 22.5)]
}

function getInitData() {
    $.getJSON("./il.cities.json", function (data) {
        $("#forecast").append($("<select/>", {
            "class": "my-city-list",
            html: data.map((item) => "<option value='" + item.city + "'>" + item.city + "</option>").join("")
        }));
    });
}
