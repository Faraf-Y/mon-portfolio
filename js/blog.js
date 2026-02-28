// Blog listing — fetches posts.json and renders the article list

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

fetch('../posts/posts.json')
  .then(r => r.json())
  .then(posts => {
    const list = document.getElementById('post-list');

    if (!posts.length) {
      list.innerHTML = '<li>Aucun article pour le moment.</li>';
      return;
    }

    list.innerHTML = posts
      .map(post => `
        <li class="post-card">
          <a href="${encodeURIComponent(post.slug)}.html" class="post-card__link">
            <time class="post-card__date" datetime="${escapeHtml(post.date)}">${formatDate(post.date)}</time>
            <h3 class="post-card__title">${escapeHtml(post.title)}</h3>
            <p class="post-card__excerpt">${escapeHtml(post.excerpt)}</p>
          </a>
        </li>`)
      .join('');
  })
  .catch(() => {
    document.getElementById('post-list').innerHTML =
      '<li>Impossible de charger les articles.</li>';
  });

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
