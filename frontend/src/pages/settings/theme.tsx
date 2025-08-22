"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio_group"
import { Label } from "@/components/ui/label"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "../../components/state/theme_context"
import SettingsLayout from "../../components/settings_layout"

export default function Theme() {
  const { theme, setTheme } = useTheme()

  const themes = [
    {
      value: "light" as const,
      label: "Claro",
      description: "Tema claro para uso diurno",
      icon: <Sun className="w-5 h-5" />,
    },
    {
      value: "dark" as const,
      label: "Oscuro",
      description: "Tema oscuro para reducir fatiga visual",
      icon: <Moon className="w-5 h-5" />,
    },
  ]

  const cardBg = theme === "dark" ? "bg-[#1a1a1a]" : "bg-gray-50"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200"

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tema: Claro / Oscuro</h1>
        <Button className="bg-green-600 hover:bg-green-700">Guardar Cambios</Button>
      </div>

      <Card className={`${cardBg} border ${borderColor}`}>
        <CardHeader>
          <CardTitle>Seleccionar tema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={theme} onValueChange={setTheme}>
            {themes.map((themeOption) => (
              <div
                key={themeOption.value}
                className={`flex items-center space-x-3 p-4 rounded-lg border ${borderColor} ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
              >
                <RadioGroupItem value={themeOption.value} id={themeOption.value} />
                <Label htmlFor={themeOption.value} className="flex items-center gap-3 cursor-pointer flex-1">
                  {themeOption.icon}
                  <div>
                    <div className="font-medium">{themeOption.label}</div>
                    <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {themeOption.description}
                    </div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}
