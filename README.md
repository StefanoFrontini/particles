# Particles effect with HTML5 canvas and vanilla JS

<img src="https://res.cloudinary.com/stefano75/image/upload/v1652256904/particles_edzpd6.gif" width="500"/>

## What I learned
Particles are generated through a Particle Class which has an update and a draw method:

```javascript
class Particle {
  constructor() {
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
```

The animation is achieved through a recursive function:

```javascript
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate);
};
```
Lerp function

The color of the particle (this.hue) will be determined by the x position of the particle using the lerp function (linear interpolation between two values). The color range goes from pink to yellow (first half of the canvas width) and from yellow to blue (second half of the canvas width). See the CSS linear-gradient property.

## References

- [Frank's laboratory HTML5 Canvas course](https://youtu.be/Yvz_axxWG4Y)
- [Freya Holmer - lerp function](https://youtu.be/NzjF1pdlK7Y)
