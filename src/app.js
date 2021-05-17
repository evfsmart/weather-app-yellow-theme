function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes =`0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}
// timestamp = miliseconds since Monday January 19th 1970//

function displayTemperature(response) {
let cityElement = document.querySelector("#city");
let dateAndUpdatedElement = document.querySelector("#date-and-updated");
let descriptionElement = document.querySelector("#description");
let iconElement = document.querySelector("#icon");
let humidityElement = document.querySelector("#humidity");
let temperatureElement = document.querySelector("#temperature");
let windElement = document.querySelector("#wind");

celsiusTemperature = Math.round(response.data.main.temp);

cityElement.innerHTML = response.data.name;
dateAndUpdatedElement.innerHTML = formatDate(response.data.dt * 1000);
descriptionElement.innerHTML = response.data.weather[0].description;
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
humidityElement.innerHTML = response.data.main.humidity;
temperatureElement.innerHTML = Math.round(response.data.main.temp);
windElement.innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
    let apiKey = "17a639a638a4bfe25417abb69ec4868d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = celsiusTemperature;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");