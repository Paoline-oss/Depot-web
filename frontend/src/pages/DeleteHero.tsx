import { useEffect, useState } from "react"
import axios from "axios"

interface Hero {
  id: number
  name: string
  biography: {
    fullName: string
    publisher: string
  }
  images: {
    sm: string
  }
}

export default function DeleteHeroByName() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5000/api/heroes")
      .then(res => setHeroes(res.data))
      .catch(err => console.error(err))
  }, [])

  // Filtrage par nom
  const filteredHeroes = heroes.filter(hero =>
    hero.name?.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (name: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/heroes/name/${name}`)
      alert(`✅ Héros ${name} supprimé avec succès`)
      // Mise à jour locale de la liste
      setHeroes(prev => prev.filter(h => h.name !== name))
    } catch (err) {
      setError("❌ Impossible de supprimer le héros")
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Supprimer un héros</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="🔍 Rechercher par nom..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Liste filtrée */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredHeroes.map(hero => (
          <li key={hero.id} style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}>
            <img src={`/images/${hero.images.sm}`} alt={hero.name} />
            <div style={{ flex: 1 }}>
              <h2>{hero.name}</h2>
              <p><strong>Nom complet :</strong> {hero.biography?.fullName}</p>
              <p><strong>Éditeur :</strong> {hero.biography?.publisher}</p>
            </div>
            <button
              onClick={() => handleDelete(hero.name)}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {filteredHeroes.length === 0 && search && <p>Aucun héros trouvé 😢</p>}
    </div>
  )
}