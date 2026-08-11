// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  menuToggle.classList.toggle('open');
});

// Close mobile menu after clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) mainNav.classList.remove('open');
  });
});

// Mobile: tap to expand the Services dropdown instead of hover
document.querySelectorAll('.nav-item.dropdown > .nav-link').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      trigger.closest('.nav-item').classList.toggle('open');
    }
  });
});

// ===== Animated stat counters =====
const counters = document.querySelectorAll('.stat-number[data-count]');

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.textContent.replace(/[0-9]/g, ''); // keep "+" or "%"
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => statObserver.observe(counter));

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Header shadow on scroll =====
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.style.boxShadow = '0 4px 20px -10px rgba(20,30,70,.15)';
  } else {
    header.style.boxShadow = 'none';
  }
});
