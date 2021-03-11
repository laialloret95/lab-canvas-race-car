// Global variables
const canvas = document.getElementById("canvas");
  canvas.width = 500;
  canvas.height = 700;
const ctx = canvas.getContext('2d');
const carImg = new Image();
  carImg.src = '/images/car.png'
let speed = 1;
let arrowKeys = [];
let obstacles = [];
let frame = 0;
let score = 0;
let gameOver = false;
let firstTime = true;

// Window load
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    if (firstTime) {
      firstTime = false;
      startGame();
    }
    else resetGame();
  };
};

// Classes
class Car {
  constructor(){
    this.width = 158 /4;
    this.height = 319 / 4;
    this.x = canvas.width / 2 - this.width/2;
    this.y = canvas. height - this.height - 20;
    this.inMotion = false;
  }
  draw() {
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(carImg,this.x, this.y, this.width, this.height);
  }
  update() {
    if (arrowKeys["ArrowLeft"] && this.x > 0 && this.inMotion === false) {
      this.x -= 10*speed;
      this.inMotion = true; // Make car move just once per arrow click 
    }
    if (arrowKeys["ArrowRight"] && this.x < canvas.width - this.width && this.inMotion === false) {
      this.x += 10*speed;
      this.inMotion = true; // Make car move just once per arrow click 
    }
  }
}
const car = new Car();

class Obstacle {
  constructor(){
    this.width = randomInt(100, 300);
    this.height = 15;
    this.x = randomInt(0, canvas.width - this.width);
    this.y = 0;
  }
  draw() {
    ctx.fillStyle = '#C70039';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += speed;
  }
}

// Arrow Keys Event Listener
window.addEventListener('keydown', function(e) {
  arrowKeys = [];
  arrowKeys[e.code] = true;
  car.inMotion = false;
})

// Functions
function startGame() {
  showGameBoard();
  animate();
}

function showGameBoard() {
  canvas.classList.add("road-visible")
}

function createNewObstacle() {
  if (frame % 300 === 0) { // Add one new obstacle every 300 frames
    obstacles.push(new Obstacle());
  }
}

function updateObstacles() {
  obstacles.forEach(obstacle => {
    if (obstacle.y + obstacle.height < canvas.height) {
      obstacle.draw();
      obstacle.update();
      if (collision(car,obstacle)) setGameOver();
    }
  })
}

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function collision(first, second) {
  return !(   first.x > second.x + second.width   ||
              first.x + first.width < second.x    ||
              first.y > second.y + second.height  ||
              first.y + first.height < second.y);
}

function calculateScore() {
  obstacles.forEach(obstacle => {
    if (obstacle.y + obstacle.height === car.y + car.height) {
      score += 1;
    }
  })
  ctx.fillStyle = "white";
  ctx.font = '30px Verdana';
  ctx.fillText(`Score ${score}`, 290, 60);
}

function setGameOver() {
  gameOver = true;
  ctx.fillStyle = 'white';
  ctx.fillText('GAME OVER!', 160, 250);
}

function resetGame() {
  frame = 0;
  score = 0;
  speed = 1;
  obstacles = [];
  gameOver = false;
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  car.draw();
  car.update();
  createNewObstacle();
  updateObstacles();
  frame++;
  calculateScore();
  if (!gameOver) requestAnimationFrame(animate);
}