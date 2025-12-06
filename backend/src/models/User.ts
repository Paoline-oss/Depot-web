import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
  username: string
  password: string
  role: 'admin' | 'editor'
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
})

// Avant sauvegarde → hash du mot de passe
UserSchema.pre('save', async function (next) {
  const user = this as IUser
  if (!user.isModified('password')) return next()
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model<IUser>('User', UserSchema)
export default User