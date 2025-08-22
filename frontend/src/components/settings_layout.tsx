"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/router"
import {
  ArrowLeft,
  User,
  Shield,
  HelpCircle,
  Globe,
  Palette,
  Monitor,
  Eye,
  Award,
  Upload,
  CheckCircle,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SettingsLayoutProps {
  children: React.ReactNode
  title?: string // Made title optional
}

export default function SettingsLayout({ children, title }: SettingsLayoutProps) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(router.pathname.split("/").pop() || "profile_edit")

  const menuItems = [
    {
      category: "Configuración de mi cuenta",
      items: [
        { id: "change_email", label: "Cambiar correo electrónico", icon: User },
        { id: "change_password", label: "Cambiar contraseña", icon: Shield },
        { id: "delete_account", label: "Eliminar cuenta", icon: User },
        { id: "notifications", label: "Notificaciones", icon: Bell },
      ],
    },
    {
      category: "Preferencias de la plataforma",
      items: [
        { id: "language", label: "Idioma", icon: Globe },
        { id: "theme", label: "Tema: Claro / Oscuro", icon: Palette },
        { id: "preferred_mode", label: "Modalidad preferida", icon: Monitor },
        { id: "activity_privacy", label: "Privacidad de actividad", icon: Eye },
      ],
    },
    {
      category: "Privacidad y seguridad",
      items: [
        { id: "profile_visibility", label: "Quién puede ver tu perfil", icon: Eye },
        { id: "certifications", label: "Certificaciones y validaciones", icon: Award },
        { id: "upload_documents", label: "Subir o actualizar soportes", icon: Upload },
        { id: "verification_status", label: "Ver estado de verificación de habilidades", icon: CheckCircle },
      ],
    },
    {
      category: "Opciones adicionales",
      items: [{ id: "help_center", label: "Centro de ayuda / Soporte", icon: HelpCircle }],
    },
  ]

  const handleNavigation = (itemId: string) => {
    setActiveSection(itemId)
    router.push(`/settings/${itemId}`)
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-[#121212] border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-semibold">Ajustes</h1>
            </div>

            <nav className="space-y-6">
              {menuItems.map((section) => (
                <div key={section.category}>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">{section.category}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon
                      const isActive = activeSection === item.id
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => handleNavigation(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm">{item.label}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              {title && <h2 className="text-2xl font-bold">{title}</h2>}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
