console.log("✅ user.routes.ts chargé");
// Importation du module Router d'Express pour gérer les routes
import { Router } from 'express';
// Importation des contrôleurs qui gèrent la logique métier pour les utilisateurs
import {
    getUsers,
    addUser,
    getUserById,
    updateUser,
    deleteUser,} from '../controllers/user.controller';
// Création d'un routeur Express
const router = Router();

/**
* Route GET /users
* Description : Récupère la liste des utilisateurs
* Contrôleur associé : getUsers (défini dans user.controller.ts)
*/
router.get('/users/:id', getUserById);
router.get('/users', getUsers);
/**
* Route POST /users
* Description : Ajoute un nouvel utilisateur
* Contrôleur associé : addUser (défini dans user.controller.ts)
*/
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Exportation du routeur pour l'utiliser dans index.ts
export default router;