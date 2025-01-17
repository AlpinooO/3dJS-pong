# Un pong en 3Djs et oui possible


## Commandes

### Joueur 1:
Z pour monter et S pour descendre.

### Joueur 2:
flèche haut pour monter et flèche du bas pour descendre.

## comportement de la balle

La balle accélère a chaque itération (quand elle touche une raquête quoi). Il y a beaucoup de math pour savoir la direction que va prendre la balle.

## Score

Le score est affiché dans la console (j'ai pas vraiment le temps de faire un affichage pour ça désolé 😿).

## Lumière

Les lumières on été mise (ce sont des ambiant lights)

## Caméra

La caméra est fixe, cependant pour vérifier l'environnement, il y a le script pour pouvoir changer la camera (je l'ai mis en commentaire).

## Projet

Ce projet à été fait uniquement par moi en 2h30. Il a été éffectué dans le cadre d'un projet scolaire au sein d'EFREI.



# Installation


Vous pouvez installer le projet et le lancer vous même.



```bash
#initialiser node
npm init -y
#installer vite
npm i vite
#installer three
nmp i three
```

Dans le fichier package.json, vous devez remplacer "test"  par   "dev": "vite"

puis


```bash
#réinstaller npm
npm install
#puis lancer le projet
npm run dev

```

controle click sur le liens et vous avez le projet!