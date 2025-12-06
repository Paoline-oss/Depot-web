import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User"

const router = express.Router()

// Création de compte
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ username, password: hashedPassword })
    await user.save()
    res.json({ message: "Compte créé avec succès" })
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" })
  }
})

// Connexion
router.post("/login", async (req, res) => {
 try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: "Utilisateur introuvable" })
    console.log("Mot de passe fourni :", password)
    console.log("Mot de passe en base :", user.password)

    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) return res.status(400).json({ error: "Mot de passe incorrect" })

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" })
    res.json({ message: "Connexion réussie", token })
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" })
  }
})


export default router