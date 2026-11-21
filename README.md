# Shalom Alonyo — Portfolio

Site personnel de Shalom Alonyo, apprenti technicien de maintenance chez Serignac Services (Toulouse), en BTS Maintenance des Systèmes (2026 – 2028).

**En ligne :** https://shalomalonyo-glitch.github.io/Shalom-Alonyo/

## Contenu

- **Profil** — qui je suis, où je travaille, ce que je prépare
- **Jusqu'ici** — mes interventions en chiffres (décompte personnel)
- **Le système** — schéma hydraulique animé d'une grue : cliquer sur un organe pour voir à quoi il sert et ce que j'ai fait dessus
- **Interventions** — six chantiers racontés pas à pas (constat, diagnostic, action, résultat)
- **Atelier** — photos de l'atelier
- **Parcours**, **Compétences**, **Contact**

Les photos sont les miennes. Aucun nom de client, aucune plaque, aucun document interne.

## Structure

```
index.html              tout le site (HTML, CSS et JS dans un seul fichier)
Shalom_Alonyo_CV.pdf    CV, une page
assets/                 photos (.webp), carte de partage (og-card.jpg), logo
```

Les dossiers `css/` et `js/` et les anciennes images de `assets/` appartiennent à la version précédente du site ; ils ne sont plus utilisés.

## Modifier le site

- Les textes sont dans `index.html`. Chaque texte français porte sa traduction dans l'attribut `data-en`.
- Les fiches du schéma (`PARTS`) et les interventions (`CASES`) sont des tableaux au début du script, en bas de `index.html`.
- Pour ajouter une intervention : copier un bloc de `CASES`, changer les textes et les noms d'images (fichiers `.webp` dans `assets/`).

## Voir le site en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

Polices : Archivo et JetBrains Mono (Google Fonts). Hébergement : GitHub Pages.
