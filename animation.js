const canvas = document.createElement("canvas");
canvas.id = "starry-sky";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

// Function to adjust canvas size to match the full viewport
function adjustCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Initial canvas size adjustment
adjustCanvasSize();

const stars = [];
const shootingStars = [];

// Create a star
function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5, // Small star sizes for subtle effect
    opacity: 0.7, // Fixed opacity for consistent visibility
    color: `hsl(${Math.random() * 360}, 100%, 75%)`, // Random rainbow color
  };
}

// Create a shooting star
function createShootingStar() {
  return {
    x: Math.random() * canvas.width,
    y: (Math.random() * canvas.height) / 2,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 4 + 2,
    angle: (Math.random() * Math.PI) / 4 + Math.PI / 4,
    opacity: Math.random() * 0.8 + 0.2,
  };
}

// Draw a star
function drawStar(star) {
  ctx.globalAlpha = star.opacity;
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fillStyle = star.color; // Use the rainbow color
  ctx.fill();
}

// Draw a shooting star
function drawShootingStar(star) {
  ctx.globalAlpha = star.opacity;
  ctx.beginPath();
  ctx.moveTo(star.x, star.y);
  ctx.lineTo(
    star.x - Math.cos(star.angle) * star.length,
    star.y - Math.sin(star.angle) * star.length,
  );
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Update stars and shooting stars
function updateStars() {
  shootingStars.forEach((star, index) => {
    star.x -= Math.cos(star.angle) * star.speed;
    star.y -= Math.sin(star.angle) * star.speed;
    if (star.x < 0 || star.y > canvas.height) {
      shootingStars.splice(index, 1);
    }
  });
}

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(drawStar);
  shootingStars.forEach(drawShootingStar);
  updateStars();
  if (Math.random() < 0.01) {
    shootingStars.push(createShootingStar());
  }
  requestAnimationFrame(animate);
}

// Initialize stars
function initializeStars() {
  stars.length = 0;
  for (let i = 0; i < 200; i++) {
    stars.push(createStar());
  }
}

// Start animation
initializeStars();
animate();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  adjustCanvasSize();
  initializeStars();
});
