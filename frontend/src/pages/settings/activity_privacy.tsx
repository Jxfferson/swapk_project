"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio_group"
import { useTheme } from "../../components/state/theme_context"
import SettingsLayout from "../../components/settings_layout"

// Tipos para la privacidad
interface PrivacySettings {
  onlineStatus: "todos" | "contactos" | "nadie"
  lastAccess: "todos" | "contactos" | "nadie"
}

export default function ActivityPrivacy() {
  const { theme } = useTheme()
  const [settings, setSettings] = useState<PrivacySettings>({
    onlineStatus: "todos",
    lastAccess: "nadie",
  })
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")

  // 🔁 Cargar configuración inicial
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // ✅ Intenta cargar desde localStorage
        const savedUserStr = localStorage.getItem("user")
        if (savedUserStr) {
          const savedUser = JSON.parse(savedUserStr)
          const savedSettings = savedUser.privacySettings
          if (savedSettings) {
            setSettings(savedSettings)
            setLoading(false)
            return
          }
        }

        // ✅ Si no está en localStorage, intenta desde API
        const token = JSON.parse(localStorage.getItem("user") || "{}")?.token
        if (!token) return

        const res = await fetch("http://localhost:8000/users/me", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (res.ok) {
          const data = await res.json()
          const apiSettings = data.privacidad || {} // Asume que el backend devuelve { privacidad: { onlineStatus, lastAccess } }

          setSettings(prev => ({
            ...prev,
            onlineStatus: apiSettings.onlineStatus || prev.onlineStatus,
            lastAccess: apiSettings.lastAccess || prev.lastAccess
          }))
        }
      } catch (err) {
        console.error("Error al cargar configuración:", err)
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  // ✅ Guardar cambios en backend
  const handleSave = async (field: keyof PrivacySettings, value: string) => {
    const newValue = value as PrivacySettings[keyof PrivacySettings]
    setSettings(prev => ({ ...prev, [field]: newValue }))
    setMessage("")

    try {
      const savedUserStr = localStorage.getItem("user")
      if (!savedUserStr) throw new Error("No has iniciado sesión")
      
      const savedUser = JSON.parse(savedUserStr)
      const token = savedUser.token

      // ✅ Guarda en backend
      const res = await fetch("http://localhost:8000/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
          privacidad: { 
            ...settings, 
            [field]: newValue 
          } 
        })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.detail || "Error al guardar")
      }

      // ✅ Actualiza localStorage
      const updatedUser = {
        ...savedUser,
        privacySettings: { ...settings, [field]: newValue }
      }
      localStorage.setItem("user", JSON.stringify(updatedUser))

      setMessage("Configuración guardada ✅")
    } catch (err: any) {
      setMessage(err.message)
      // Revertir cambio si falla
      setSettings(prev => ({ ...prev, [field]: settings[field] }))
    }
  }

  const cardBg = theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50"
  const borderColor = theme === "dark" ? "border-[#2a2a2a]" : "border-[#2a2a2a]"

  if (loading) {
    return (
      <SettingsLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </SettingsLayout>
    )
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Privacidad de actividad</h1>

        {message && (
          <p className={`text-sm ${message.includes("Error") ? "text-red-400" : "text-green-400"}`}>
            {message}
          </p>
        )}

        <Card className={`${cardBg} border ${borderColor}`}>
          <CardHeader>
            <CardTitle>Configuración de visibilidad</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Mostrar en línea */}
            <div>
              <Label className="font-medium">Mostrar cuando estás en línea</Label>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Permite que otros usuarios vean cuando estás conectado
              </p>
              <RadioGroup
                value={settings.onlineStatus}
                onValueChange={(value) => handleSave("onlineStatus", value)}
                className="mt-3 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="todos" id="online-todos" />
                  <Label htmlFor="online-todos">Todos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contactos" id="online-contactos" />
                  <Label htmlFor="online-contactos">Mis contactos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nadie" id="online-nadie" />
                  <Label htmlFor="online-nadie">Nadie</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Mostrar último acceso */}
            <div>
              <Label className="font-medium">Mostrar último acceso</Label>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Permite que otros usuarios vean cuándo fue tu última conexión
              </p>
              <RadioGroup
                value={settings.lastAccess}
                onValueChange={(value) => handleSave("lastAccess", value)}
                className="mt-3 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="todos" id="last-todos" />
                  <Label htmlFor="last-todos">Todos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contactos" id="last-contactos" />
                  <Label htmlFor="last-contactos">Mis contactos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nadie" id="last-nadie" />
                  <Label htmlFor="last-nadie">Nadie</Label>
                </div>
              </RadioGroup>
            </div>

          </CardContent>
        </Card>
      </div>
    </SettingsLayout>
  )
}