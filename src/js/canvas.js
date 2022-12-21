import utils, {randomIntFromRange} from './utils'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * (Math.PI * 2);
    this.velocity = 0.05;
    this.distanceFromCenter = {
      x: randomIntFromRange(50,120),
      y: randomIntFromRange(50,120)
    }
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.radians += this.velocity;
    this.x = x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y = y + Math.sin(this.radians) * this.distanceFromCenter.y
    this.draw();
  }
}

// Implementation
let particles;
let x = canvas.width / 2; // Saving the particles original x position.
let y = canvas.height / 2; // Saving the particles original y position.

function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(x, y,5, 'blue'));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
   particle.update();
  })
}

init();
animate();
