class Ball {
    constructor() {
      this.x = 250;
      this.y = 160;
      this.dx = 2;
      this.dy = 2;
      this.ballRadius = 10;
      this.color = '#0095DD';
    }
  
    drawBall(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  
    move() {
      if (this.y + this.dy > canvas.height - this.ballRadius || this.y + this.dy < this.ballRadius) {
        this.dy = -(this.dy);
      }
  
      if (this.x + this.dx > canvasWidth - this.ballRadius || this.x + this.dx < this.ballRadius) {
        this.dx = -(this.dx);
      }
  
      this.x += this.dx;
      this.y += this.dy;
    }
  
    determineLoss(canvas, paddle) {
      if (this.y + this.dy > canvas.height - this.ballRadius) {
        if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
          this.dy = -(this.dy);
        } else {
          alert('GAME OVER'); // eslint-disable-line no-alert
          document.location.reload();
        }
      }
    }
  }
  class Brick {
    constructor(x, y, status) {
      this.x = x;
      this.y = y;
      this.status = status;
      this.color = '#0095DD';
      this.width = 75;
      this.height = 20;
    }
  
    drawBricks(ctx) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  
    collisionDetection(ball) {
      if (ball.x < this.x && ball.x < this.x + this.width
        && ball.y > this.y
        && ball.y < this.y + this.height) {
        ball.dy = -(ball.dy); // eslint-disable-line
        this.status = 0;
      }
    }
  }
class Brick {
  constructor(x, y, status) {
    this.x = x;
    this.y = y;
    this.status = status;
    this.color = '#0095DD';
    this.width = 75;
    this.height = 20;
  }

  drawBricks(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  collisionDetection(ball) {
    if (ball.x < this.x && ball.x < this.x + this.width
      && ball.y > this.y
      && ball.y < this.y + this.height) {
      ball.dy = -(ball.dy); // eslint-disable-line
      this.status = 0;
    }
  }
}  
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let dx = 2;

let dy = -2;

let score = 0;
let lives = 3;


const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r+=1) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }
  
function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = true;
    }
  }
  
function keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      leftPressed = false;
    }
  }

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c += 1) {
      for (let r = 0; r < brickRowCount; r += 1) {
        if (bricks[c][r].status === 1) {
          const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = '#0095DD';
          ctx.fill();
          ctx.closePath();
        }
    }
  }
}


function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#2824KG';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBricks();
  drawBall();
  collisionDetection();
  drawPaddle();
  drawScore();
  drawLives();

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives-=1;
      if (!lives) {
        alert('GAME OVER'); // eslint-disable-line no-alert
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }

  x += dx;
  y += dy;
  requestAnimationForm(draw); // eslint-disable-line no-undef
}

draw();