// Shared nav and footer — injected on every page

(function () {
  const inBlog = location.pathname.includes('/blog/');
  const home = inBlog ? '../index.html' : '';
  const blogIndex = inBlog ? 'index.html' : 'blog/index.html';
  const logoHref = inBlog ? '../index.html' : 'index.html';

  const navHTML = `
  <a href="#main-content" class="skip-link">Aller au contenu principal</a>
  <header class="site-nav">
    <div class="site-nav__bar">
      <a class="site-nav__logo" href="${logoHref}">FaraFY</a>
      <div class="site-nav__controls">
        <button class="theme-toggle" aria-label="Passer en mode clair" title="Changer le thème">
          <svg class="theme-toggle__sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="theme-toggle__moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <button class="site-nav__burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="main-nav">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <nav id="main-nav" class="site-nav__links" aria-label="Navigation principale">
      <a href="${home}#about">À propos</a>
      <a href="${home}#projects">Projets</a>
      <a href="${blogIndex}">Blog</a>
      <a href="${home}#contact">Contact</a>
    </nav>
  </header>`;

  const footerHTML = `
  <footer>
    <nav class="footer__links" aria-label="Liens sociaux">
      <a href="https://github.com/Faraf-Y" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="#">LinkedIn</a>
      <a href="https://faraf-y.github.io/mon-portfolio" target="_blank" rel="noopener noreferrer">Site</a>
    </nav>
    <p class="footer__copy">© 2026 FaraFY · Construit avec Claude Code</p>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  });
}());
