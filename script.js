const loading = document.getElementById("loading");
const errorDIV = document.getElementById("error");
const container = document.getElementById("users-container");


async function loadUsers() {
    try {
        showLoading();

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();
        displayUsers(users);

    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.classList.remove("hidden");
    container.innerHTML ="";
}

function showError(message) {
errorDIV.textContent ='Error: ${message}';
errorDIV.classList.remove("hidden");
}

function displayUsers(users) {
    container.innerHTML = users.map(user
     => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <P>${user.email}</P>
            <P>${user.company.name}</P>
            <p>${user.address.city}</p>
        </div>
    `).join("");
}

loadUsers();

async function createPost(title, body , userId) {
    const response = await fetch("https://jsonplaceholder.typicod.com/posts", {
        method: "POST",
        headers: {
            "Content_Type": "application/json"

        },
        body: JSON.stringify({
            title,
            body,
            userId
        })
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }
    
    return response.json();
    
}

const newPost = await createPost(
    "My First Post"
    "This is the content of my post.",
    1
);
console.log("Created:", newPost);

let allUsers = [];

async function init() {
    allUsers = await fetchUsers();
    displayUsers(allUsers);

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = allUsers.filter(user =>
            user.name.toLowerCase().includes(query)
        );

    displayUsers(filtered);

    });
}

const sortSelect =document.getElementById("sortSelect");
sortSelect.addEventListener("change", (e) => {
    const sorted = [...allUsers];

    if (e.target.value === "az") {
        sorted.sort((a, b) => b.name.localCampare(a.name));
    }
    displayUsers(sorted);
});

const cityFilter = document.getElementById("cityFilter");
const cities = [...newSet(allUsers.map(user => user.address.city))];
cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.texContent = city;
    cityFilter.appendChild(option);
});

cityFilter.addEventListener("change", (e) => {
    const city = e.target.value;

    if (city === "all") {
        displayUsers(allUsers);

    } else {
        const filtered = allUsers.filter(user => user.address.city === city);
        displayUsers(filtered);
    }
});


const API_KEY = "72958b1e77685e6c33765ebfe693adab";
const BASE_URL = "https://api.openweathermap.org/ data/2.5/weather";

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weatherDisplay = document.getElementById("weather-display");

const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");


async function getWeather(city) {
    cost url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        showLoading();
        hideError();

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("city not found");

            }
            throw new Error("Failed to fetch weather data");
            
        }

        const data =await response.json();
        displayWeather(data);
        saveToHistory(city);


    } catch (err) {
        showError(err.message);

    } finally {
        hideLoading();
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.contry}`;

    weatherIcon.src = `https://openweather.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    temperature.textContent = `${Math.round(data.main.temp)}C`;

    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_Like)}C`;

    humidity.textContent = `${data.main.hgumidity}%`;

    wind.textContent = `${data.wind.speed}m/s`;

    pressure.textContent = `${data.main.pressure}hPa`;

    weatherDisplay.style.display = "block";

    weatherDisplay.classList.add("hidden");
}

function showLoading() {
    loading.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
}

function hideLOading() {
    loading.classList.add("hidden");

}

function showError(message) {
    error.textContent = message;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!history.includes(city)) {
        history.unshift(city);

        if (history.legth > 5) {
            history.pop();
        }
    localStorage.setItem("searchHistory", JSON.stringify(history));
    }
}

displayWeather(data);
saveToHistory(city);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

loadHistory();
