"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio_group"
import { Label } from "@/components/ui/label"
import SettingsLayout from "../../components/settings_layout"

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState("es")

  const languages = [
    { value: "es", label: "Español", flag: "🇪🇸" },
    { value: "en", label: "English", flag: "🇺🇸" },
    { value: "pt", label: "Português", flag: "🇧🇷" },
  ]

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Idioma</h1>

      <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
        <CardHeader>
          <CardTitle>Seleccionar idioma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage}>
            {languages.map((language) => (
              <div key={language.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700">
                <RadioGroupItem value={language.value} id={language.value} />
                <Label htmlFor={language.value} className="flex items-center gap-3 cursor-pointer flex-1">
                  <span className="text-2xl">{language.flag}</span>
                  <span className="font-medium">{language.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="pt-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Aplicar cambios</Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}
