const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particlesArray = [];

class Particle {
  constructor() {
    //   the color of the particle (this.hue) will be determined by the x position of the particle using the lerp function (linear interpolation between two values). The color range goes from pink to yellow (first half of the canvas width) and from yellow to blue (second half of the canvas width). See the CSS linear-gradient property.

    const lerp = (x, y, a) => x * (1 - a) + y * a;
    const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
    // inverse function of lerp
    const invlerp = (x, y, a) => clamp((a - x) / (y - x));
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.size = Math.random() * 15 + 1;
    this.speedX = 0;
    this.speedY = Math.random() - 1.5;
    const percentageFirstHalfCanvasWidth = invlerp(0, canvas.width / 2, this.x);
    const percentageSecondHalfCanvasWidth = invlerp(
      canvas.width / 2,
      canvas.width,
      this.x
    );

    if (this.x < canvas.width / 2) {
      // see hsl values of the linear-gradient property
      this.hue = lerp(322, 52, percentageFirstHalfCanvasWidth);
    } else {
      this.hue = lerp(52, 178, percentageSecondHalfCanvasWidth);
    }
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size > 0.2 && (this.size -= 0.1);
  }
  draw() {
    ctx.fillStyle = "hsl(" + this.hue + ", 100%, 76%)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
const init = () => {
  for (let i = 0; i < Math.random() * 15 + 5; i++) {
    particlesArray.push(new Particle());
  }
};
const handleParticles = () => {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size < 0.2) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
};
setInterval(init, 500);
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
};
animate();
