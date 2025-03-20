const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

// Game Constants
const PACMAN_RADIUS = 10;
const SPEED = 3;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const FOOD_SIZE = 5;
const GRID_SIZE_X = Math.floor(WIDTH / FOOD_SIZE);
const GRID_SIZE_Y = Math.floor(HEIGHT / FOOD_SIZE);

// Game State
let pacmanX = 250, pacmanY = 250;
let pacmanDirection = 'right';
let isGameOver = false;
let score = 0;
let foodGrid = [];
let ghosts = []; // Array to store ghost objects
let totalFood = 0;

// Ghost Constants
const GHOST_RADIUS = 12; // Size of the ghost

// Mouth Animation Variables
let mouthAngle = 0;
let mouthOpening = true;

// Timer Variables
let startTime = Date.now();  // Start time when the game begins
let elapsedTime = 0;         // Time elapsed during the game

// Initialize Food Grid
function initializeFoodGrid() {
    foodGrid = [];
    for (let row = 2; row < GRID_SIZE_Y - 3; row++) {
        for (let col = 2; col < GRID_SIZE_X; col++) {
            foodGrid.push({ x: col * FOOD_SIZE, y: row * FOOD_SIZE, eaten: false });
            col += Math.random() * (4) + 3;
            totalFood += 1;
        }
        row += Math.random() * (4) + 3;
        totalFood += 1;
    }
}

// Ghost Constructor
function createGhost(x, y, color) {
    return {
        x: x,
        y: y,
        direction: 'right', // Initial direction
        color: color,
        move() {
            // Chase Pac-Man: move in the shortest direction
            let dx = pacmanX - this.x; // Difference in x (horizontal)
            let dy = pacmanY - this.y; // Difference in y (vertical)

            // Move horizontally towards Pac-Man
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) {
                    this.x += Math.random(); // Move right
                } else {
                    this.x -= Math.random(); // Move left
                }
            } else {
                if (dy > 0) {
                    this.y += Math.random(); // Move down
                } else {
                    this.y -= Math.random(); // Move up
                }
            }

            // Boundary collision check for ghost
            if (this.x < GHOST_RADIUS) this.x = GHOST_RADIUS;
            if (this.x > WIDTH - GHOST_RADIUS) this.x = WIDTH - GHOST_RADIUS;
            if (this.y < GHOST_RADIUS) this.y = GHOST_RADIUS;
            if (this.y > HEIGHT - GHOST_RADIUS) this.y = HEIGHT - GHOST_RADIUS;
        },
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, GHOST_RADIUS, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    };
}

// Initialize some ghosts
function initializeGhosts() {
    ghosts.push(createGhost(100, 100, "red"));
    ghosts.push(createGhost(400, 100, "pink"));
    ghosts.push(createGhost(100, 400, "blue"));
    ghosts.push(createGhost(400, 400, "orange"));
}

// Draw Pac-Man with Directional Mouth
function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, PACMAN_RADIUS, 0, 2 * Math.PI, false);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();

    let startAngle, endAngle;
    const mouthSpeed = 0.1;
    
    if (mouthOpening) {
        mouthAngle += mouthSpeed;
        if (mouthAngle > 0.8) mouthOpening = false;
    } else {
        mouthAngle -= mouthSpeed;
        if (mouthAngle < 0) mouthOpening = true;
    }

    if (pacmanDirection === 'down') {
        startAngle = 0.2 * Math.PI + mouthAngle;
        endAngle = 0.8 * Math.PI - mouthAngle;
    } else if (pacmanDirection === 'up') {
        startAngle = 1.2 * Math.PI + mouthAngle;
        endAngle = 1.8 * Math.PI - mouthAngle;
    } else if (pacmanDirection === 'left') {
        startAngle = 0.7 * Math.PI + mouthAngle;
        endAngle = 1.3 * Math.PI - mouthAngle;
    } else if (pacmanDirection === 'right') {
        startAngle = 1.7 * Math.PI + mouthAngle;
        endAngle = 2.3 * Math.PI - mouthAngle;
    }

    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, PACMAN_RADIUS, startAngle, endAngle, false);
    ctx.lineTo(pacmanX, pacmanY);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

// Draw the food grid
function drawFoodGrid() {
    foodGrid.forEach(food => {
        if (!food.eaten) {
            ctx.fillStyle = "blue";
            ctx.fillRect(food.x, food.y, FOOD_SIZE, FOOD_SIZE);
        }
    });
}

// Check if Pac-Man eats the food
function checkFoodCollision() {
    foodGrid.forEach(food => {
        const distX = pacmanX - (food.x + FOOD_SIZE / 2);
        const distY = pacmanY - (food.y + FOOD_SIZE / 2);
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < PACMAN_RADIUS + FOOD_SIZE / 2 && !food.eaten) {
            food.eaten = true;
            score += 10;
            totalFood -= 1;
        }
    });
}

// Check if Pac-Man collides with any ghost
function checkGhostCollision() {
    ghosts.forEach(ghost => {
        const distX = pacmanX - ghost.x;
        const distY = pacmanY - ghost.y;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < PACMAN_RADIUS + GHOST_RADIUS) {
            isGameOver = true;
            console.log("hit ghost");
            console.log(distance);
        }
    });
}

// Move Pac-Man
function movePacman() {
    if (pacmanDirection === 'up') pacmanY -= SPEED;
    if (pacmanDirection === 'down') pacmanY += SPEED;
    if (pacmanDirection === 'left') pacmanX -= SPEED;
    if (pacmanDirection === 'right') pacmanX += SPEED;

    if (pacmanX < PACMAN_RADIUS) pacmanX = PACMAN_RADIUS;
    if (pacmanX > WIDTH - PACMAN_RADIUS) pacmanX = WIDTH - PACMAN_RADIUS;
    if (pacmanY < PACMAN_RADIUS) pacmanY = PACMAN_RADIUS;
    if (pacmanY > HEIGHT - PACMAN_RADIUS) pacmanY = HEIGHT - PACMAN_RADIUS;
}

// Update Timer
function updateTimer() {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);  // Elapsed time in seconds
}

// Draw the Timer
function drawTimer() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Time: " + elapsedTime + "s", WIDTH - 100, 30); // Display elapsed time
}

// Draw the Game
function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (totalFood === 0) {
        isGameOver = true;
    }

    if (isGameOver) {
        ctx.font = "30px monospace";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", WIDTH / 2 - 80, HEIGHT / 2);
        return;
    }

    drawPacman();
    drawFoodGrid();
    checkFoodCollision();

    ghosts.forEach(ghost => {
        ghost.move(); // Move ghosts to chase Pac-Man
        ghost.draw();
    });

    checkGhostCollision();

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 30);

    drawTimer(); // Display the timer

    movePacman();
    updateTimer();  // Update the timer every frame
    requestAnimationFrame(draw);
}

// Handle Keyboard Input
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") pacmanDirection = 'up';
    if (event.key === "ArrowDown") pacmanDirection = 'down';
    if (event.key === "ArrowLeft") pacmanDirection = 'left';
    if (event.key === "ArrowRight") pacmanDirection = 'right';
});

// Initialize game elements
initializeFoodGrid();
initializeGhosts();
draw();
