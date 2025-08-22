"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio_group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Globe, Users, Lock } from "lucide-react"
import SettingsLayout from "../../components/settings_layout"

export default function ProfileVisibility() {
  const [visibility, setVisibility] = useState("friends")
  const [settings, setSettings] = useState({
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    showActivity: false,
  })

  const visibilityOptions = [
    {
      value: "public",
      label: "Público",
      description: "Cualquiera puede ver tu perfil",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      value: "friends",
      label: "Solo amigos",
      description: "Solo tus contactos pueden ver tu perfil",
      icon: <Users className="w-5 h-5" />,
    },
    {
      value: "private",
      label: "Privado",
      description: "Solo tú puedes ver tu perfil",
      icon: <Lock className="w-5 h-5" />,
    },
  ]

  const handleSettingToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Quién puede ver tu perfil</h1>

      <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
        <CardHeader>
          <CardTitle>Visibilidad del perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={visibility} onValueChange={setVisibility}>
            {visibilityOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 p-4 rounded-lg border border-gray-600 hover:bg-gray-700"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex items-center gap-3 cursor-pointer flex-1">
                  {option.icon}
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-400">{option.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Configuración detallada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Mostrar correo electrónico</h3>
              <p className="text-sm text-gray-400">Permite que otros vean tu email</p>
            </div>
            <Switch checked={settings.showEmail} onCheckedChange={() => handleSettingToggle("showEmail")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Mostrar teléfono</h3>
              <p className="text-sm text-gray-400">Permite que otros vean tu número</p>
            </div>
            <Switch checked={settings.showPhone} onCheckedChange={() => handleSettingToggle("showPhone")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Mostrar ubicación</h3>
              <p className="text-sm text-gray-400">Permite que otros vean tu ciudad</p>
            </div>
            <Switch checked={settings.showLocation} onCheckedChange={() => handleSettingToggle("showLocation")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Permitir mensajes</h3>
              <p className="text-sm text-gray-400">Otros usuarios pueden enviarte mensajes</p>
            </div>
            <Switch checked={settings.allowMessages} onCheckedChange={() => handleSettingToggle("allowMessages")} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Mostrar mis certificados</h3>
              <p className="text-sm text-gray-400">Mostrar archivos subidos de tu preferencia</p>
            </div>
            <Switch checked={settings.showActivity} onCheckedChange={() => handleSettingToggle("showActivity")} />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">Guardar configuración</Button>
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}