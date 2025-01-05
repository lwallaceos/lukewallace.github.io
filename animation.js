// Create the canvas and append it to the body
const canvas = document.createElement("canvas");
canvas.id = "starry-sky";
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1"; // Ensures it stays behind other content
document.body.appendChild(canvas);

// Adjust canvas size to match the viewport
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Colors for the stars
const starColors = ["#FFD700", "#FFFFFF", "#00BFFF", "#FF69B4", "#ADFF2F"];

// Create stars and shooting stars arrays
const stars = [];
const shootingStars = [];

// Create a star
function createStar() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    opacity: Math.random() * 0.5 + 0.5, // Less flashy: minimum opacity of 0.5
    color: starColors[Math.floor(Math.random() * starColors.length)], // Random color
    opacityDirection: Math.random() > 0.5 ? 1 : -1, // Opacity fade direction
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
  ctx.fillStyle = star.color; // Use the star's color
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
  stars.forEach((star) => {
    // Subtle opacity variation
    star.opacity += 0.01 * star.opacityDirection;
    if (star.opacity > 1 || star.opacity < 0.5) {
      star.opacityDirection *= -1; // Reverse direction
    }
  });

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
for (let i = 0; i < 200; i++) {
  stars.push(createStar());
}

// Start animation
animate();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
