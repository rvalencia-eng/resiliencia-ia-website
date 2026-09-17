// bridge-canvas.js - V2 Data Stream Particle System

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bridgeCanvasV2');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  const count = 55;

  class ParticleV2 {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = 0.5 + Math.random() * 1.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = 1.5 + Math.random() * 2.5;
      this.alpha = 0.2 + Math.random() * 0.7;
      this.hue = Math.random() > 0.3 ? 190 : 210;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x > width) this.x = 0;
      if (this.y < 0 || this.y > height) this.y = Math.random() * height;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 60%, ${this.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < count; i++) particles.push(new ParticleV2());

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw Subtle Connecting Grid Lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 180, 216, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
});
