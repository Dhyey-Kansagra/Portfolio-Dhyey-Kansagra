
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- CUSTOM CURSOR ---
  const cur = document.getElementById('cur');
  const curBlur = document.getElementById('cur-blur');
  const xTo = gsap.quickTo(cur, "left", {duration:0.15, ease:"power3"});
  const yTo = gsap.quickTo(cur, "top", {duration:0.15, ease:"power3"});
  const bxTo = gsap.quickTo(curBlur, "left", {duration:0.55, ease:"power3"});
  const byTo = gsap.quickTo(curBlur, "top", {duration:0.55, ease:"power3"});
  window.addEventListener("mousemove", e => { xTo(e.clientX); yTo(e.clientY); bxTo(e.clientX); byTo(e.clientY); });
  document.querySelectorAll('a,button,.pill,.proj-card').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(cur, {scale:2.5, duration:0.3}));
    el.addEventListener('mouseleave', () => gsap.to(cur, {scale:1, duration:0.3}));
  });

  // --- STARFIELD ---
  const canvas = document.getElementById('canvas-stars');
  const ctx = canvas.getContext('2d');
  let stars = [];
  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  class Star {
    constructor() { this.reset(); }
    reset() { this.x=Math.random()*canvas.width; this.y=Math.random()*canvas.height; this.size=Math.random()*1.5+0.2; this.speed=Math.random()*0.4+0.1; this.op=Math.random()*0.7+0.1; }
    update() { this.y-=this.speed; if(this.y<0) this.reset(); this.y=this.y<0?canvas.height:this.y; }
    draw() { ctx.fillStyle=`rgba(0,245,255,${this.op})`; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); }
  }
  function initStars() { stars=[]; for(let i=0;i<180;i++) stars.push(new Star()); }
  function animStars() { ctx.clearRect(0,0,canvas.width,canvas.height); stars.forEach(s=>{s.update();s.draw();}); requestAnimationFrame(animStars); }
  window.addEventListener('resize', () => { resizeCanvas(); initStars(); });
  resizeCanvas(); initStars(); animStars();

  // --- NAVBAR SCROLL HIDE/SHOW ---
  let lastY = 0;
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const cy = window.pageYOffset;
    nav.style.transform = (cy > lastY && cy > 100) ? "translateY(-100%)" : "translateY(0)";
    lastY = cy;
  });

  // --- BURGER MENU ---
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => { navLinks.classList.toggle('open'); });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  gsap.set(".hero-tag, .hero-name, .hero-sub, .cta-btn", {opacity:1, y:0, scale:1});
  // --- HERO ANIMATION ---
  gsap.timeline()
    .from(".hero-tag", {y:30, opacity:0, duration:0.8, ease:"power3.out"})
    .from(".hero-name", {y:80, opacity:0, duration:1.2, ease:"power4.out"}, "-=0.5")
    .from(".hero-sub", {y:40, opacity:0, duration:0.9, ease:"power3.out"}, "-=0.7")
    .from(".cta-btn", {scale:0.85, opacity:0, duration:0.7, ease:"back.out(1.7)"}, "-=0.5")
    .from(".hero-right", {x:60, opacity:0, duration:1.2, ease:"power3.out"}, "-=1");

  // --- ASTRONAUT FLOATING ---
  gsap.to("#astro", {y:-28, duration:4, repeat:-1, yoyo:true, ease:"sine.inOut"});
  gsap.to(".arm-l", {rotation:10, duration:2, repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"top center"});
  gsap.to(".arm-r", {rotation:-10, duration:2.5, repeat:-1, yoyo:true, ease:"sine.inOut", transformOrigin:"top center"});

  // --- SCROLL REVEALS (with immediateRender fix) ---
  document.querySelectorAll('section:not(#hero)').forEach(sec => {
    const els = sec.querySelectorAll('.section-title,.glass,.tl-item,.edu-card,.proj-card,.skill-group');
    if(!els.length) return;
    gsap.set(els, {y:60, opacity:0});
    ScrollTrigger.create({
      trigger: sec,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.to(els, {y:0, opacity:1, duration:0.9, stagger:0.12, ease:"power3.out"});
      }
    });
  });

  // --- SKILL PILLS FLOAT ---
  document.querySelectorAll('.pill').forEach((pill, i) => {
    gsap.to(pill, {y:"random(-8,8)", x:"random(-4,4)", duration:gsap.utils.random(2,4), repeat:-1, yoyo:true, ease:"sine.inOut", delay:i*0.08});
  });

  // --- PROJECT CARD HOVER ---
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mouseenter', () => gsap.to(card, {y:-12, duration:0.35, ease:"power2.out", borderColor:"rgba(0,245,255,0.4)", boxShadow:"0 20px 50px rgba(0,245,255,0.12)"}));
    card.addEventListener('mouseleave', () => gsap.to(card, {y:0, duration:0.35, ease:"power2.out", borderColor:"rgba(255,255,255,0.1)", boxShadow:"none"}));
  });

  // --- CONTACT FORM ---
//   const form = document.getElementById('contact-form');
//   const toast = document.getElementById('toast');
//   if(form) {
//     form.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const fd = new FormData(form);
//       try {
//         const r = await fetch(form.action, {method:'POST', body:fd, headers:{'Accept':'application/json'}});
//         if(r.ok) {
//           form.reset();
//           gsap.to(toast, {y:0, opacity:1, duration:0.5, ease:"back.out(1.7)"});
//           setTimeout(() => gsap.to(toast, {y:120, opacity:0, duration:0.4, ease:"power3.in"}), 3000);
//         }
//       } catch(err) { console.error(err); }
//     });
//   }

// });


 emailjs.init("iT3mxpomqO-8LbBrS");

  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const submitBtn = form.querySelector('.submit-btn');

  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
      };

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      emailjs.send("service_guwd5n8", "template_gl6cttk", templateParams)
        .then(() => {
          form.reset();
          submitBtn.textContent = 'Send Message ';
          submitBtn.disabled = false;
          gsap.to(toast, {y:0, opacity:1, duration:0.5, ease:"back.out(1.7)"});
          setTimeout(() => gsap.to(toast, {y:120, opacity:0, duration:0.4, ease:"power3.in"}), 3000);
        })
        .catch((err) => {
          console.error('EmailJS Error:', err);
          submitBtn.textContent = 'Send Message ';
          submitBtn.disabled = false;
          alert('Something went wrong. Please try again!');
        });
    });
  }

});



// --- CONTACT FORM ---
// const form = document.getElementById('contact-form');
// const toast = document.getElementById('toast');
// if(form) {
//   form.addEventListener('submit', function(e) {
//     // e.preventDefault() નથી — normal submit થવા દો
//     gsap.to(toast, {y:0, opacity:1, duration:0.5, ease:"back.out(1.7)"});
//     setTimeout(() => gsap.to(toast, {y:120, opacity:0, duration:0.4, ease:"power3.in"}), 3000);
//   });
// }
// });