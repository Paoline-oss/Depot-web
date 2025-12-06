import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token manquant' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    req.user = decoded // on attache l’utilisateur à la requête
    next()
  } catch (error) {
    res.status(403).json({ message: 'Token invalide' })
  }
}