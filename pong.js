/** @type HTMLCanvas */
var canvas = document.getElementById('pong-canvas');
var context = canvas.getContext('2d');
context.fillStyle = 'white';
context.globalAlpha = 0.9;

var map = {};
var width = canvas.width;
var height = canvas.height;
var paddleWidth = 10;
var paddleHeight = 100;
var paddleSpeed = 10;
var time = 0;

var player1 = {
    score: 0,
    xPosition: 10,
    yPosition: 0,
}

var player2 = {
    score: 0,
    xPosition: width - paddleWidth - 10,
    yPosition: 0,
}

var ball = {
    speed: 2,
    x: 100,
    y: 100,
    size: 10,
    deltaX: 1,
    deltaY: -1,
}

function isInsidePaddle(x, y, paddle) {
    var left = paddle.xPosition;
    var right = left + paddleWidth;
    var top = paddle.yPosition;
    var bottom = top + paddleHeight;

    var isInside = x >= left && 
        x <= right && 
        y >= top && 
        y <= bottom;

    return isInside;
}

function drawPaddle(player) {
    context.fillRect(
        player.xPosition, 
        player.yPosition, 
        paddleWidth, 
        paddleHeight
    );
}

function drawBall(ball) {
    ball.x += ball.deltaX * ball.speed;
    ball.y += ball.deltaY * ball.speed;
    
    if (ball.y > height)
        ball.deltaY = -1;

    if (ball.y < 0)
        ball.deltaY = 1;

    if (ball.x > width) {
        ball.deltaX = -1;
        player1.score ++;
        updateScores();
    }

    if (isInsidePaddle(ball.x, ball.y, player2)) {
        ball.deltaX = -1;
    }

    if (ball.x < 0) {
        ball.deltaX = 1;
        player2.score ++;
        updateScores();
    }

    if (isInsidePaddle(ball.x, ball.y, player1)) {
        ball.deltaX = 1;
    }


    context.fillRect(ball.x, ball.y, ball.size, ball.size);
}

function updateScores() {
    document.getElementById('player-1-score').innerText = player1.score;
    document.getElementById('player-2-score').innerText = player2.score;
}

function getColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


function movePaddles() {
    if (map['w']) {
        player1.yPosition -= paddleSpeed;
    }
    
    if (map['s']) {
        player1.yPosition += paddleSpeed;
    }

    if (map['i']) {
        player2.yPosition -= paddleSpeed;
    }

    if (map['k']) {
        player2.yPosition += paddleSpeed;
    }
}

function draw() {
    time++;
    context.clearRect(0, 0, width, height);    
    
    context.fillStyle = getColor();
    
    movePaddles();
    drawPaddle(player1);
    drawPaddle(player2);
    drawBall(ball);
    ball.speed = Math.min(ball.speed * 1.001, 100);
    paddleSpeed = Math.min(paddleSpeed * 1.001, 100);
    requestAnimationFrame(draw, 60);
}

document.onkeydown = document.onkeyup = function(e) {
    map[e.key] = e.type == 'keydown';    
    console.log(map);
}

draw();


