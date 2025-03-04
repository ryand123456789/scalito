//Addison Wood
// attempt at a pac man game
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;

document.addEventListener("DOMContentLoaded", () => {
    let player = {
        x: 250,
        y: 250,
        size: 20,
        color: "yellow",
        speed: 5
    };