import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:5000/api/auth/login", { username, password })
        alert("✅ Connexion réussie")
        localStorage.setItem("token", res.data.token)
        navigate("/dashboard")
      } else {
        await axios.post("http://localhost:5000/api/auth/register", { username, password })
        alert("✅ Compte créé avec succès")
        setIsLogin(true)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "❌ Erreur")
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "2rem",
        width: "300px",
        backgroundColor: "#f9f9f9"
      }}>
        <h1>{isLogin ? "Connexion" : "Créer un compte"}</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />

        <button type="submit" style={{
          width: "100%",
          padding: "0.5rem",
          backgroundColor: "#282c34",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          {isLogin ? "Se connecter" : "Créer un compte"}
        </button>

        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          {isLogin ? "Pas encore inscrit ?" : "Déjà un compte ?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {isLogin ? "Créer un compte" : "Se connecter"}
          </span>
        </p>
      </form>
    </div>
  )
}