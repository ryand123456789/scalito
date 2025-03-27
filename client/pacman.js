const canvas = document.getElementById("pacmanCanvas");
const ctx = canvas.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {

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
let ghosts = [];
let totalFood = 0;
let totalFoodEaten = 0;
let finalScore = 0;  

// Ghost Constants
const GHOST_RADIUS = 12;

// Mouth Animation Variables
let mouthAngle = 0;
let mouthOpening = true;

// Timer Variables
let startTime = Date.now();  
let elapsedTime = 0;

// Initialize Food Grid
function initializeFoodGrid() {
    foodGrid = [];
    for (let row = 2; row < GRID_SIZE_Y - 3; row++) {
        for (let col = 2; col < GRID_SIZE_X; col++) {
            foodGrid.push({ x: col * FOOD_SIZE, y: row * FOOD_SIZE, eaten: false });
            col += 3;
            totalFood += 1;
        }
        row += 3;
        totalFood += 1;
    }
}

// Ghost Constructor
function createGhost(x, y, color, gspeed) {
    return {
        x: x,
        y: y,
        direction: 'right',
        color: color,
        move() {
            let decision = Math.random()*100; 
            let dx = pacmanX - this.x;
            let dy = pacmanY - this.y;
           // two functions let decision = Math.random
            if((decision % 50)!= 0){
                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 0) this.x += Math.random()*gspeed;
                    else this.x -= Math.random()*gspeed;
                } else {
                    if (dy > 0) this.y += Math.random()*gspeed;
                    else this.y -= Math.random()*gspeed;
                }  
            }
            else{
                this.x += (Math.random()*6)-3;
                this.y += (Math.random()*6)-3;
            }

            // Boundary collision check
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
    ghosts.push(createGhost(100, 100, "red", 1.5));
    ghosts.push(createGhost(400, 100, "pink", 2));
    ghosts.push(createGhost(100, 400, "blue", 2.5));
    ghosts.push(createGhost(400, 400, "orange", 3.5));
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
            totalFoodEaten += 1;
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
    if(!isGameOver){  
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);  // Elapsed time in seconds
    }
}


// Draw the Timer
function drawTimer() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Time: " + elapsedTime + "s", WIDTH - 100, 30); // Display elapsed time
}

let xAxis= 0; 
let yAxis= 0;

// Handle Gamepad State (Joystick Input)
function getGamepadState() {
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];

    if (gamepad) {
        //resert
        if(gamepad.buttons[8].pressed)
            {
                location.reload();
            }
        if(!isGameOver){
        if(!(gamepad.axes[0] < 0.2 && gamepad.axes[0] > -0.2)){
            xAxis = gamepad.axes[0];
            console.log("set xAxis");
            yAxis = 0;
        }
        if(!(gamepad.axes[1] < 0.2 && gamepad.axes[1] > -0.2)){
            yAxis = gamepad.axes[1];
            console.log("set yAxis");
            xAxis = 0;
        }
         if (xAxis === 1 )
            {
                pacmanDirection = "right";
                yAxis = 0;
                movePacman();
            }
        if (xAxis === -1)
            {
                pacmanDirection = "left";
                movePacman();
            }
        if (yAxis === -1)
            {
                pacmanDirection = "up";
                movePacman();
            }
        if (yAxis === 1 )
            {
                pacmanDirection = "down";
                movePacman();
            }
            console.log("yAxis "+yAxis);
            console.log("xAxis "+xAxis);
        }}
        // Boundaries
        if (pacmanX < PACMAN_RADIUS) pacmanX = PACMAN_RADIUS;
        if (pacmanX > WIDTH - PACMAN_RADIUS) pacmanX = WIDTH - PACMAN_RADIUS;
        if (pacmanY < PACMAN_RADIUS) pacmanY = PACMAN_RADIUS;
        if (pacmanY > HEIGHT - PACMAN_RADIUS) pacmanY = HEIGHT - PACMAN_RADIUS;
  
    // restarts the game
}

// Draw the Game
function draw() {

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    if (totalFood === 0) {
        isGameOver = true;
    }

    if (isGameOver) {
        finalScore = totalFoodEaten / elapsedTime ;
        finalScore = Math.round(finalScore);
        ctx.font = "25px monospace";
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,WIDTH,HEIGHT); 
        if(totalFood != 0){
            ctx.fillStyle = "white";
            ctx.fillText("You died. Your score is ", WIDTH / 2 - 175, HEIGHT / 2);
            ctx.fillText(finalScore + " pieces of food per second", WIDTH / 2 - 200, HEIGHT / 2+50); 
            ctx.font = "15px monospace";
            ctx.fillText("Time elapsed: " + elapsedTime + " seconds" , WIDTH / 2 - 225, HEIGHT / 2+215);  
            ctx.fillText("Food eaten:  " + totalFoodEaten + " pieces" , WIDTH / 2 -225 , HEIGHT / 2+230);
            ctx.fillText("Press R to play again ", WIDTH / 2 - 80, HEIGHT / 2+75);
        }
        if(totalFood === 0){
        ctx.fillText("You win! Your score is ", WIDTH / 2 - 175, HEIGHT / 2);
        ctx.fillText(finalScore + " pieces of food per second", WIDTH / 2 - 200, HEIGHT / 2+50);
        ctx.font = "15px monospace";
        ctx.fillText("Time elapsed: " + elapsedTime + " seconds" , WIDTH / 2 - 225, HEIGHT / 2+215);
        ctx.fillText("Food eaten:  " + totalFoodEaten + " pieces" , WIDTH / 2 -225, HEIGHT / 2+230);
        ctx.fillText("Press R to play again ", WIDTH / 2 - 80 , HEIGHT / 2+75);
        }
    }
    if(!isGameOver){
        drawPacman();
        drawFoodGrid();
        checkFoodCollision();

    ghosts.forEach(ghost => {
        ghost.move(); 
        ghost.draw();
    });
    }

    checkGhostCollision();

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 30);

    drawTimer(); 
    getGamepadState();  // Check gamepad state
    updateTimer(); 
    requestAnimationFrame(draw);
}

// Initialize game elements
initializeFoodGrid();
initializeGhosts();
draw();
})