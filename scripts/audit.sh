#!/usr/bin/env bash
# audit.sh — Rapports automatisés via Claude Code (headless)
# Usage : ./scripts/audit.sh
# Prérequis : lancer depuis un terminal hors session Claude Code

set -euo pipefail

# ── Configuration ─────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DATE="$(date +%Y-%m-%d)"
TIME="$(date +%H-%M-%S)"
REPORTS_DIR="$PROJECT_DIR/reports/$DATE"
CLAUDE_BIN="${CLAUDE_BIN:-claude}"

# ── Helpers ───────────────────────────────────────────────────────────────────
hr()  { echo "══════════════════════════════════════════════"; }
ok()  { echo "  ✅ $1"; }
err() { echo "  ❌ $1"; }
run_audit() {
  local label="$1" prompt="$2" output="$3"
  echo
  echo "▶ $label..."
  if "$CLAUDE_BIN" -p "$prompt" --output-format text > "$output" 2>&1; then
    ok "Rapport sauvegardé : reports/$DATE/$(basename "$output")"
  else
    err "Erreur lors de : $label (voir $(basename "$output"))"
  fi
}

# ── Init ──────────────────────────────────────────────────────────────────────
mkdir -p "$REPORTS_DIR"
cd "$PROJECT_DIR"

hr
echo "  Audit complet — $(date '+%d/%m/%Y à %H:%M')"
hr

# ── 1. Audit d'accessibilité ──────────────────────────────────────────────────
run_audit \
  "Audit d'accessibilité (WCAG 2.1)" \
  "Lance un audit d'accessibilité WCAG 2.1 complet du portfolio. Lis tous les fichiers HTML et CSS, évalue chaque point de la checklist (images, structure, navigation, formulaires, contraste), note le résultat OK ou KO, et termine par un score /10 avec les 3 problèmes prioritaires." \
  "$REPORTS_DIR/accessibility.txt"

# ── 2. Revue de code ──────────────────────────────────────────────────────────
run_audit \
  "Revue de code (senior front-end)" \
  "Fais une revue de code complète du portfolio. Lis tous les fichiers HTML, CSS et JS. Évalue chaque fichier sur 4 axes : lisibilité, performance, maintenabilité, bonnes pratiques. Note chaque fichier /10 et termine par 3 refactorings prioritaires classés par impact." \
  "$REPORTS_DIR/code-review.txt"

# ── 3. Checklist de déploiement ───────────────────────────────────────────────
run_audit \
  "Checklist de déploiement" \
  "Lance la checklist de pré-déploiement pour ce site statique. Vérifie : présence de index.html, chemins relatifs, pas de fichiers temporaires, Doctype HTML5, lang, charset, viewport, title, meta description, favicon, pas de !important inutiles, media queries, pas de console.log, scripts avec defer, images optimisées. Produis un rapport OK/KO pour chaque point." \
  "$REPORTS_DIR/deploy-checklist.txt"

# ── Résumé ────────────────────────────────────────────────────────────────────
echo
hr
echo "  Résumé — $(date '+%H:%M:%S')"
hr
echo
total_ok=0
total_ko=0
for report in "$REPORTS_DIR"/*.txt; do
  name="$(basename "$report" .txt)"
  lines="$(wc -l < "$report")"
  ko_count="$(grep -ci "❌\|KO\|fail\|error" "$report" 2>/dev/null || echo 0)"
  if [ "$ko_count" -eq 0 ]; then
    ok "$name ($lines lignes)"
    total_ok=$((total_ok + 1))
  else
    err "$name ($ko_count problème(s) détecté(s) — $lines lignes)"
    total_ko=$((total_ko + 1))
  fi
done
echo
echo "  Résultats : $total_ok audit(s) propre(s), $total_ko avec problème(s)"
echo "  Rapports  : $REPORTS_DIR/"
echo
