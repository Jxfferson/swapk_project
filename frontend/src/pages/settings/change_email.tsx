"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SettingsLayout from "../../components/settings_layout"

export default function ChangeEmail() {
  const [currentEmail, setCurrentEmail] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // 🔁 Cargar correo del usuario desde localStorage o API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const savedUserStr = localStorage.getItem("user")
        if (!savedUserStr) {
          setMessage("No has iniciado sesión")
          return
        }

        const savedUser = JSON.parse(savedUserStr)
        const token = savedUser.token
        const emailFromStorage = savedUser.correo || savedUser.user?.correo

        // ✅ Primero intenta usar el correo de localStorage
        if (emailFromStorage) {
          setCurrentEmail(emailFromStorage)
        }

        // ✅ Luego refresca desde API (opcional)
        const res = await fetch("http://localhost:8000/users/me", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (res.ok) {
          const data = await res.json()
          const apiEmail = data.correo // ✅ Usa 'correo', no 'email'
          setCurrentEmail(apiEmail)

          // ✅ Actualiza localStorage si hay cambios
          if (apiEmail !== savedUser.correo) {
            const updatedUser = { ...savedUser, correo: apiEmail }
            localStorage.setItem("user", JSON.stringify(updatedUser))
          }
        }
      } catch (err) {
        console.error("Error al obtener usuario:", err)
        setMessage("No se pudo cargar tu información")
      }
    }

    fetchUser()
  }, [])

  // ✅ Actualizar correo
  const handleUpdate = async () => {
    if (newEmail !== confirmEmail) {
      setMessage("Los correos no coinciden")
      return
    }

    if (!newEmail) {
      setMessage("El correo no puede estar vacío")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const savedUserStr = localStorage.getItem("user")
      if (!savedUserStr) {
        setMessage("No has iniciado sesión")
        return
      }

      const savedUser = JSON.parse(savedUserStr)
      const token = savedUser.token
      const userId = savedUser.id

      const res = await fetch(`http://localhost:8000/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          correo: newEmail  // ✅ Asegúrate de que tu backend espere 'correo'
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Error al actualizar correo")
      }

      // ✅ Actualiza estado y localStorage
      setCurrentEmail(newEmail)
      setNewEmail("")
      setConfirmEmail("")

      const updatedUser = {
        ...savedUser,
        correo: newEmail,
        user: { ...savedUser.user, correo: newEmail }
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))

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
              <Input 
                value={currentEmail} 
                disabled 
                className="bg-gray-600 border-gray-500 text-gray-300" 
              />
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