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

let imageElement = document.getElementById("weather-app").style.background - image;
let videoElement= document.querySelector("weatherVideo");
let dayVideoElement = document.querySelector("dayVideo");
let nightVideoElement = document.querySelector("nightVideo");

if (currentHour >= 6 && currentHour < 18) {
    dayVideoElement.style.display = "block";
    nightVideoElement.style.display = "none";
    imageElement.url = "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/084/874/original/blue-sky-with-clouds-background-elegant_1017-26302.jpg?1686248991";

} else {
  dayVideoElement.style.display = "none";
  nightVideoElement.style.display = "block";
  imageElement.url ="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/087/730/original/night-sky.jpg?1688224903";
}
videoElement.play();
}
displayTime();

let celsiusDegree = document.querySelector("#celsius-icon");
celsiusDegree.addEventListener("click", showTemp);
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 79;
}

let fahrenheitDegree = document.querySelector("#fahrenheit");
fahrenheitDegree.addEventListener("click", convertToFahrenheit);



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

  // change the city value by user's current position
  let userCity = response.data.name;
  let city = document.querySelector(".city");
  city.innerHTML = userCity;

document.querySelector(".precipitation").innerHTML = ` Precipitation: ${response.data.main.precipitation}`;
  
document.querySelector(".humidity" ).innerHTML = `Humidity: ${response.data.main.humidity}`;

document.querySelector(".wind").innerHTML =  `Wind speed: ${Math.round(response.data.wind.speed)}`;
console.log(response.data.main);
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
