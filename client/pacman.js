const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

// Game Constants
const PACMAN_RADIUS = 15;
const SPEED = 2;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Game State
let pacmanX = 250, pacmanY = 250;
let pacmanDirection = 'right'; // Directions: up, down, left, right
let isGameOver = false;

// Draw Pac-Man
function drawPacman() {
    ctx.beginPath();
    const startAngle = 0.2 * Math.PI;
    const endAngle = 1.8 * Math.PI;
    ctx.arc(pacmanX, pacmanY, PACMAN_RADIUS, startAngle, endAngle, false);
    ctx.lineTo(pacmanX, pacmanY);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

// Move Pac-Man
function movePacman() {
    if (pacmanDirection === 'up') pacmanY -= SPEED;
    if (pacmanDirection === 'down') pacmanY += SPEED;
    if (pacmanDirection === 'left') pacmanX -= SPEED;
    if (pacmanDirection === 'right') pacmanX += SPEED;

    // Boundary collision check
    if (pacmanX < PACMAN_RADIUS) pacmanX = PACMAN_RADIUS;
    if (pacmanX > WIDTH - PACMAN_RADIUS) pacmanX = WIDTH - PACMAN_RADIUS;
    if (pacmanY < PACMAN_RADIUS) pacmanY = PACMAN_RADIUS;
    if (pacmanY > HEIGHT - PACMAN_RADIUS) pacmanY = HEIGHT - PACMAN_RADIUS;
}

// Draw the Game
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT); // Clear canvas

    if (isGameOver) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", WIDTH / 2 - 80, HEIGHT / 2);
        return;
    }

    drawPacman();
    movePacman();
    requestAnimationFrame(draw);
}

// Handle Keyboard Input
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && pacmanDirection !== 'down') pacmanDirection = 'up';
    if (event.key === "ArrowDown" && pacmanDirection !== 'up') pacmanDirection = 'down';
    if (event.key === "ArrowLeft" && pacmanDirection !== 'right') pacmanDirection = 'left';
    if (event.key === "ArrowRight" && pacmanDirection !== 'left') pacmanDirection = 'right';
});

// Start the Game
draw();
