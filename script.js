const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const canvasSize = 400;
const totalGrid = canvasSize / gridSize;

let snake = [{x: 9, y: 9}];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * totalGrid),
    y: Math.floor(Math.random() * totalGrid)
};

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
    if (key === 38 && direction !== 'DOWN') direction = 'UP';
    if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
    if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}

function updateSnake() {
    const head = {x: snake[0].x, y: snake[0].y};

    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'UP') head.y -= 1;
    if (direction === 'RIGHT') head.x += 1;
    if (direction === 'DOWN') head.y += 1;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * totalGrid),
            y: Math.floor(Math.random() * totalGrid)
        };
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.y < 0 || head.x >= totalGrid || head.y >= totalGrid) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    if (checkCollision()) {
        alert('Game Over');
        snake = [{x: 9, y: 9}];
        direction = 'RIGHT';
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    updateSnake();

    setTimeout(gameLoop, 100);
}

gameLoop();
