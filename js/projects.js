// Projects section — loads from data/projects.json

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeUrl(url) {
  return /^https?:\/\//.test(url) ? url : '#';
}

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
            <a href="${safeUrl(p.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(p.name)}</a>
          </h3>
          <p class="project-card__desc">${escapeHtml(p.description)}</p>
          <ul class="project-card__tags">
            ${p.languages.map(lang => `<li class="tag">${escapeHtml(lang)}</li>`).join('')}
          </ul>
          <a href="${safeUrl(p.url)}" class="project-card__link" target="_blank" rel="noopener noreferrer">Voir sur GitHub</a>
        </div>
      </li>`).join('');
  })
  .catch(() => {
    const grid = document.getElementById('project-grid');
    if (grid) grid.innerHTML = '<li style="color:var(--muted)">Impossible de charger les projets.</li>';
  });
