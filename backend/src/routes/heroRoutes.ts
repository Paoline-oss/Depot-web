import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware'
import { uploadMiddleware } from '../middleware/uploadMiddleware'
import { createHero, getHeroes, updateHero, deleteHero } from '../controllers/heroController'
import Hero from "../models/Hero"

const router = express.Router()

// Liste des héros
router.get('/', getHeroes)

// Création d’un héros avec image (protégé par authMiddleware)
router.post('/', uploadMiddleware.single('image'), createHero)
router.put('/:id', uploadMiddleware.single('image'), updateHero)


// Mise à jour d’un héros
router.put('/:id', authMiddleware, uploadMiddleware.single('image'), updateHero)

// Suppression d’un héros
router.delete("/name/:name", async (req, res) => {
  try {
    const hero = await Hero.findOneAndDelete({ name: req.params.name })
    if (!hero) {
      return res.status(404).json({ error: "Héros non trouvé" })
    }
    res.json({ message: `Héros ${req.params.name} supprimé avec succès` })
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" })
  }
})



export default router