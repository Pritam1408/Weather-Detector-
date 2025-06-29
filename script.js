let searchBar = document.getElementById("searchBar");
let searchBtn = document.getElementById("searchBtn");
let weather = document.getElementById("weather");
let otherInfo = document.getElementById("searchInfo");
let backgroundVideo = document.getElementById("backgroundVideo");
window.onload = function () {
    backgroundVideo.src = "./videos/intro.mp4"
    backgroundVideo.load();
}
let weatherVideos = {
    "clear": "./videos/sunny.mp4",
    "sunny": "./videos/sunny.mp4",
    "clouds": "./videos/cloudy.mp4",
    "rain": "./videos/rain.mp4",
    "drizzle": "./videos/rain.mp4",
    "snow": "./videos/winter.mp4",
    "wind": "./videos/autumn.mp4",
    "haze": "./videos/autumn.mp4",
    "fog": "./videos/cloudy.mp4",
    "mist": "./videos/cloudy.mp4",
    "smoke": "./videos/cloudy.mp4",
    "thunderstorm": "./videos/rain.mp4",
    "dust": "./videos/autumn.mp4",
    "sand": "./videos/autumn.mp4",
    "ash": "./videos/cloudy.mp4",
    "squall": "./videos/windy.mp4",
    "tornado": "./videos/windy.mp4"
};
searchBar.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
searchBtn.onclick = function () {
    let location = searchBar.value.trim();
    let apiKey = "351bb46fa2981c2693f07180f7953f5c"

    if (location === "") {
        otherInfo.innerHTML = '<div style="text-align:center; color:red; font-size:18px; padding:20px;"><i class="fa fa-exclamation-circle"></i> Please Enter a Location</div>';
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let weatherCondition = data.weather[0].main.toLowerCase();
            console.log("Raw Weather Data:", data.weather[0]);
            console.log("Processed Weather Condition:", weatherCondition);
            let selectedVideo = weatherVideos[weatherCondition] || "./videos/intro.mp4";
            backgroundVideo.src = selectedVideo;
            backgroundVideo.load();
            backgroundVideo.play().catch(error => {
                console.log("Autoplay issue : ", error);
            });
            let weatherData = {
                temp: (data.main.temp - 273.15).toFixed(1),
                country: data.sys.country,
                feels_like: (data.main.feels_like - 273.15).toFixed(1),
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                location: data.name,
                weather: weatherCondition,
                sea: data.main.sea_level || "N/A",
                wind: data.wind.speed,
                lat: data.coord.lat,
                lon: data.coord.lon
            };
            let weatherImages = {
                clear: "./asstes/sun.png",
                sunny: "./asstes/sun.png",
                clouds: "./asstes/cloud.png",
                rain: "./asstes/rainy.png",
                drizzle: "./asstes/rainy.png",
                snow: "./asstes/snow.png",
                wind: "./asstes/windy.png",
                fog: "./asstes/cloud.png",
                haze: "./asstes/cloud.png",
                mist: "./asstes/cloud.png",
                smoke: "./asstes/cloud.png",
                thunderstorm: "./asstes/rainy.png",
                dust: "./assets/cloud.png",
                sand: "./asstes/cloud.png",
                ash: "./asstes/cloud.png",
                squall: "./asstes/windy.png",
                tornado: "./asstes/windy.png"
            };            
            let weatherImageSrc = weatherImages[weatherCondition] || "./asstes/sun.png";
            weather.innerHTML = 
                `<div class="weatherMain">
                <h1>${weatherData.temp} &#176 C</h1>
                <div class="weatherCity">
                <h3>${weatherData.location}</h3>
                <h4>${weatherData.country}</h4>
                </div>
                <div class="weatherImg">
                <img src="${weatherImageSrc}" alt=${weatherData.weather}">
                <p>${weatherData.weather.charAt(0).toUpperCase() + weatherData.weather.slice(1)}</p>
                </div>
                </div>`;
            otherInfo.innerHTML =
                `<div class="Other-info">
                <p class="feels-like">Feels Like:
                <span><b>${weatherData.feels_like}</b> &#176 C</span></p>
                <hr>
                <h2>Weather Details :</h2>
                <p>Wind Speed: <span>${weatherData.wind} km/h</span></p>
                <p>Humidity: <span>${weatherData.humidity} %</span></p>
                <p>Pressure: <span>${weatherData.pressure} mb</span></p>
                <p>Sea Level: <span>${weatherData.sea} mb</span></p>
                <hr>
                <h2>Coordintes:</h2>
                <p>Latitude: <span>${weatherData.lat} </span></p>
                <p>Longitude: <span>${weatherData.lon} </span></p>
                </div>`;
        })
    .catch((error)=>{
        console.error("Error fetching weather data: ",error);
        otherInfo.innerHTML =
        '<div style="text-align: center; color:red; font-size:18px; padding:20px;"><i class="fa fa-exclamation-circle"></i> Location Not Found</div>';
        weather.innerHTML = "";
    });
};
