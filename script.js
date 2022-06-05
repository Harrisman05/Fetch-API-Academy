
console.log("hello");
const fname = "Harley";

const container = document.querySelector(".container");

container.textContent = fname;

fetch('https://api.football-data.org/v4/teams/19m')
    .then(res => console.log(res));
