let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let snake = [{ x: 200, y: 200 }];
let direction = 'RIGHT';
let food = { x: 100, y: 100 };
let snakeImg = new Image();
let foodImg = new Image();
foodImg.src = 'zoro.jpg';  // Food img
let score = 0;
let gameInterval;


snakeImg.src = 'sanji.jpg';  // Default snake img

/* select snake img */
function selectSnake(imageSrc) {
    snakeImg.src = imageSrc;
}

function startGame() {
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('startButton').classList.add('hidden');
    document.addEventListener('keydown', changeDirection);
    
    score = 0;
    snake = [{ x: 200, y: 200 }];
    direction = 'RIGHT';
    food = { x: 100, y: 100 };
    
    //start the game loop
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, 200); // Snakes speed
}

/* direction based on key press */
function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
    
    // Prevent page from scrolling
    if ([37, 38, 39, 40].includes(event.keyCode)) {
        event.preventDefault();
    }
}

//update the game state
function updateGame() {
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === 'LEFT') head.x -= 20;
    if (direction === 'UP') head.y -= 20;
    if (direction === 'RIGHT') head.x += 20;
    if (direction === 'DOWN') head.y += 20;

    // Check if snake collides with the walls or itself
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(part => part.x === head.x && part.y === head.y)) {
        clearInterval(gameInterval);
        document.getElementById('gameOver').classList.remove('hidden');
        document.getElementById('startButton').classList.remove('hidden');
        return;
    }

    // If the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        food.x = Math.floor(Math.random() * 20) * 20;
        food.y = Math.floor(Math.random() * 20) * 20;
        score += 10;
        document.getElementById('score').innerText = 'Score: ' + score;
    } else {
        snake.pop(); // Remove the last part of the snake if food is not eaten
    }

    // Add new head to the snake
    snake.unshift(head);

    // Clear the canvas and redraw the snake and food
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(foodImg, food.x, food.y, 20, 20);
    snake.forEach(part => ctx.drawImage(snakeImg, part.x, part.y, 20, 20));
}

// For smaller screens (touch controls)
document.getElementById("upBtn").addEventListener("click", function () {
    if (direction !== "DOWN") direction = "UP";
});

document.getElementById("downBtn").addEventListener("click", function () {
    if (direction !== "UP") direction = "DOWN";
});

document.getElementById("leftBtn").addEventListener("click", function () {
    if (direction !== "RIGHT") direction = "LEFT";
});

document.getElementById("rightBtn").addEventListener("click", function () {
    if (direction !== "LEFT") direction = "RIGHT";
});

