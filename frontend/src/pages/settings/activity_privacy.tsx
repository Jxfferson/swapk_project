"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio_group"
import { useTheme } from "../../components/state/theme_context"
import SettingsLayout from "../../components/settings_layout"

export default function ActivityPrivacy() {
  const { theme } = useTheme()
  const [settings, setSettings] = useState({
    onlineStatus: "todos",
    lastAccess: "nadie",
  })

  const cardBg = theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50"
  const borderColor = theme === "dark" ? "border-[#2a2a2a]" : "border-[#2a2a2a]"

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Privacidad de actividad</h1>

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
                onValueChange={(value) => setSettings({ ...settings, onlineStatus: value })}
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
                onValueChange={(value) => setSettings({ ...settings, lastAccess: value })}
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
