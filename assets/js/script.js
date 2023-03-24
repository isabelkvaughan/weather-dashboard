var locationFormEl = document.querySelector('#location-form');
var searchBtn = document.querySelector('#search-btn');
var searchHistoryEl = document.querySelector('#search-history');
var cityInputEl = document.querySelector('#city-input');
var forecastContainerEl = document.querySelector('#forecast-container');
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
          var weatherApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=ed71e37a2dd2bda931147d3d759a0f6f';
          fetch(weatherApiUrl)
            .then(function (response) {
              if (response.ok) {
                response.json()
                .then(function (data) {
                  console.log(data);
                  displayWeather(data);
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

var displayWeather = function (weatherData) {
  console.log(weatherData.city.name);
  console.log(weatherData.city.country);
  console.log(dayjs.unix(weatherData.list[0].dt).format('DD/MM/YYYY'));
  console.log(dayjs.unix(weatherData.list[8].dt).format('DD/MM/YYYY'));
  console.log(dayjs.unix(weatherData.list[16].dt).format('DD/MM/YYYY'));
  console.log(dayjs.unix(weatherData.list[24].dt).format('DD/MM/YYYY'));
  console.log(dayjs.unix(weatherData.list[32].dt).format('DD/MM/YYYY'));
  };

locationFormEl.addEventListener('submit', formSubmitHandler);