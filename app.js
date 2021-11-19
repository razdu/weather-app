const appid = '';
let weatherData;

$.getJSON("./il.cities.json", function (data) {
    let items = [];
    $.each(data, function (key, val) {
        items.push("<option value='" + val.city + "'>" + val.city + "</option>");
    });

    $("<select/>", {
        "class": "my-city-list",
        html: items.join("")
    }).appendTo("#forecast");
});

$('#forecast').on('change', () => {
    let selectedCity = $('.my-city-list option').filter(':selected').text();
    let url = 'https://api.openweathermap.org/data/2.5/weather?'
    let data = `q=${selectedCity}&appid=${appid}&units=metric`
    console.log(selectedCity);
    $.getJSON(url, data,
        function (data, textStatus, jqXHR) {
            if (textStatus == 'success') {
                weatherData = data;
                $('[data-city]').html(weatherData.name+", "+weatherData.sys.country);
                $('[data-feel]').html('feels like\n '+weatherData.main.feels_like + "&degc");
                $('[data-humidity]').html('Humidity\n '+weatherData.main.humidity + '%');
                $('[data-temp]').html('Temp\n '+weatherData.main.temp + "&degc");
                $('[data-maxTemp]').html('max\n '+weatherData.main.temp_max + "&degc");
                $('[data-minTemp]').html('min\n '+weatherData.main.temp_min + "&degc");
                $('[data-weather]').html('Info: '+weatherData.weather[0].description);
                let deg = weatherData.wind.deg;
                let degDir = setDirection(deg);
                $('[data-wind]').html(`Wind: ${degDir}(${deg}&deg)<br> at speed: 
                        ${weatherData.wind.speed} [<sup>Km</sup>/<sub>h</sub>]`);
            }
            else{
                alert('city not found or not hava an info!');
            }
        }
    );
})

function setDirection(deg){
    const dirCode = ["E","ENE","NNE","N","N","NNW","WNW","W","W","WWS","WSS","S","S","SSE","ESE","E"];
    let i = Math.floor(deg/22.5);
    return dirCode[i]
}
