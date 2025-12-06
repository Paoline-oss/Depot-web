import { useEffect, useState } from "react"
import axios from "axios"

interface Hero {
  id: number
  name: string
  slug: string
  biography: {
    fullName: string
    publisher: string
    gender: string
  }
  images: {
    sm: string
  }
}




export default function Dashboard() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [search, setSearch] = useState("")
  const [filterPublisher, setFilterPublisher] = useState("all")

  useEffect(() => {
    axios.get("http://localhost:5000/api/heroes")
      .then(res => setHeroes(res.data))
      .catch(err => console.error(err))
  }, [])

    // ⚡ Filtrage des héros selon la recherche
  const filteredHeroes = heroes.filter(hero =>{
    const matchSearch = 
      hero.name.toLowerCase().includes(search.toLowerCase()) ||
      hero.biography?.fullName?.toLowerCase().includes(search.toLowerCase())
    const matchPublisher = 
      filterPublisher == "all" || hero.biography?.publisher == filterPublisher
    return matchSearch && matchPublisher
})


  return (
    <div>
      <h1>Liste des héros</h1>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="🔍 Rechercher un héros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%" }}
      />
      <div style={{ marginBottom: "1rem" }}>
        <label>Éditeur : </label>
        <select value={filterPublisher} onChange={(e) => setFilterPublisher(e.target.value)}>
          <option value="all">Tous</option>
          <option value="Marvel Comics">Marvel</option>
          <option value="DC Comics">DC</option>
        </select>
      </div>

      <ul>
  {filteredHeroes.map(hero => (
    <li key={hero.id}>
      <h2>{hero.name}</h2>
      <p><strong>Nom complet :</strong> {hero.biography?.fullName}</p>
      <p><strong>Éditeur :</strong> {hero.biography?.publisher}</p>
      <img src={`/images/${hero.images.sm}`} alt={hero.name} />


    </li>
  ))}
</ul>
    </div>
  )
}