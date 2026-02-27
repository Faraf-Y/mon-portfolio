// Post page — auto-detects slug from URL, fetches the .md file, renders via marked.js

const slug = location.pathname.split('/').pop().replace('.html', '');

fetch(`../posts/${slug}.md`)
  .then(r => {
    if (!r.ok) throw new Error('Article introuvable');
    return r.text();
  })
  .then(md => {
    const el = document.getElementById('post-content');
    el.innerHTML = marked.parse(md);

    // Update <title> with the first H1 from the article
    const h1 = el.querySelector('h1');
    if (h1) document.title = `FaraFY — ${h1.textContent}`;
  })
  .catch(() => {
    document.getElementById('post-content').innerHTML =
      '<p>Article introuvable.</p>';
  });
