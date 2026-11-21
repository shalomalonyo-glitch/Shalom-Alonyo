# Shalom Alonyo, portfolio

Site personnel de Shalom Alonyo, technicien de maintenance en alternance à Toulouse (BTS Maintenance des Systèmes).

En ligne : https://shalomalonyo-glitch.github.io/Shalom-Alonyo/

## Contenu

La page s'ouvre sur une photo et un bouton pour me contacter. Vient ensuite un camion-grue en 3D que l'on pilote avec une télécommande à leviers : le site explique ce qui se passe dans le circuit hydraulique à chaque mouvement, et le calculateur refuse les manœuvres dangereuses. Le reste présente mon travail et mon parcours. La page se termine par un téléphone dont les icônes m'appellent ou m'écrivent directement.

## Fichiers

```
index.html              tout le site (HTML, CSS et JS dans un seul fichier)
mentions-legales.html   mentions légales et données personnelles
404.html                page affichée quand un lien n'existe pas
Shalom_Alonyo_CV.pdf    CV, une page
Shalom_Alonyo.vcf       fiche contact à enregistrer dans un téléphone
assets/                 photos (.webp), polices (.woff2), carte de partage, logo
assets/grue3d.js        la scène 3D (three.js, licence MIT, incluse dans le fichier)
```

Les dossiers `css/` et `js/` et une partie des images de `assets/` viennent des versions précédentes. Le site ne les utilise plus.

## Modifier le site

- Les textes sont dans `index.html`. Chaque texte français porte sa traduction anglaise dans l'attribut `data-en`.
- Les messages de la grue sont dans l'objet `MSG`, au début du script en bas de `index.html`.
- La scène 3D est dans `assets/grue3d.js`. Si elle ne démarre pas sur un appareil, la page affiche la grue en 2D à la place.
- Les trois images du parcours autres que la photo des robots sont des illustrations générées.
- Les polices (Bricolage Grotesque et Hanken Grotesk, licence OFL) sont servies par le site. Aucun service extérieur n'est appelé.

## Voir le site en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
