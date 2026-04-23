# Shalom Alonyo — Portfolio

Site personnel de candidature pour une **alternance BTS Maintenance Industrielle / Production — rentrée 2026**.

Bac STI2D spécialité ITEC + 2 ans de BTS Bâtiment. Actuellement agent logistique au Centre Hospitalier de Rodez : supervision quotidienne de 6 AGV Swisslog, diagnostic d'incidents de 1er niveau, intervention terrain avec le contrôleur MCD8.

## Liens

- **Site en ligne** : https://shalomalonyo-glitch.github.io/Shalom-Alonyo/
- **CV (PDF)** : [Shalom_Alonyo_CV.pdf](Shalom_Alonyo_CV.pdf)
- **Email** : shalomalonyo24@gmail.com
- **Téléphone** : 06 33 12 33 26

## Structure

```
.
├── index.html              Site portfolio
├── Shalom_Alonyo_CV.pdf    CV ATS (1 page, accent #2F4FA8)
├── css/
│   └── style.css           Feuille de styles (2 100 lignes)
├── js/
│   └── main.js             JS + i18n FR/EN + module contrôleur
├── assets/
│   ├── logo.png
│   ├── portrait.jpg
│   ├── agv-swisslog.jpg         6 AGV au poste de charge
│   ├── agv-supervision.jpg      Poste de supervision (2 écrans)
│   ├── agv-controller-hand.jpg  Contrôleur MCD8 en main devant un AGV
│   ├── controller-cutout.png    Contrôleur MCD8 détouré
│   ├── doc-agv.jpg              Manuel LAMCAR-R (sous-ensembles)
│   └── main-courante.jpg        Logbook d'incidents
└── README.md
```

## Sections du site

- **Hero** — proposition de valeur
- **Parcours** — bento éditorial
- **AGV** (intervention) — diptyque diagnostic/intervention + module MCD8 interactif
- **Méthode** — 4 cartes : supervision, intervention, documentation LAMCAR-R, traçabilité
- **Expérience** — timeline
- **Compétences** — CAO, production/maintenance, organisation, bureautique, qualités, langues
- **Formation** — BTS Bâtiment + Bac STI2D ITEC
- **Certifications** — Pix + autoformations
- **Plus** — langues et loisirs
- **Contact** — coordonnées + CV

## Sélecteur de langue

Bouton FR / EN dans la nav. Les traductions sont dans `js/main.js` (objet `DICT`). Pour ajouter une chaîne : clé dans les 2 langues + attribut `data-i18n="section.key"` sur l'élément HTML.

## Stack

- HTML + CSS (variables, grid, flexbox, `clamp()`, `100svh`) + vanilla JS
- Polices : Outfit + DM Serif Text (Google Fonts)
- Hébergement : GitHub Pages
- SEO : OpenGraph, Twitter Card, JSON-LD `Person`, canonical

## Développement local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Module contrôleur MCD8

9 hotspots mappés sur les vrais boutons du MCD8 (STOP OVERRIDE / ON TRACK / LOAD2 / AUT-MAN / FW-BW / LOAD1 / ESTOP / SPEED / COM). Les positions `--x/--y` et les données (nom / rôle / quand / précaution / exemple) sont dans `index.html`, bloc `<template id="ctrl-data">`. Voir le commentaire en tête de `js/main.js` pour le guide de configuration.
