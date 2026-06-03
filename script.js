// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Intro loader ----------
const intro = document.getElementById("intro");
window.addEventListener("load", () => {
  setTimeout(() => intro && intro.classList.add("hide"), 1500);
});
// Safety: hide after 3s even if load is slow
setTimeout(() => intro && intro.classList.add("hide"), 3000);

// ---------- Nav background on scroll ----------
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// ---------- Mobile menu toggle ----------
const toggle = document.getElementById("navToggle");
const links = document.querySelector(".nav__links");
toggle.addEventListener("click", () => {
  toggle.classList.toggle("open");
  links.classList.toggle("open");
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    toggle.classList.remove("open");
    links.classList.remove("open");
  })
);

// ---------- Reveal on scroll (staggered) ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = (e.target.dataset.delay || (i * 70)) + "ms";
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ---------- Animated stat counters ----------
const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "K" : String(n));
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const dur = 1400, start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animateCount(e.target); statIO.unobserve(e.target); }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll(".hero__stats strong").forEach((el) => statIO.observe(el));

// ---------- Parallax on hero avatar ----------
const avatar = document.querySelector(".hero__avatar");
if (avatar && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y < window.innerHeight) avatar.style.transform = `translateY(${y * 0.08}px)`;
  }, { passive: true });
}

// ---------- Falling Konoha leaves ----------
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.getElementById("leaves");
  const ctx = canvas.getContext("2d");
  let w, h, leaves = [];
  const COUNT = window.innerWidth < 700 ? 14 : 26;
  const colors = ["#ff7a18", "#ffae3c", "#4fbf6b", "#2ea3ff"];

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const make = (top) => ({
    x: Math.random() * w,
    y: top ? -20 : Math.random() * h,
    size: 6 + Math.random() * 10,
    speed: 0.5 + Math.random() * 1.3,
    drift: (Math.random() - 0.5) * 1.2,
    rot: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.05,
    color: colors[(Math.random() * colors.length) | 0],
    sway: Math.random() * Math.PI * 2,
  });
  for (let i = 0; i < COUNT; i++) leaves.push(make(false));

  // draw a simple leaf/petal shape
  const drawLeaf = (l) => {
    ctx.save();
    ctx.translate(l.x, l.y);
    ctx.rotate(l.rot);
    ctx.fillStyle = l.color;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.moveTo(0, -l.size);
    ctx.quadraticCurveTo(l.size * 0.7, 0, 0, l.size);
    ctx.quadraticCurveTo(-l.size * 0.7, 0, 0, -l.size);
    ctx.fill();
    ctx.restore();
  };

  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    leaves.forEach((l, i) => {
      l.sway += 0.02;
      l.y += l.speed;
      l.x += l.drift + Math.sin(l.sway) * 0.6;
      l.rot += l.vr;
      drawLeaf(l);
      if (l.y > h + 20) leaves[i] = make(true);
    });
    requestAnimationFrame(frame);
  };
  frame();
})();
