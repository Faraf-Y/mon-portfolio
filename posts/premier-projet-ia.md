# Mon premier projet IA avec Claude Code

Il y a quelques semaines, j'ai décidé de construire un outil concret pour automatiser
une tâche répétitive de mon quotidien. Plutôt que de me lancer seul dans l'inconnu,
j'ai utilisé **Claude Code** comme partenaire de développement — et l'expérience a
complètement changé ma façon d'apprendre.

## Le problème à résoudre

Chaque semaine, je consolidais manuellement des notes dispersées dans plusieurs fichiers
texte. Le processus prenait 20 à 30 minutes. Pas énorme, mais assez frustrant pour avoir
envie de l'automatiser.

## L'approche : itérer avec l'IA

Au lieu de chercher un tutoriel, j'ai décrit le problème à Claude Code en langage naturel :

> *"Je veux un script Python qui lit tous les fichiers .txt d'un dossier et génère un
> résumé consolidé avec la date et le nom de chaque fichier source."*

En quelques échanges, nous avons construit une première version fonctionnelle. Ce qui m'a
frappé, c'est que l'IA n'écrivait pas *pour* moi — elle écrivait *avec* moi. Chaque bloc
de code était expliqué, chaque choix justifié.

## Ce que j'ai appris

**1. La précision du prompt compte.** Une description vague produit du code vague. Plus
je spécifiais le comportement attendu (format de sortie, gestion des erreurs, encodage),
plus le résultat était utilisable directement.

**2. L'itération est plus rapide que la planification.** Plutôt que de concevoir
l'architecture parfaite avant de coder, on a avancé par petites étapes — chaque version
fonctionnait, même imparfaitement.

**3. Lire le code généré est indispensable.** L'IA peut produire du code incorrect ou
sous-optimal. Comprendre ce qui est écrit reste ma responsabilité.

## Le résultat

Un script de 60 lignes que j'utilise encore aujourd'hui. Le temps de consolidation est
passé de 25 minutes à 3 secondes.

```python
import os
from datetime import date

def consolidate_notes(folder: str, output: str) -> None:
    entries = []
    for filename in sorted(os.listdir(folder)):
        if filename.endswith('.txt'):
            path = os.path.join(folder, filename)
            with open(path, encoding='utf-8') as f:
                entries.append(f"## {filename}\n\n{f.read().strip()}")

    with open(output, 'w', encoding='utf-8') as f:
        f.write(f"# Notes consolidées — {date.today()}\n\n")
        f.write('\n\n---\n\n'.join(entries))

consolidate_notes('notes/', 'resume.md')
```

## La suite

Ce projet m'a confirmé que l'IA n'est pas un raccourci pour éviter d'apprendre — c'est
un accélérateur pour ceux qui veulent apprendre vite. Mon prochain projet : une API REST
simple pour persister ces notes. Avec, bien sûr, Claude Code à mes côtés.
