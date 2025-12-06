import express from 'express'
import { getUsers, updateUserRole, deleteUser } from '../controllers/adminController'
import { authMiddleware } from '../middleware/authMiddleware'
import { roleMiddleware } from '../middleware/roleMiddleware'

const router = express.Router()

// Routes protégées par auth + rôle admin
router.get('/users', authMiddleware, roleMiddleware(['admin']), getUsers)
router.put('/users/:id/role', authMiddleware, roleMiddleware(['admin']), updateUserRole)
router.delete('/users/:id', authMiddleware, roleMiddleware(['admin']), deleteUser)

export default router