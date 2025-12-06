import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import Hero from './models/Hero'
import dotenv from 'dotenv'
dotenv.config()

async function seedHeroes() {
  await mongoose.connect(process.env.MONGO_URI!)

  const filePath = path.join(__dirname,'data', 'superheroesd.json')
  const data = fs.readFileSync(filePath, 'utf-8')

  // ⚡ On récupère le tableau sous la clé "superheros"
  const parsed = JSON.parse(data)
  const heroes = parsed.superheros

  if (!Array.isArray(heroes)) {
    console.error("❌ Le fichier JSON n'a pas le format attendu (clé 'superheros').")
    return
  }

  await Hero.insertMany(heroes)
  console.log(`✅ ${heroes.length} héros insérés dans la base`)

  mongoose.disconnect()
}

seedHeroes()