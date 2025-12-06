// backend/seedAdmin.ts
import User from './models/User'

export const seedAdmin = async () => {
  const existing = await User.findOne({ username: 'admin' })
  if (!existing) {
    const admin = new User({
      username: 'admin',
      password: 'admin', // sera hashé par ton modèle
      role: 'admin'
    })
    await admin.save()
    console.log('✅ Admin créé : admin / admin123')
  }
}
export default seedAdmin;