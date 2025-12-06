import { Request, Response } from 'express'
import Hero from '../models/Hero'

// GET tous les héros
export const getHeroes = async (req: Request, res: Response) => {
  try {
    const heroes = await Hero.find()
    res.json(heroes)
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// POST créer un héros
export const createHero = async (req: Request, res: Response) => {
  try {
    const hero = new Hero(req.body)
    await hero.save()
    res.status(201).json(hero)
  } catch (error) {
    res.status(400).json({ message: 'Erreur création héros' })
  }
}

// PUT mettre à jour un héros
export const updateHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(hero)
  } catch (error) {
    res.status(400).json({ message: 'Erreur mise à jour héros' })
  }
}

// DELETE supprimer un héros
export const deleteHero = async (req: Request, res: Response) => {
  try {
    await Hero.findByIdAndDelete(req.params.id)
    res.json({ message: 'Héros supprimé' })
  } catch (error) {
    res.status(400).json({ message: 'Erreur suppression héros' })
  }
}