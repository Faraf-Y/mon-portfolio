// MonPortfolio — main script

const nav = document.querySelector('.site-nav');
const burger = document.querySelector('.site-nav__burger');
const navLinks = document.querySelectorAll('.site-nav__links a');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ── Fade-in on scroll (Intersection Observer) ──
const sections = document.querySelectorAll('section');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.classList.add('fade-in');
  fadeObserver.observe(section);
});

// ── Theme toggle ──
const themeToggle = document.querySelector('.theme-toggle');

function applyTheme(theme) {
  document.documentElement.classList.add('theme-transitioning');
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-label',
    theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'
  );
  window.setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 350);
}

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

// ── Escape : fermer le menu mobile ──
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    burger.focus();
  }
});

// ── Validation formulaire de contact ──
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name',    label: 'Le nom' },
      { id: 'email',   label: "L'email" },
      { id: 'message', label: 'Le message' },
    ];

    fields.forEach(({ id, label }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      const value = input.value.trim();

      if (!value) {
        error.textContent = `${label} est obligatoire.`;
        input.setAttribute('aria-invalid', 'true');
        valid = false;
      } else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error.textContent = 'Adresse email invalide.';
        input.setAttribute('aria-invalid', 'true');
        valid = false;
      } else {
        error.textContent = '';
        input.removeAttribute('aria-invalid');
      }
    });

    if (valid) {
      form.innerHTML = '<p style="color:var(--accent);padding:1rem 0">Message envoyé ! Je vous répondrai prochainement.</p>';
    }
  });
}

