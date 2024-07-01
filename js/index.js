"use strict";

const searchLocationInput = document.getElementById("searchLocation");
const todayDay = document.getElementById("todayDay");
const todayWeek = document.getElementById("todayWeek");
const weatherCity = document.getElementById("weatherCity");
const currentTempc = document.getElementById("currentTempc");
const conditionCuurr = document.getElementById("conditionCuurr");
const imgToday = document.getElementById("imgToday");
const humidityWeather = document.getElementById("humidityWeather");
const windKph = document.getElementById("windKph");
const windDir = document.getElementById("windDir");
const weatherTomorrow = document.getElementById("weatherTomorrow");
const iconTomorrow = document.getElementById("iconTomorrow");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const forecastTomo = document.getElementById("forecastTomo");
const afterTomo = document.getElementById("afterTomo");
const iconAfterTomo = document.getElementById("iconAfterTomo");
const degreeAfterTomo = document.getElementById("degreeAfterTomo");
const smallDegree = document.getElementById("smallDegree");
const forecastAfterTomo = document.getElementById("forecastAfterTomo");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    weatherData(`${lat} , ${long} `);
  });
} else {
  console.log("Not Allowed");
}

async function weatherData(query) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q= ${query} &days=3&key=d5b38a441e9f4f2da9d151745243006`
  );
  const data = await response.json();
  displayWeatherDate(data);
  displayTomorrow(data);
  displayAfterTomorrow(data);
}

searchLocationInput.addEventListener("input", function (e) {
  weatherData(e.target.value);
});

function displayWeatherDate(data) {
  const dateToday = data.current.last_updated;
  const date = new Date(dateToday);
  const weekDay = date.toLocaleDateString("en-us", { weekday: "long" });
  const monthDay = date.getDate();
  const todyWeek = date.toLocaleString("en-us", { month: "long" });
  const dataLocation = data.location.name;
  const tempc = data.current.temp_c;
  const text = data.current.condition.text;
  const photoIcon = data.current.condition.icon;
  const humidityToday = data.current.humidity;
  const weatherWind = data.current.wind_kph;
  const weatherDirection = data.current.wind_dir;

  todayDay.innerHTML = weekDay;
  todayWeek.innerHTML = `${monthDay} ${todyWeek} `;
  weatherCity.innerHTML = dataLocation;
  currentTempc.innerHTML = `${tempc}<sup>o</sup>C`;
  conditionCuurr.innerHTML = text;
  imgToday.setAttribute("src", photoIcon);
  humidityWeather.innerHTML = `${humidityToday}<span>%</span>`;
  windKph.innerHTML = `${weatherWind}<span>km/h</span>`;
  windDir.innerHTML = weatherDirection;
}

function displayTomorrow({ forecast }) {
  const weatherTomo = new Date(forecast.forecastday[1].date);
  const weekTomo = weatherTomo.toLocaleDateString("en-us", { weekday: "long" });
  const photoTomo = forecast.forecastday[1].day.condition.icon;
  const maxtempTomo = forecast.forecastday[1].day.maxtemp_c;
  const mintempTomo = forecast.forecastday[1].day.mintemp_c;
  const forecastText = forecast.forecastday[1].day.condition.text;

  weatherTomorrow.innerHTML = weekTomo;
  iconTomorrow.setAttribute("src", photoTomo);
  maxTemp.innerHTML = `${maxtempTomo}<sup>o</sup>C`;
  minTemp.innerHTML = `${mintempTomo}<sup>o</sup>`;
  forecastTomo.innerHTML = forecastText;
}

function displayAfterTomorrow({ forecast }) {
  const weatherAfterTomo = new Date(forecast.forecastday[2].date);
  const weekAfterTomo = weatherAfterTomo.toLocaleString("en-us", {
    weekday: "long",
  });
  const photoAfter = forecast.forecastday[2].day.condition.icon;
  const degreeAfter = forecast.forecastday[2].day.maxtemp_c;
  const smallAfterDegree = forecast.forecastday[2].day.mintemp_c;
  const forecastAfterTomorrow = forecast.forecastday[1].day.condition.text;

  afterTomo.innerHTML = weekAfterTomo;
  iconAfterTomo.setAttribute("src", photoAfter);
  degreeAfterTomo.innerHTML = `${degreeAfter}<sup>o</sup>C`;
  smallDegree.innerHTML = `${smallAfterDegree}<sup>o</sup>`;
  forecastAfterTomo.innerHTML = forecastAfterTomorrow;
}
