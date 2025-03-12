// Game variables
const canvas = document.getElementById("gameCanvas");
const message = document.getElementById("message")
const ctx = canvas.getContext("2d");

const gridSize = 20; // Size of the grid
const canvasSize = 500; // Size of the canvas
const snakeSpeed = 100; // Speed of the snake (in milliseconds)
var canvasExpand = 400;

document.addEventListener("DOMContentLoaded", () => {

canvas.width = canvasSize+canvasExpand;
canvas.height = canvasSize;


let snake = [{ x: 160, y: 160 }];
let direction = { x: 0, y: 0 }; // Moving to the right initially
let food = generateFood();
let gameOver = false;

// Game loop
function gameLoop() {
    if (gameOver) {
        return alert("Game Over! Press OK to restart.");
        
        gamepad.buttons[8].pressed //this is for the reset func.
    }

    setTimeout(() => {
        clearCanvas();
        moveSnake();
        checkCollision();
        drawSnake();
        drawFood();
        drawFood();
        gameLoop();
        gamepadRep();
    }, snakeSpeed);
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "lime";
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
 // Remove the tail
    }
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Generate a random position for food
function generateFood() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

// Check for collisions
function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvasSize+canvasExpand || head.y < 0 || head.y >= canvasSize) {
        gameOver = true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

// Change direction based on key press
function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) {
                direction = { x: 0, y: -gridSize };
            }
            break;
        case "ArrowDown":
            if (direction.y === 0) {
                direction = { x: 0, y: gridSize };
            }
            break;
        case "ArrowLeft":
            if (direction.x === 0) {
                direction = { x: -gridSize, y: 0 };
            }
            break;
        case "ArrowRight":
            if (direction.x === 0) {
                direction = { x: gridSize, y: 0 };
            }
            break;
    }
            
}
let xAxis = 0;
let yAxis = 0;
let direcProxy = 5;
function gamepadRep(){
    const gamepads = navigator.getGamepads();
    const gamepad = gamepads[0];
    if(gamepad){
        if(!(gamepad.axes[0] < 0.2 && gamepad.axes[0] > -0.2)){
            xAxis = gamepad.axes[0];
            console.log("set xAxis");
        }
        if(!(gamepad.axes[1] < 0.2 && gamepad.axes[1] > -0.2)){
            yAxis = gamepad.axes[1];
            console.log("set yAxis");
        }

        if (xAxis === 1 && xAxis != -1 && direcProxy != 3)
        {
            direction = { x: gridSize, y: 0 };
            xAxis = 0;
            direcProxy = 1;

        }
        if (xAxis === -1 && xAxis != 1 && direcProxy != 1)
        {
            direction = { x: -gridSize, y: 0 };
            xAxis = 0;
            direcProxy = 3;
        }
        if (yAxis === -1 && yAxis != 1 && direcProxy!=2)
        {
            direction = { x: 0, y: -gridSize };
            yAxis = 0;
            direcProxy = 0;
        }
        if (yAxis === 1 && yAxis != -1 && direcProxy!=0)
        {
            direction = { x: 0, y: gridSize };
            yAxis = 0;
            direcProxy = 2;
        }
        console.log("yAxis "+yAxis);
        console.log("xAxis "+xAxis);
    }
}

// Event listener for arrow key press to change direction
document.addEventListener("keydown", changeDirection);

// Start the game loop
gameLoop(); 
})