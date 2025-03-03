// Game variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20; // Size of the grid
const canvasSize = 700; // Size of the canvas
const snakeSpeed = 100; // Speed of the snake (in milliseconds)

canvasExpand = 400;

canvas.width = canvasSize+canvasExpand;
canvas.height = canvasSize;


let snake = [{ x: 160, y: 160 }];
let direction = { x: gridSize, y: 0 }; // Moving to the right initially
let food = generateFood();
let gameOver = false;

// Game loop
function gameLoop() {
    if (gameOver) {
        return alert("Game Over! Press OK to restart.");
    }

    setTimeout(() => {
        clearCanvas();
        moveSnake();
        checkCollision();
        drawSnake();
        drawFood();
        drawFood();
        gameLoop();
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
        snake.pop(); // Remove the tail
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

// Event listener for arrow key press to change direction
document.addEventListener("keydown", changeDirection);

// Start the game loop
gameLoop();
