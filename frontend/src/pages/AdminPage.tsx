import { useEffect, useState } from "react"
import axios from "axios"

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(res.data)
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div>
      <h2>Gestion des utilisateurs</h2>
      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.username} – {user.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}