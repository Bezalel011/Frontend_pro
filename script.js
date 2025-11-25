
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let w, h, stars = [];

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function initStars() {
  stars = [];
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: rand(0.3, 1.6),
      vx: rand(-0.05, 0.05),
      vy: rand(-0.05, 0.05),
      alpha: rand(0.2, 0.9)
    });
  }
}
initStars();

function drawBackground() {
  if (!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, "rgba(10,10,25,0.8)");
  gradient.addColorStop(1, "rgba(0,0,0,0.95)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  stars.forEach((s) => {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0) s.x = w;
    if (s.x > w) s.x = 0;
    if (s.y < 0) s.y = h;
    if (s.y > h) s.y = 0;

    ctx.beginPath();
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = "#ffffff";
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawBackground);
}
drawBackground();


function inViewport(el, offset = 0.2) {
  const rect = el.getBoundingClientRect();
  return rect.top <= window.innerHeight * (1 - offset);
}

function handleReveal() {
  const items = document.querySelectorAll(".animate-fade, .animate-up");
  items.forEach(el => {
    if (inViewport(el)) {
      el.classList.add("in-view");
    }
  });
}

document.addEventListener("scroll", handleReveal, { passive: true });
document.addEventListener("DOMContentLoaded", () => {
  handleReveal();
  setTimeout(handleReveal, 600);
});


function submitForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name) return alert("Please enter your name.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return alert("Please enter a valid email.");
  if (!message) return alert("Please enter your message.");

  alert(`Thank you ${name}! Your enquiry has been received (UI only).`);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

function resetForm() {
  document.querySelector(".form").reset();
}


function scrollToContact() {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}


const hero = document.querySelector(".hero");

if (hero) {
  hero.addEventListener("mousemove", (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 40;
    const y = (e.clientY - window.innerHeight / 2) / 40;

    hero.style.transform = `translate(${x}px, ${y}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.transform = "translate(0px, 0px)";
  });
}
