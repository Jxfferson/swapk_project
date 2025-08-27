"use client"
import { createContext, useContext, useEffect, useState } from "react"

const LanguageContext = createContext<{
  lang: string
  setLang: (lang: string) => void
}>({
  lang: "es",
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("es")

  useEffect(() => {
    const saved = localStorage.getItem("appLanguage")
    if (saved && ["es", "en"].includes(saved)) {
      setLang(saved)
    } else {
      setLang(navigator.language.startsWith("es") ? "es" : "en")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("appLanguage", lang)
    // Puedes emitir un evento si usas i18n basado en eventos
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)