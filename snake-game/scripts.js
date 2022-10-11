var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
const instruction = document.getElementById("instruction");
const losingMessageElement = document.getElementById("losingMessage");
const restartButton = document.getElementById("restartButton");
const losingMessageTextElement = document.querySelector("[data-lose-message-text]");
const width = canvas.getAttribute('width')
const height = canvas.getAttribute('height')
interval = window.setInterval(function () {});

res = 20
rows = height / res
cols = width / res

function init() {
    instruction.classList.add("show");
    ctx.clearRect(0, 0, width, height)
    vel = { x: 0, y: 0 }
    len = 5
    snake = []
    walls = []
    for (let i = 0; i < len; i++) {
        snake.push({ x: cols / 2, y: rows / 2 })
    }

    for (let x = 0; x < cols; x++) {
        walls.push({ x: x, y: 0 })
        walls.push({ x: x, y: rows - 1 })
    }
    for (let y = 1; y < rows - 1; y++) {
        if (Math.abs(y - rows / 2) < 3) continue;
        walls.push({ x: 0, y: y })
        walls.push({ x: cols - 1, y: y })
    }
    for (let v = 0; v < 5; v++) {
        walls.push({ x: 8 + v, y: 6 })
        walls.push({ x: 7, y: v + 6 })

        walls.push({ x: cols - 1 - (8 + v), y: 6 })
        walls.push({ x: cols - 1 - 7, y: v + 6 })

        walls.push({ x: cols - 1 - (8 + v), y: rows - 1 - 6 })
        walls.push({ x: cols - 1 - 7, y: rows - 1 - (v + 6) })

        walls.push({ x: 8 + v, y: rows - 1 - 6 })
        walls.push({ x: 7, y: rows - 1 - (v + 6) })
    }

    food = randomPos(walls)

    losingMessageElement.classList.remove("show");
    interval = window.setInterval(update, 70)
}

init()
restartButton.addEventListener("click", init);

function update() {
    ctx.clearRect(0, 0, width, height)

    snake.unshift({ x: (snake[0].x + vel.x + cols) % cols, y: (snake[0].y + vel.y + rows) % rows })
    snake.pop()
    ctx.fillStyle = "#00FF00"
    snake.forEach(p => {
        ctx.fillRect(p.x * res + res * .05, p.y * res + res * .05, res * .90, res * .90)
    });
    if (snake[0].x == food.x && snake[0].y == food.y) {
        for (let i = 0; i < 1; i++) {
            snake.push(snake[len - 1])
            food = randomPos(walls)
            len++
        }
    }
    for (let i = 1; i < len; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y && (vel.x != 0 || vel.y != 0)) {
            endGame()
        }
    }
    ctx.fillStyle = "#FFFFFF"
    walls.forEach(wall => {
        ctx.fillRect(wall.x * res, wall.y * res, res, res)
        if (wall.x == snake[0].x && wall.y == snake[0].y)
            endGame()
    });
    ctx.fillStyle = "#FFFF00"
    ctx.fillRect(food.x * res + res * .05, food.y * res + res * .05, res * .90, res * .90)
}
function changeDir(dx, dy) {
    vel.x = dx
    vel.y = dy
}
function randomPos(walls) {
    x = Math.round(Math.random() * cols)
    y = Math.round(Math.random() * rows)
    walls.forEach(wall => {
        if (wall.x == x && wall.y == y) {
            return randomPos(walls)
        }
    })
    return { x, y }
}
function keydown(event) {
    var key = event.key
    if (key == 'a' || key == 's' || key == 'd' || key == 'w')
        instruction.classList.remove("show")
    else
        return
    switch (key) {
        case 'a':
            if (vel.x != 1)
                changeDir(-1, 0)
            break
        case 's':
            if (vel.y != -1)
                changeDir(0, 1)
            break
        case 'd':
            if (vel.x != -1)
                changeDir(1, 0)
            break
        case 'w':
            if (vel.y != 1)
                changeDir(0, -1)
            break
    }
}
function endGame() {
    window.clearInterval(interval)
    losingMessageTextElement.innerText = "Game Lose";
    losingMessageElement.classList.add("show");
}
window.addEventListener("keydown", keydown, false)
