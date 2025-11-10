# TP6_API : 
C'est les fichiers, d'une api REST avec une base de donné SQLite avc Prisma

## Fonctionnalités :
- Création d'utilisateurs
- Récupération de tous les utilisateurs
- Récupération d'un utilisateur par ID
- Mise a jour d'un utilisateur
- Suppression d'un utilisateur

  ## Installation
  - Installer les dépendances : npm install
  - Configurer l'environnement dans .env : PORT=400 et DATABASE_URL="file:./dev.db"
  - Générer le client Prisma : npx prisma generate
  - Créer la base de données : npx prisma migrate dev --name init
## Lancer le serveur : 
npm run dev 
