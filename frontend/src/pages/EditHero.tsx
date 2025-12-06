import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Formik, Form, Field } from "formik"

export default function EditHero() {
  const { id } = useParams<{ id: string }>()
  const [initialValues, setInitialValues] = useState<any>(null)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`/api/heroes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setInitialValues(res.data)
      } catch (error) {
        console.error("Erreur lors du chargement du héros", error)
      }
    }
    fetchHero()
  }, [id])

  if (!initialValues) return <p>Chargement...</p>

  const handleSubmit = async (values: any) => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(`/api/heroes/${id}`, values, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Héros mis à jour 🚀")
    } catch (error) {
      alert("Erreur lors de la mise à jour ❌")
    }
  }

  return (
    <div>
      <h2>Modifier un héros</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label>Nom</label>
            <Field name="nom" />
          </div>
          <div>
            <label>Alias</label>
            <Field name="alias" />
          </div>
          <div>
            <label>Univers</label>
            <Field as="select" name="univers">
              <option value="Marvel">Marvel</option>
              <option value="DC">DC</option>
              <option value="Autre">Autre</option>
            </Field>
          </div>
          <div>
            <label>Pouvoirs</label>
            <Field name="pouvoirs" />
          </div>
          <div>
            <label>Description</label>
            <Field as="textarea" name="description" />
          </div>
          <button type="submit">Mettre à jour</button>
        </Form>
      </Formik>
    </div>
  )
}