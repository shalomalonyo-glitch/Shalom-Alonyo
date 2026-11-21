# Shalom Alonyo — Portfolio

Site personnel de Shalom Alonyo, futur technicien de maintenance, en BTS Maintenance des Systèmes en alternance à Toulouse.

**En ligne :** https://shalomalonyo-glitch.github.io/Shalom-Alonyo/

## Contenu

- **Accueil** — une phrase, une photo
- **Moi** — qui je suis
- **L'atelier** — hydraulique, diagnostic, mécanique, préventif
- **Le système** — schéma hydraulique animé d'une grue : cliquer sur un organe pour voir à quoi il sert et ce qui se passe quand il lâche
- **Parcours** et **Contact**

## Structure

```
index.html              tout le site (HTML, CSS et JS dans un seul fichier)
Shalom_Alonyo_CV.pdf    CV, une page
assets/                 photos (.webp), carte de partage (og-card.jpg), logo
```

Les dossiers `css/` et `js/` et certaines images de `assets/` viennent des versions précédentes ; ils ne sont plus utilisés.

## Modifier le site

- Les textes sont dans `index.html`. Chaque texte français porte sa traduction dans l'attribut `data-en`.
- Les fiches du schéma sont dans le tableau `PARTS`, au début du script en bas de `index.html`.

## Voir le site en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
