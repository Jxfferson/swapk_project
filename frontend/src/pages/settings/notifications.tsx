"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import SettingsLayout from "../../components/settings_layout"

export default function Notifications() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true,
    security: true,
    updates: false,
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notificaciones</h1>

      <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
        <CardHeader>
          <CardTitle>Preferencias de notificación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notificaciones por email</h3>
              <p className="text-sm text-gray-400">Recibe notificaciones importantes por correo</p>
            </div>
            <Switch checked={notifications.email} onCheckedChange={() => handleToggle("email")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notificaciones push</h3>
              <p className="text-sm text-gray-400">Notificaciones en tiempo real en el navegador</p>
            </div>
            <Switch checked={notifications.push} onCheckedChange={() => handleToggle("push")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Alertas de seguridad</h3>
              <p className="text-sm text-gray-400">Notificaciones sobre actividad sospechosa</p>
            </div>
            <Switch checked={notifications.security} onCheckedChange={() => handleToggle("security")} />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Guardar preferencias</Button>
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}
