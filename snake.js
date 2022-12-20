let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");

// Координаты появления смейки
let snakeX = 200;
let snakeY = 200;

// К размеры змейки
let snake = [
    {
        x: 200,
        y: 200
    },
    {
        x: 220,
        y: 200
    }
];

let foodX;
let foodY;

let direction = null;

// Рисуем фон
function drawBackground() {
    context.fillStyle = "Green";
    context.fillRect(0, 0, 400, 400);
}

// Рисуем змею
function drawSnake() {
    context.fillStyle = "blue";

    for (let index = 0; index < snake.length; index++) {
        context.fillRect(snake[index].x, snake[index].y, 20, 20);
    }
}

function update() {

    if(direction == null) {
        drawBackground();
        drawSnake();
        drawFood();
        return;
    }

    let tailIndex = snake.length - 1;
    let tailX = snake[tailIndex].x;
    let tailY = snake[tailIndex].y;

    let headX = snake[0].x;
    let headY = snake[0].y;

    

    // Куда должна идти голова
    if (direction == "right") {
        if (headX < 380) {
            headX += 20;
        } else {
            gameOver();
        }

    } else if (direction == "left") {
        if (headX > 0) {
            headX -= 20;
        } else {
            gameOver();
        }

    } else if (direction == "up") {
        if (headY > 0) {
            headY -= 20;
        } else {
            gameOver();
        }

    } else if (direction == "down") {
        if (headY < 380) {
            headY += 20;
        } else {
            gameOver();
        }
    }

    for (let index = 0; index < snake.length; index++) {
        if(snake[index].x == headX && snake[index].y == headY) {
            gameOver();
            return;
        }
    }

    // Переместить тело змеи на 1 шаг вперед.
    if(direction != null) {
        for(let index = snake.length - 1; index > 0; index--) {
            snake[index].x = snake[index - 1].x;
            snake[index].y = snake[index - 1].y;
        }
    }

    snake[0].x = headX;
    snake[0].y = headY;

    // Съесть яблоко, если положение змеи и еды одинаковое.
    if (foodX == snake[0].x && foodY == snake[0].y) {
        // Поднять счет
        // Расти

        snake.push({
            x: tailX,
            y: tailY
        });

        spawnFood();
    }

    drawBackground();
    drawSnake();
    drawFood();
}

function changeDirection(event) {
    if (event.code == "ArrowUp") {
        // Если направление не вниз
        if (direction != 'down') {
            direction = "up";
        }
    } else if (event.code == "ArrowRight") {
        // Если направление не в лево
        if (direction != 'left') {
            direction = "right";
        }
    } else if (event.code == "ArrowLeft") {
        // Если направление не в право
        if (direction != 'right') {
        direction = "left";
        }
    } else if (event.code == "ArrowDown") {
        // Если направление не вверх
        if (direction != 'up') {
            direction = "down";
        }
    }
}

function gameOver() {
    direction = null;
    alert("Game Over!");
}

// Дает яблоку новое место.
function spawnFood() {
    foodX = Math.floor(Math.random() * 20) * 20;
    foodY = Math.floor(Math.random() * 20) * 20;

    for (let index = 0; index < snake.length; index++) {
        if(snake[index].x == foodX && snake[index].y == foodY) {
            alert('food incorrect, respawning');
            spawnFood();
        }

    }
    // Если едаX && едаY одинаковы
    // как часть тела змеи.
    // Вызов spawnFood() снова.
}

// Нарисовоное яблоко
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, 20, 20);
}

drawBackground();
drawSnake();
setInterval(update, 500);
addEventListener("keydown", changeDirection);
spawnFood();