"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio_group"
import { Label } from "@/components/ui/label"
import SettingsLayout from "../../components/settings_layout"

// ✅ Define los tipos correctamente
type LanguageValue = "es" | "en" | "pt"

interface LanguageOption {
  value: LanguageValue
  label: string
  flag: string
}

const languages: LanguageOption[] = [
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "en", label: "English", flag: "🇺🇸" },
  { value: "pt", label: "Português (Próximamente...)", flag: "🇧🇷" },
] as const

export default function Language() {
  const [selectedLanguage, setSelectedLanguage] = useState<"es" | "en">("es")

  // 🔁 Cargar idioma guardado al iniciar
  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage")
    if (savedLang === "es" || savedLang === "en") {
      setSelectedLanguage(savedLang)
    } else {
      const browserLang = navigator.language.startsWith("es") ? "es" : "en"
      setSelectedLanguage(browserLang)
    }
  }, [])

  // ✅ Tipa `value` como `LanguageValue`
  const handleLanguageChange = (value: LanguageValue) => {
    if (value === "pt") return // ✅ Ahora TypeScript sabe que "pt" es un valor válido

    const newLang = value as "es" | "en" // ✅ Solo guarda "es" o "en"
    setSelectedLanguage(newLang)
    localStorage.setItem("appLanguage", newLang)
    console.log("Idioma actualizado a:", newLang)
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">
          {selectedLanguage === "es" ? "Idioma" : "Language"}
        </h1>

        <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
          <CardHeader>
            <CardTitle>
              {selectedLanguage === "es" ? "Seleccionar idioma" : "Select language"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedLanguage} onValueChange={handleLanguageChange}>
              {languages.map((language) => (
                <div
                  key={language.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                    language.value === "pt"
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-gray-700"
                  }`}
                  // ✅ Asegúrate de que el evento no cambie el valor si es "pt"
                  onClick={(e) => {
                    if (language.value === "pt") {
                      e.preventDefault() // ❌ Evita que RadioGroup cambie el valor
                    }
                  }}
                >
                  <RadioGroupItem
                    value={language.value}
                    id={language.value}
                    disabled={language.value === "pt"}
                  />
                  <Label
                    htmlFor={language.value}
                    className={`flex items-center gap-3 flex-1 ${
                      language.value === "pt" ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <span className="font-medium">{language.label}</span>
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