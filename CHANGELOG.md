# Changelog

## 2026-02-28 — Corrections accessibilité WCAG 2.1

### Problèmes corrigés (sévérité Important)

**1. Contraste accent light mode insuffisant (fix #1 & #2)**
- `css/style.css` — `[data-theme="light"]` : `--accent` `#0d9373` → `#0a7a5f` (ratio 3.6:1 → 4.8:1)
- `index.html`, `blog/index.html`, `blog/premier-projet-ia.html` — CSS critique inline mis à jour

**2. Skip link ajouté (fix #3)**
- `css/style.css` — classe `.skip-link` : visible au focus, masquée sinon
- `index.html`, `blog/index.html`, `blog/premier-projet-ia.html` — `<a href="#main-content" class="skip-link">` en première ligne de `<body>`
- `<main>` cible ajoutée : `id="main-content"` sur les 3 pages

**3. Contenu dynamique avec `aria-live` (fix #4)**
- `index.html` — `#project-grid` : ajout `aria-live="polite"` + `aria-label="Liste des projets"`
- `blog/index.html` — `#post-list` : ajout `aria-live="polite"` + `aria-label="Liste des articles"`

**4. Footer `<nav>` labellisé (fix #5)**
- `index.html`, `blog/index.html`, `blog/premier-projet-ia.html` — `aria-label="Liens sociaux"` ajouté sur `<nav class="footer__links">`

### Score accessibilité estimé : 7/10 → 9/10
