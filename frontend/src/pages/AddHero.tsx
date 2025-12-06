import { useState } from "react"
import axios from "axios"

export default function AddHero() {
  const [nom, setNom] = useState("")
  const [alias, setAlias] = useState("")
  const [univers, setUnivers] = useState("")
  const [pouvoirs, setPouvoirs] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    // FormData pour envoyer texte + fichier
    const formData = new FormData()
    formData.append("nom", nom)
    formData.append("alias", alias)
    formData.append("univers", univers)
    formData.append("pouvoirs", pouvoirs)
    if (image) formData.append("image", image)

    try {
      await axios.post("/api/heroes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      alert("Héros ajouté avec image 🚀")
    } catch (error) {
      alert("Erreur lors de l’ajout ❌")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom" value={nom} onChange={e => setNom(e.target.value)} />
      <input type="text" placeholder="Alias" value={alias} onChange={e => setAlias(e.target.value)} />
      <select value={univers} onChange={e => setUnivers(e.target.value)}>
        <option value="">Choisir...</option>
        <option value="Marvel">Marvel</option>
        <option value="DC">DC</option>
        <option value="Autre">Autre</option>
      </select>
      <input type="text" placeholder="Pouvoirs" value={pouvoirs} onChange={e => setPouvoirs(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files?.[0] || null)} />
      <button type="submit">Ajouter</button>
    </form>
  )
}