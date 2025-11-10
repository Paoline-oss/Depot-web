// Importation des types Request et Response depuis Express
// Request : représente la requête HTTP reçue
// Response : représente la réponse HTTP envoyée au client
import { Request, Response } from 'express';
//import { Z_MEM_ERROR } from 'zlib';
import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
/**
* Contrôleur pour la route GET /users
* Description : Renvoie un message avec la liste des utilisateurs (simulation)
* @param req - Objet représentant la requête HTTP (non utilisé ici)
* @param res - Objet permettant d'envoyer une réponse HTTP
*/
// GET /users - Recupere les données de tous les utilisateurs
export const getUsers = async (req: Request, res: Response) => {
    try {
    const users = await prisma.user.findMany();
    res.json({ users}); // Envoie une réponse JSON du tableau users

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
//GET/users/:id Recupére les données d'un utilisateur spécifique
export const getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

/**
* Contrôleur pour la route POST /users
* Description : Ajoute un nouvel utilisateur en récupérant les données du corps de la requête
* @param req - Objet représentant la requête HTTP contenant les données utilisateur
* @param res - Objet permettant d'envoyer une réponse HTTP
*/
//POST /users Ajout un utilisaeur
export const addUser = async (req: Request, res: Response) => {
    const { name, email } = req.body; // Récupération des données envoyées dans le corps de la requête
    
    if(!name || !email){
        return res.status(400).json({error: 'le nom et l email sont requis.'});
    } try {
        const newUser = await prisma.user.create({
            data: { name, email },
        });
        res.status(200).json(newUser);
    }catch(error){
        // @ts-ignore
        res.status(500).json({ error: error.message || 'Erreur lors de la création de l’utilisateur.' });
    }
};

// PUT /users/:id mettre un jour un utilisateur
export const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email },
        });
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE /users/:id Supprimer un utilisateur spécifique
export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        await prisma.user.delete({ where: { id } });
        res.json({ message: `Utilisateur ${id} supprimé.` });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
