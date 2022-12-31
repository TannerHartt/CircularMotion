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
addEventListener('mousemove', (event) => { // mouse x and y positions
  mouse.x = event.clientX
  mouse.y = event.clientY
});

// Automatically resets the canvas when the window size changes.
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
    this.distanceFromCenter = randomIntFromRange(50,120);
    this.lastMouse = {
      x: x,
      y: y
    }
  }

  draw() {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  }

  update() {
    lastPoint.x = this.x; // Save previous x position before any updates.
    lastPoint.y = this.y; // Save previous y position before any updates.
    this.radians += this.velocity;

    // Create drag effect
    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw();
  }
}

// Initially empty but will store the point of a particle before any updates are made to it.
const lastPoint = {x: undefined, y: undefined}

// Implementation
let particles;
let x = canvas.width / 2; // Saving the particles original x position.
let y = canvas.height / 2; // Saving the particles original y position.

function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    let radius = (Math.random() * 3) - 1;
    particles.push(new Particle(x, y, radius, 'blue'));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(255,255,255,0.05)';
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
   particle.update();
  });
}

init();
animate();
