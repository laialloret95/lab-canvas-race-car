window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };
};

// Global variables
const canvas = document.getElementById("canvas");
  canvas.width = 500;
  canvas.height = 700;
const ctx = canvas.getContext('2d');
const carImg = new Image();
  carImg.src = '/images/car.png'
let speed = 1;
let keys = [];
let obstacles = [];
let frame = 0;
let score = 0;

// CLASSES
// Car
class Car {
  constructor(){
    this.width = 158 /4;
    this.height = 319 / 4;
    this.x = canvas.width / 2 - this.width/2;
    this.y = canvas. height - this.height - 20;
  }
  draw() {
    // ctx.fillStyle = 'green';
    // //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(carImg,this.x, this.y, this.width, this.height);
  }
  update() {
    if (keys["ArrowLeft"] && this.x > 0) {
      this.x --;
    }
    if (keys["ArrowRight"] && this.x < canvas.width - this.width) {
      this.x ++;
    }
  }
}
const car = new Car();

// Obstacles
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

function startGame() {
  showGameBoard();
  animate();
}

function showGameBoard() {
  canvas.classList.add("road-visible")
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  car.draw();
  car.update();
  createNewObstacle();
  updateObstacles();
  frame++;
  calculateScore();
  requestAnimationFrame(animate);
}

window.addEventListener('keydown', function(e) {
  keys = [];
  keys[e.code] = true;
})

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
    } else obstacles.shift();
  })
}

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
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