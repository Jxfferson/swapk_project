"use client"

import { ChevronLeft, Settings, User, Shield, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "../../components/state/theme_context"
import SettingsLayout from "../../components/settings_layout"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const { theme } = useTheme()

  const menuItems = [
    {
      category: "Configuración de mi cuenta",
      icon: <User className="w-4 h-4" />,
      items: [
        { id: "change-email", label: "Cambiar correo electrónico" },
        { id: "change-password", label: "Cambiar contraseña" },
        { id: "delete-account", label: "Eliminar cuenta" },
        { id: "notifications", label: "Notificaciones" },
      ],
    },
    {
      category: "Preferencias de la plataforma",
      icon: <Settings className="w-4 h-4" />,
      items: [
        { id: "language", label: "Idioma" },
        { id: "theme", label: "Tema: Claro / Oscuro" },
        { id: "preferred-mode", label: "Modalidad preferida" },
        { id: "activity-privacy", label: "Privacidad de actividad" },
      ],
    },
    {
      category: "Privacidad y seguridad",
      icon: <Shield className="w-4 h-4" />,
      items: [
        { id: "profile-visibility", label: "Quién puede ver tu perfil" },
        { id: "certifications", label: "Certificaciones y validaciones" },
        { id: "upload-documents", label: "Subir o actualizar soportes" },
        { id: "verification-status", label: "Ver estado de verificación de habilidades" },
      ],
    },
    {
      category: "Opciones adicionales",
      icon: <HelpCircle className="w-4 h-4" />,
      items: [{ id: "help-center", label: "Centro de ayuda / Soporte" }],
    },
  ]

  const bgColor = theme === "dark" ? "bg-[#121212]" : "bg-gray-50"
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-200"
  const textColor = theme === "dark" ? "text-white" : "text-black"

  return (
    <div className={`w-80 ${bgColor} border-r ${borderColor} p-4`}>
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="sm"
          className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h1 className={`text-lg font-semibold ${textColor}`}>Ajustes</h1>
      </div>

      <div className="space-y-6">
        {menuItems.map((category) => (
          <div key={category.category}>
            <div className="flex items-center gap-2 mb-3">
              {category.icon}
              <h2 className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                {category.category}
              </h2>
            </div>
            <div className="space-y-1 ml-6">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-700 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
