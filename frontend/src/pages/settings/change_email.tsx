"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SettingsLayout from "../../components/settings_layout"

export default function ChangeEmail() {
  const [currentEmail, setCurrentEmail] = useState("eduardo@example.com")
  const [newEmail, setNewEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:8000/users/me", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await res.json()
        setCurrentEmail(data.email)
      } catch (err) {
        console.error("Error al obtener usuario:", err)
      }
    }

    fetchUser()
  }, [])

  const handleUpdate = async () => {
    if (newEmail !== confirmEmail) {
      setMessage("Los correos no coinciden")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const token = localStorage.getItem("token") // 👈 Asegúrate de guardar el JWT en login
      const res = await fetch("http://localhost:8000/users/change-email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ new_email: newEmail }) // 👈 debe coincidir con lo que espera tu backend
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.detail || "Error al actualizar correo")

      setCurrentEmail(newEmail)
      setNewEmail("")
      setConfirmEmail("")
      setMessage("Correo actualizado correctamente ✅")

    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Cambiar correo electrónico</h1>

        <Card className="bg-[#1a1a1a] border-[#1f1f1f]">
          <CardHeader>
            <CardTitle>Actualizar correo electrónico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Correo actual</label>
              <Input value={currentEmail} disabled className="bg-gray-600 border-gray-500 text-gray-300" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nuevo correo electrónico</label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nuevo@email.com"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirmar nuevo correo</label>
              <Input
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="nuevo@email.com"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            {message && <p className="text-sm text-red-400">{message}</p>}

            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="cursor-pointer bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Actualizando..." : "Actualizar correo"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  )
}
