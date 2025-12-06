import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import heroRoutes from './routes/heroRoutes'
import authRoutes from './routes/authRoutes'
import adminRoutes from './routes/adminRoutes'
import { authMiddleware } from './middleware/authMiddleware'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const isDev = process.env.NODE_ENV === 'development'

app.use(cors())
app.use(express.json())

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB:', err))

// Routes
app.use('/api/auth', authRoutes)

// 🔓 En mode dev : accès libre
// 🔒 En prod : accès protégé par le middleware
if (isDev) {
  app.use('/api/heroes', heroRoutes)
  app.use('/api/admin', adminRoutes)
} else {
  app.use('/api/heroes', authMiddleware, heroRoutes)
  app.use('/api/admin', authMiddleware, adminRoutes)
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API en ligne 🚀' })
})

app.listen(PORT, () => {
  console.log(`🚀 Serveur backend lancé sur http://localhost:${PORT}`)
})