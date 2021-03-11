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

// CLASSES
// Car
class Car {
  constructor(){
    this.width = 158 /4;
    this.height = 319 / 4;
    this.x = canvas.width / 2 - this.width/2;
    this.y = canvas. height - this.height;
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
    this.height = 10;
    this.x = randomInt(0, canvas.width - this.width);
    this.y = 0;
  }
  draw() {
    ctx.fillStyle = 'red';
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
    obstacle.draw();
    obstacle.update();
  })
}

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}