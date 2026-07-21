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
