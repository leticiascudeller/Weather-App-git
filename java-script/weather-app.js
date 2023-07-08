//feature #1 In your project, display the current date and time using JavaScript: Tuesday 16:00

let now = new Date();

function showDate() {
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let dayMonth = now.getDate();
  let year = now.getFullYear();
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${day}, ${month} ${dayMonth} ${year}`;
  
}

showDate();
function displayTime(){
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${currentHour
  .toString()
  .padStart(2, "0")}:${currentMinutes.toString().padStart(2, "0")}`;

let weatherImage = document.querySelector(".weather-app");
let nightTimeImg = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/087/730/original/night-sky.jpg?1688224903`;
let dayTimeImg = `https://s3.amazonaws.com/shecodesio-production/uploads/files/000/084/874/original/blue-sky-with-clouds-background-elegant_1017-26302.jpg?1686248991`;

if (currentHour > 18){
weatherImage.style.backgroundImage = `url(${nightTimeImg})`;
} else{
 weatherImage.style.backgroundImage = `url(${dayTimeImg})`;
}
}
displayTime();

function convertToCelsius(event){
 let temperature = document.querySelector("#temperature");
 temperature.innerHTML = Math.round(celsiusTemp);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahreinheitTemp = (celsiusTemp * 9) / 5 +32;
  temperature.innerHTML = Math.round(fahreinheitTemp);
}
let celsiusTemp = null;
let fahrenheitDegree = document.querySelector("#fahrenheit");
fahrenheitDegree.addEventListener("click", convertToFahrenheit);

let celsiusDegree = document.querySelector("#celsius-icon");
celsiusDegree.addEventListener("click", convertToCelsius);



function searchCity(event) {
 event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  let city = searchInput.value;
  let key = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  let cityInput = document.querySelector(".city");
  cityInput.innerHTML = city;
  axios.get(url).then(showTemp);

}

let searchForm = document.querySelector("#search-tool");
searchForm.addEventListener("click", searchCity);

// Week 5: Current Location button

function showTemp(response) {
  // change temperature value
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = temperature;
  celsiusTemp = temperature;
  // Weather Description
  let descriptionElement = document.querySelector("#weather-description");
   descriptionElement.innerHTML = response.data.weather[0].description.toUpperCase();
  // Weather icon 
  let iconElement = document.querySelector("#iconElement");
   iconElement.setAttribute("src",`images/${response.data.weather[0].icon}.png`);
   iconElement.setAttribute("alt", response.data.weather[0].description);

  // change the city value by user's current position
  let userCity = response.data.name;
  let city = document.querySelector(".city");
  city.innerHTML = userCity;

document.querySelector(
  "#feelsLike-value"
).innerHTML = `${Math.round(response.data.main.feels_like)} °C`;
  
document.querySelector("#humidity-value" ).innerHTML = `${response.data.main.humidity}%`;

document.querySelector("#wind-value").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
console.log(response.data);
}


function userPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = `55e5c5f20e3695ee397f56f0d66ac390`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(userPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);
