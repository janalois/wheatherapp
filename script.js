const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="; // Länken till APIn där datan hämtas in.
const apiKey = "dc75337ee5abd0af183221a7c1e91f33"; // Min personliga API nyckel.

const weatherIcon = document.querySelector(".weather-icon");

// Funktionen som hämtar och fördelar väderdatan till sina platser i websidan.
async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
      document.querySelector(".status").innerHTML = "Mulet";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
      document.querySelector(".status").innerHTML = "Klart";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/Rain.png";
      document.querySelector(".status").innerHTML = "Nederbörd";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
      document.querySelector(".status").innerHTML = "Duggregn";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
      document.querySelector(".status").innerHTML = "Dimma";
    }
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";
  }
}

// En timer som uppdaterar väderdatan var 30e minut.
var intervalId = window.setInterval(function () {
  checkWeather("stockholm");
}, 1800000);

checkWeather("stockholm");

// Funktionen som visar datum och tid och uppdaterar den varje sekund.
function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " - ");
  timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 1000);
