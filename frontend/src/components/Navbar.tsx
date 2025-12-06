import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "1rem",
      backgroundColor: "#282c34",
      color: "white"
    }}>
      <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>🏠 Dashboard</Link>
      <Link to="/add" style={{ color: "white", textDecoration: "none" }}>➕ Ajouter un héros</Link>
      <Link to="/delete" style={{ color: "white", textDecoration: "none" }}>🗑 Supprimer un héros</Link>
      <Link to="/login" style={{ color: "white", textDecoration: "none" }}>🔑 Déconnexion</Link>
    </nav>
  )
}