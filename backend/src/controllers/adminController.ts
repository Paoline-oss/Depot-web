import { Request, Response } from 'express'
import User from '../models/User'

// Récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-passwordHash') // on cache le mot de passe
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// Mettre à jour le rôle d’un utilisateur
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-passwordHash')

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: 'Erreur mise à jour rôle' })
  }
}

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' })
    res.json({ message: 'Utilisateur supprimé' })
  } catch (error) {
    res.status(400).json({ message: 'Erreur suppression utilisateur' })
  }
}