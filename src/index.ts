// Importation des modules nécessaires
import express, { Request, Response } from 'express'; // Framework Express et types pour les requêtes/réponses
import * as dotenv from 'dotenv'; // Permet de charger les variables d’environnement
import userRoutes from './routes/user.routes'; // Importe les routes utilisateurs
// Charge les variables d'environnement depuis le fichier .env
dotenv.config();
console.log(process.env.PORT);
// Création de l'application Express
const app = express();
// Définition du port du serveur (utilise celui de l'environnement ou 3000 par défaut)
const PORT = parseInt(process.env.PORT || '3000', 10);
// Middleware pour parser le JSON dans les requêtes entrantes
app.use(express.json());
// Route de test pour vérifier si le serveur fonctionne
app.get('/', (req: Request, res: Response) => {
 res.send('🚀 API Node.js avec TypeScript fonctionne !'); // Réponse envoyée au client
});
// Utilisation des routes utilisateurs définies dans "user.routes.ts"
app.use('/users', userRoutes);
// Démarrage du serveur sur le port défini
app.listen(PORT, () => {
 console.log(`✅ Serveur démarré sur http://localhost:${PORT}`); // Message de confirmation dans la console
});