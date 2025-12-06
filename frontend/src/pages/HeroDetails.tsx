import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

export default function HeroDetails() {
  const { id } = useParams<{ id: string }>()
  const [hero, setHero] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(`/api/heroes/${id}`)
        setHero(res.data)
      } catch (error) {
        console.error("Erreur lors du chargement du héros", error)
      }
    }
    fetchHero()
  }, [id])

  if (!hero) return <p>Chargement...</p>

  const handleDelete = async () => {
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`/api/heroes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Héros supprimé ❌")
      navigate("/dashboard")
    } catch (error) {
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <div>
      <h2>{hero.nom} ({hero.alias})</h2>
      <p><strong>Univers :</strong> {hero.univers}</p>
      <p><strong>Pouvoirs :</strong> {hero.pouvoirs}</p>
      <p><strong>Description :</strong> {hero.description}</p>
      {hero.image && <img src={`/uploads/${hero.image}`} alt={hero.nom} />}
      <button onClick={() => navigate(`/edit/${hero._id}`)}>Modifier</button>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  )
}