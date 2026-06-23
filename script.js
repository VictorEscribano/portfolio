// year
document.getElementById('year').textContent = new Date().getFullYear();

// navbar background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// mobile menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const closeMenu = () => { burger.classList.remove('open'); navLinks.classList.remove('open'); };
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // small stagger for siblings entering together
      e.target.style.transitionDelay = `${Math.min(i * 60, 180)}ms`;
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => io.observe(el));

// active nav link via section observer
const sections = document.querySelectorAll('section[id]');
const linkFor = id => document.querySelector(`.nav__links a[href="#${id}"]`);
const navIo = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    const link = linkFor(e.target.id);
    if (!link) return;
    if (e.isIntersecting) {
      document.querySelectorAll('.nav__links a.active').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => navIo.observe(s));

// typing effect for role
const roles = ['AI Engineer', 'Computer Vision Engineer', 'Robotics Perception', 'Deep Learning Engineer'];
const typedEl = document.getElementById('typed');
if (typedEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let r = 0, c = 0, deleting = false;
  const tick = () => {
    const word = roles[r];
    c += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, c);
    let delay = deleting ? 45 : 95;
    if (!deleting && c === word.length) { delay = 1600; deleting = true; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 800);
}
