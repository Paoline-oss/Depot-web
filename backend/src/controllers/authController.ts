import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
const user = new User({ username, password: passwordHash }) 
    await user.save()
    res.status(201).json({ message: 'Utilisateur créé' })
  } catch (error) {
    res.status(400).json({ message: 'Erreur inscription' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.status(401).json({ message: 'Utilisateur non trouvé' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ message: 'Mot de passe incorrect' })

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
    res.json({ token })
  } catch (error) {
    res.status(400).json({ message: 'Erreur connexion' })
  }
}