const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.5;
let jumpPower = 20;
let platformShift = 0;

// Player object
let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speedX: 0,
    speedY: 0,
    grounded: false,
    color: "blue"
};

// Generate platforms upwards
let platforms = [];
for (let i = 0; i < 200; i++) {
    platforms.push({
        x: Math.random() * (canvas.width - 200),
        y: canvas.height - 100 - i * 100,
        width: 200,
        height: 20
    });
}

// Add floor platform
const floor = { x: 0, y: canvas.height - 50, width: canvas.width, height: 50 };
platforms.push(floor);

// Controls
let keys = { right: false, left: false, up: false };

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === ' ' && player.grounded) keys.up = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === ' ') keys.up = false;
});

// Collision detection
function collideWithPlatforms() {
    player.grounded = false;
    
    for (let p of platforms) {
        if (
            player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y < p.y + p.height &&
            player.y + player.height > p.y
        ) {
            // Collision from above
            if (player.y + player.height - player.speedY <= p.y) {
                player.speedY = 0;
                player.y = p.y - player.height;
                player.grounded = true;
            }
            // Collision from below
            else if (player.y - player.speedY >= p.y + p.height) {
                player.speedY = 0;
                player.y = p.y + p.height;
            }
            // Collision from left
            else if (player.x + player.width - player.speedX <= p.x) {
                player.speedX = 0;
                player.x = p.x - player.width;
            }
            // Collision from right
            else if (player.x - player.speedX >= p.x + p.width) {
                player.speedX = 0;
                player.x = p.x + p.width;
            }
        }
    }

    // Prevent falling through the floor
    if (player.y + player.height >= floor.y) {
        player.speedY = 0;
        player.y = floor.y - player.height;
        player.grounded = true;
    }
}

// Update function
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.right) 
    {
        player.speedX += 0.5;
    }
    else if(keys.left) {
        player.speedX += -0.5;
    }
    player.speedX = player.speedX * 0.98

    if (keys.up && player.grounded) player.speedY = -jumpPower;

    if (!player.grounded) player.speedY += gravity;
    
    player.x += player.speedX;
    player.y += player.speedY;
    
    collideWithPlatforms();
    
    // Keep the player centered while moving platforms instead
    if (player.y < canvas.height / 2) {
        let shift = canvas.height / 2 - player.y;
        platformShift += shift;
        player.y = canvas.height / 2;
        platforms.forEach(p => p.y += shift);
    }
    
    // Draw platforms
    ctx.fillStyle = 'green';
    for (let p of platforms) {
        ctx.fillRect(p.x, p.y, p.width, p.height);
    }
    
    // Draw floor
    ctx.fillRect(floor.x, floor.y, floor.width, floor.height);
    
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
}

update();
