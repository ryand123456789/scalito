const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gravity = 0.5;
let jumpPower = 30;
let platformShift = 0;
let cameraOffsetX = 0;
let cameraOffsetY = 0;
let jumpBuffer = false; // Buffer jump input
let baseHeight = 0;
let platformColor = 'green'
let textColor = 'black';

// canvas.backgroundColor;


// Player object
let player = {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 25,
    width: 50,
    height: 50,
    speedX: 0,
    speedY: 0,
    grounded: false,
    color: "blue"
};

// Generate platforms upwards
let platforms = [];
for (let i = 0; i < 50000; i++) {
    platforms.push({
        x: 10000-(Math.random() * (canvas.width + 20000)),
        y: canvas.height - 100 - i * 10,
        width: 800*Math.random(),
        height: 700*Math.random()
    });
}

// Add floor platform
const floor = { x: -40000, y: canvas.height - 200, width: canvas.width+80000, height: 3000 };
platforms.push(floor);

// Controls
let keys = { right: false, left: false, up: false };

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === ' ') jumpBuffer = true; // Store jump input
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === ' ') jumpBuffer = false;
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

function colorChange()
{
    console.log(baseHeight);
    if(baseHeight > 4500)
    {
        canvas.style.background = "rgb(0, 0, 0)";
        platformColor = "rgb(255, 255, 255)";
        console.log("ran");
        player.color = "rgb(255, 0, 255)";
        textColor = "rgb(0, 255, 55)";
    }
    else if(baseHeight > 4300)
        {
            canvas.style.background = "rgb(44, 44, 44)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 4100)
        {
            canvas.style.background = "rgb(255, 0, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 4000)
        {
            canvas.style.background = "rgb(255, 0, 76)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3900)
        {
            canvas.style.background = "rgb(255, 0, 140)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3800)
        {
            canvas.style.background = "rgb(255, 0, 234)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3700)
        {
            canvas.style.background = "rgb(225, 0, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3600)
        {
            canvas.style.background = "rgb(183, 0, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3500)
        {
            canvas.style.background = "rgb(153, 0, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3400)
        {
            canvas.style.background = "rgb(119, 0, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3300)
        {
            canvas.style.background = "rgb(89, 0, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3200)
        {
            canvas.style.background = "rgb(4, 0, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3100)
        {
            canvas.style.background = "rgb(0, 47, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 3000)
        {
            canvas.style.background = "rgb(0, 89, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2900)
        {
            canvas.style.background = "rgb(0, 140, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2800)
        {
            canvas.style.background = "rgb(0, 183, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2700)
        {
            canvas.style.background = "rgb(0, 225, 255)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2600)
        {
            canvas.style.background = "rgb(0, 255, 242)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2500)
        {
            canvas.style.background = "rgb(0, 255, 200)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2400)
        {
            canvas.style.background = "rgb(0, 255, 128)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2300)
        {
            canvas.style.background = "rgb(0, 255, 21)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2200)
        {
            canvas.style.background = "rgb(60, 255, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2100)
        {
            canvas.style.background = "rgb(200, 255, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 2000)
        {
            canvas.style.background = "rgb(255, 251, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 1900)
        {
            canvas.style.background = "rgb(255, 208, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 1800)
        {
            canvas.style.background = "rgb(255, 166, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 1700)
        {
            canvas.style.background = "rgb(255, 123, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 1600)
        {
            canvas.style.background = "rgb(255, 81, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 1500)
        {
            canvas.style.background = "rgb(255, 38, 0)";
            platformColor = "rgb(0, 0, 0)";
            textColor = 'black';
        }
    else if(baseHeight > 1400)
        {
            canvas.style.background = "rgb(197, 30, 0)";
            platformColor = "rgb(0, 0, 0)";
            player.color = "rgb(29, 29, 29)";
        }
    else if(baseHeight > 1300)
        {
            canvas.style.background = "rgb(139, 21, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 1200)
        {
            canvas.style.background = "rgb(80, 12, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 1000)
        {
            canvas.style.background = "rgb(20, 3, 0)";
            platformColor = "rgb(0, 0, 0)";
        }
    else if(baseHeight > 800)
        {
            canvas.style.background = "rgb(0, 0, 0)";
            platformColor = "rgb(3, 24, 16)";
        }
    else if(baseHeight > 600)
        {
            canvas.style.background = "rgb(0, 13, 73)";
            platformColor = "rgb(5, 27, 0)";
        }
    else if(baseHeight > 400)
        {
            canvas.style.background = "rgb(0, 26, 139)";
            platformColor = "rgb(9, 46, 0)";
            textColor = 'white';
        }
    else if(baseHeight > 400)
    {
        canvas.style.background = "rgb(0, 36, 199)";
        platformColor = "rgb(13, 63, 0)";
    }
    else if(baseHeight > 200)
    {
        canvas.style.background = "rgb(44, 128, 255)";
        platformColor = "rgb(20, 99, 0)";;
        player.color = "rgb(0, 204, 255)"
    }
}



function resizeCanvas() {
    // Set canvas width and height to the window's inner width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
// Update function
function update() {
    resizeCanvas();
    colorChange();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.right) {
        player.speedX += 0.5;
    } else if (keys.left) {
        player.speedX -= 0.5;
    }
    player.speedX *= 0.99; // More gradual deceleration for better control

    if (!player.grounded) player.speedY += gravity;
    
    player.x += player.speedX;
    player.y += player.speedY;
    
    collideWithPlatforms();
    
    // Execute buffered jump when grounded
    if (jumpBuffer && player.grounded) {
        player.speedY = -jumpPower;
        player.grounded = false;
        jumpBuffer = false;
    }
    
    // Keep the player centered while moving platforms instead
    if (player.y < canvas.height / 2) {
        let shift = canvas.height / 2 - player.y;
        platformShift += shift;
        cameraOffsetY += shift;
        player.y = canvas.height / 2;
        platforms.forEach(p => p.y += shift);
    } else if (player.y > canvas.height * 0.75) { // Pan downward if player falls
        let shift = player.y - canvas.height * 0.75;
        platformShift -= shift;
        cameraOffsetY -= shift;
        player.y = canvas.height * 0.75;
        platforms.forEach(p => p.y -= shift);
    }
    
    // Keep the player centered horizontally while moving platforms instead
    if (player.x < canvas.width / 2 || player.x > canvas.width / 2) {
        let shiftX = canvas.width / 2 - player.x;
        cameraOffsetX += shiftX;
        player.x = canvas.width / 2;
        platforms.forEach(p => p.x += shiftX);
    }
    
    // Draw platforms
    ctx.fillStyle = platformColor;
    for (let p of platforms) {
        ctx.fillRect(p.x, p.y, p.width, p.height);
    }
    
    // Draw floor
    ctx.fillRect(floor.x, floor.y, floor.width, floor.height);
    baseHeight = Math.trunc(cameraOffsetY/8)/10;
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = textColor;
    var fontSize = canvas.width*0.05; 
    ctx.font = `${fontSize}px Arial`;

    ctx.fillText("Height: " + Math.trunc(cameraOffsetY/8)/10 + " meters", canvas.width/20, canvas.height/10, canvas.width*0.4);


    requestAnimationFrame(update);
}

update();
