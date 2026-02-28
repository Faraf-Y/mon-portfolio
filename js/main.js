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

// ── Projects ──
fetch('data/projects.json')
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(projects => {
    const grid = document.getElementById('project-grid');
    if (!grid) return;
    grid.innerHTML = projects.map(p => `
      <li class="project-card">
        <div class="project-card__banner"></div>
        <div class="project-card__body">
          <h3 class="project-card__title">
            <a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.name}</a>
          </h3>
          <p class="project-card__desc">${p.description}</p>
          <ul class="project-card__tags">
            ${p.languages.map(lang => `<li class="tag">${lang}</li>`).join('')}
          </ul>
          <a href="${p.url}" class="project-card__link" target="_blank" rel="noopener noreferrer">Voir sur GitHub</a>
        </div>
      </li>`).join('');
  })
  .catch(() => {
    const grid = document.getElementById('project-grid');
    if (grid) grid.innerHTML = '<li style="color:var(--muted)">Impossible de charger les projets.</li>';
  });
