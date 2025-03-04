const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 500;
canvas.height = 500;

document.addEventListener("DOMContentLoaded", () => {
    let player = {
        x: 250,
        y: 250,
        size: 30,
        color: "blue",
        speed: 5
    };

    function gameLoop() {
        const gamepads = navigator.getGamepads();
        if (gamepads[0]) {
            const gamepad = gamepads[0];
            let xAxis = gamepad.axes[0];
            let yAxis = gamepad.axes[1];
            
            player.x += xAxis * player.speed;
            player.y += yAxis * player.speed;
            
            // Button 0 (A button on Xbox controller) changes color
            if (gamepad.buttons[1].pressed) {
                player.color = "blue";
            }
            if (gamepad.buttons[2].pressed) {
                player.color = "red";
            }
            if (gamepad.buttons[0].pressed) {
                player.color = "green";
            }
            if (gamepad.buttons[4].pressed) {
                player.color = "orange";
            }
            if (gamepad.buttons[5].pressed) {
                player.color = "yellow";
            }
            if (gamepad.buttons[6].pressed) {
                player.color = "lime";
            }
            if (gamepad.buttons[7].pressed) {
                player.color = "black";
            }
            if (gamepad.buttons[8].pressed) {
                player.color = "purple";
            }
            if (gamepad.buttons[9].pressed) {
                player.color = "pink";
            }
            if (gamepad.buttons[3].pressed) {
                player.color = "brown";
            }
        }
        
        draw();
        requestAnimationFrame(gameLoop);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.size, player.size);
    }

    gameLoop();
});