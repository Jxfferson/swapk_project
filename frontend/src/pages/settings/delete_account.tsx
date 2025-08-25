"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import SettingsLayout from "../../components/settings_layout"

export default function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [userData, setUserData] = useState<{
    nombre: string;
    correo: string;
    id: number;
  } | null>(null)

  // 🔁 Cargar datos del usuario al iniciar
  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUserStr = localStorage.getItem("user")
        if (!savedUserStr) {
          setMessage("No has iniciado sesión")
          return
        }

        const savedUser = JSON.parse(savedUserStr)
        setUserData({
          nombre: savedUser.nombre || savedUser.user?.nombre || "Usuario",
          correo: savedUser.correo || savedUser.user?.correo || "No disponible",
          id: savedUser.id
        })
      } catch (err) {
        console.error("Error al cargar datos del usuario:", err)
        setMessage("Error al cargar tu información")
      }
    }

    loadUserData()
  }, [])

  // ✅ Eliminar cuenta
  const handleDelete = async () => {
    if (confirmText !== "ELIMINAR") {
      setMessage("Debes escribir 'ELIMINAR' para confirmar")
      return
    }

    if (!password) {
      setMessage("Debes ingresar tu contraseña")
      return
    }

    if (!window.confirm("¿Estás seguro? Esta acción no se puede deshacer.")) {
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

      const res = await fetch("http://localhost:8000/users/me", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ password }) // Asegúrate de que tu backend espere la contraseña
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Error al eliminar la cuenta")
      }

      // ✅ Éxito: limpiar sesión
      localStorage.removeItem("user")
      localStorage.removeItem("token") // por si lo tienes guardado aparte
      setMessage("Cuenta eliminada correctamente ✅")

      // ✅ Redirigir al login después de 2 segundos
      setTimeout(() => {
        window.location.href = "/auth/login"
      }, 2000)

    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Eliminar cuenta</h1>

        {message && (
          <p className={`text-sm ${message.includes("Error") || message.includes("no") ? "text-red-400" : "text-green-400"}`}>
            {message}
          </p>
        )}

        {/* Mostrar datos del usuario */}
        {userData && (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold">Verificando tu identidad</h3>
            <p><strong>Nombre:</strong> {userData.nombre}</p>
            <p><strong>Correo:</strong> {userData.correo}</p>
          </div>
        )}

        <Card className="bg-red-900/20 border-red-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Zona de peligro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-700">
              <h3 className="font-semibold text-red-300 mb-2">¡Advertencia!</h3>
              <p className="text-sm text-red-200">
                Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos, incluyendo tu perfil,
                configuraciones y cualquier contenido asociado.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Escribe "ELIMINAR" para confirmar</label>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="ELIMINAR"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirma tu contraseña</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={confirmText !== "ELIMINAR" || !password || loading}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Eliminando..." : "Eliminar cuenta permanentemente"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  )
}