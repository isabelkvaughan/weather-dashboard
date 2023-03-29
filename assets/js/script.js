var locationFormEl = document.querySelector('#location-form');
var searchBtn = document.querySelector('#search-btn');
var searchHistoryEl = document.querySelector('#search-history');
var cityInputEl = document.querySelector('#city-input');
var todayForecastContainerEl = document.querySelector('#today-forecast-container');
var weekForecastContainerEl = document.querySelector('#week-forecast-container');

var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = cityInputEl.value.trim();

  if (city) {
    getCityWeather(city);
    forecastContainerEl.textContent = '';
    weekForecastContainerEl.textContent = '';
    cityInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

var getCityWeather = function (city) {
  var geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=ed71e37a2dd2bda931147d3d759a0f6f';

  fetch(geoApiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json()
        .then(function (data) {
          console.log(data);
          var lat = data[0].lat;
          var lon = data[0].lon;
          var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=ed71e37a2dd2bda931147d3d759a0f6f';
          fetch(weatherApiUrl)
            .then(function (response) {
              if (response.ok) {
                response.json()
                .then(function (data) {
                  console.log(data);
                  displayTodaysWeather(data);
                  displayWeeksWeather(data);
                });
              } else {
                alert('Error: ' + response.statusText);
              }
            })
            .catch(function (error) {
              alert('Unable to connect to Open Weather');
            });
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to Open Weather');
    });
};

var displayTodaysWeather = function (weatherData) {
  // Today's weather
  todayForecastContainerEl.classList.add("todays-weather");
  // City name & date
  var todayHeadingEl = document.createElement("h4");
  todayHeadingEl.textContent = weatherData.city.name + ", " + dayjs.unix(weatherData.list[0].dt).format('DD/MM/YYYY');
  todayForecastContainerEl.appendChild(todayHeadingEl);

  // Today's temp
  var todayTempEl = document.createElement("p");
  todayTempEl.textContent = "Temp: " + weatherData.list[0].main.temp + "°C";
  todayForecastContainerEl.appendChild(todayTempEl);

  // Today's feels like temp
  var todayFeelsLikeEl = document.createElement("p");
  todayFeelsLikeEl.textContent = "Feels like: " + weatherData.list[0].main.feels_like + "°C";
  todayForecastContainerEl.appendChild(todayFeelsLikeEl);

  // Today's wind speed
  var todayWindEl = document.createElement("p");
  todayWindEl.textContent = "Wind Speed: " + weatherData.list[0].wind.speed + " km/h";
  todayForecastContainerEl.appendChild(todayWindEl);

  // Today's humidity
  var todayHumidityEl = document.createElement("p");
  todayHumidityEl.textContent = "Humidity: " + weatherData.list[0].main.humidity + "%";
  todayForecastContainerEl.appendChild(todayHumidityEl);
};

var displayWeeksWeather = function (weatherData) {
  // Day 2-5 weather
  weekForecastContainerEl.classList.add("weeks-weather");

  // Day 2 Box
  var dayTwoEl = document.createElement("div");
  dayTwoEl.classList.add("box");

  // Day 2 date
  var dayTwoHeadingEl = document.createElement("h5");
  dayTwoHeadingEl.textContent = dayjs.unix(weatherData.list[8].dt).format('DD/MM/YYYY');
  dayTwoEl.appendChild(dayTwoHeadingEl);

  // Day 2 temp
  var dayTwoTempEl = document.createElement("p");
  dayTwoTempEl.textContent = "Temp: " + weatherData.list[8].main.temp + "°C";
  dayTwoEl.appendChild(dayTwoTempEl);

  // Day 2 feels like temp
  var dayTwoFeelsLikeEl = document.createElement("p");
  dayTwoFeelsLikeEl.textContent = "Feels like: " + weatherData.list[8].main.feels_like + "°C";
  dayTwoEl.appendChild(dayTwoFeelsLikeEl);

  // Day 2 wind speed
  var dayTwoWindEl = document.createElement("p");
  dayTwoWindEl.textContent = "Wind Speed: " + weatherData.list[8].wind.speed + " km/h";
  dayTwoEl.appendChild(dayTwoWindEl);

  // Day 2 humidity
  var dayTwoHumidityEl = document.createElement("p");
  dayTwoHumidityEl.textContent = "Humidity: " + weatherData.list[8].main.humidity + "%";
  dayTwoEl.appendChild(dayTwoHumidityEl);

  weekForecastContainerEl.appendChild(dayTwoEl);

  // Day 3 Box
  var dayThreeEl = document.createElement("div");
  dayThreeEl.classList.add("box");
 
  // Day 3 date
  var dayThreeHeadingEl = document.createElement("h5");
  dayThreeHeadingEl.textContent = dayjs.unix(weatherData.list[16].dt).format('DD/MM/YYYY');
  dayThreeEl.appendChild(dayThreeHeadingEl);
 
  // Day 3 temp
  var dayThreeTempEl = document.createElement("p");
  dayThreeTempEl.textContent = "Temp: " + weatherData.list[16].main.temp + "°C";
  dayThreeEl.appendChild(dayThreeTempEl);
 
  // Day 3 feels like temp
  var dayThreeFeelsLikeEl = document.createElement("p");
  dayThreeFeelsLikeEl.textContent = "Feels like: " + weatherData.list[16].main.feels_like + "°C";
  dayThreeEl.appendChild(dayThreeFeelsLikeEl);
 
  // Day 3 wind speed
  var dayThreeWindEl = document.createElement("p");
  dayThreeWindEl.textContent = "Wind Speed: " + weatherData.list[16].wind.speed + " km/h";
  dayThreeEl.appendChild(dayThreeWindEl);
 
  // Day 3 humidity
  var dayThreeHumidityEl = document.createElement("p");
  dayThreeHumidityEl.textContent = "Humidity: " + weatherData.list[16].main.humidity + "%";
  dayThreeEl.appendChild(dayThreeHumidityEl);
 
  weekForecastContainerEl.appendChild(dayThreeEl);

  // Day 4 Box
  var dayFourEl = document.createElement("div");
  dayFourEl.classList.add("box");

  // Day 4 date
  var dayFourHeadingEl = document.createElement("h5");
  dayFourHeadingEl.textContent = dayjs.unix(weatherData.list[24].dt).format('DD/MM/YYYY');
  dayFourEl.appendChild(dayFourHeadingEl);

  // Day 4 temp
  var dayFourTempEl = document.createElement("p");
  dayFourTempEl.textContent = "Temp: " + weatherData.list[24].main.temp + "°C";
  dayFourEl.appendChild(dayFourTempEl);

  // Day 4 feels like temp
  var dayFourFeelsLikeEl = document.createElement("p");
  dayFourFeelsLikeEl.textContent = "Feels like: " + weatherData.list[24].main.feels_like + "°C";
  dayFourEl.appendChild(dayFourFeelsLikeEl);

  // Day 4 wind speed
  var dayFourWindEl = document.createElement("p");
  dayFourWindEl.textContent = "Wind Speed: " + weatherData.list[24].wind.speed + " km/h";
  dayFourEl.appendChild(dayFourWindEl);

  // Day 4 humidity
  var dayFourHumidityEl = document.createElement("p");
  dayFourHumidityEl.textContent = "Humidity: " + weatherData.list[24].main.humidity + "%";
  dayFourEl.appendChild(dayFourHumidityEl);

  weekForecastContainerEl.appendChild(dayFourEl);

  // Day 5 Box
  var dayFiveEl = document.createElement("div");
  dayFiveEl.classList.add("box");

  // Day 5 date
  var dayFiveHeadingEl = document.createElement("h5");
  dayFiveHeadingEl.textContent = dayjs.unix(weatherData.list[32].dt).format('DD/MM/YYYY');
  dayFiveEl.appendChild(dayFiveHeadingEl);

  // Day 5 temp
  var dayFiveTempEl = document.createElement("p");
  dayFiveTempEl.textContent = "Temp: " + weatherData.list[32].main.temp + "°C";
  dayFiveEl.appendChild(dayFiveTempEl);

  // Day 5 feels like temp
  var dayFiveFeelsLikeEl = document.createElement("p");
  dayFiveFeelsLikeEl.textContent = "Feels like: " + weatherData.list[32].main.feels_like + "°C";
  dayFiveEl.appendChild(dayFiveFeelsLikeEl);

  // Day 5 wind speed
  var dayFiveWindEl = document.createElement("p");
  dayFiveWindEl.textContent = "Wind Speed: " + weatherData.list[32].wind.speed + " km/h";
  dayFiveEl.appendChild(dayFiveWindEl);

  // Day 5 humidity
  var dayFiveHumidityEl = document.createElement("p");
  dayFiveHumidityEl.textContent = "Humidity: " + weatherData.list[32].main.humidity + "%";
  dayFiveEl.appendChild(dayFiveHumidityEl);

  weekForecastContainerEl.appendChild(dayFiveEl);

};

locationFormEl.addEventListener('submit', formSubmitHandler);