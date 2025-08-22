"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import SettingsLayout from "../../components/settings_layout"

export default function VerificationStatus() {
  const skills = [
    {
      id: 1,
      name: "React Development",
      level: "Avanzado",
      status: "verified",
      verifiedDate: "2023-08-15",
      score: 95,
    },
    {
      id: 2,
      name: "JavaScript",
      level: "Experto",
      status: "verified",
      verifiedDate: "2023-07-20",
      score: 98,
    },
    {
      id: 3,
      name: "Node.js",
      level: "Intermedio",
      status: "pending",
      verifiedDate: null,
      score: null,
    },
    {
      id: 4,
      name: "TypeScript",
      level: "Avanzado",
      status: "failed",
      verifiedDate: "2023-06-10",
      score: 65,
    },
    {
      id: 5,
      name: "AWS Cloud",
      level: "Básico",
      status: "in-progress",
      verifiedDate: null,
      score: null,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "in-progress":
        return <RefreshCw className="w-5 h-5 text-blue-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return "Verificado"
      case "pending":
        return "Pendiente"
      case "failed":
        return "Falló"
      case "in-progress":
        return "En progreso"
      default:
        return "Desconocido"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-600"
      case "pending":
        return "bg-yellow-600"
      case "failed":
        return "bg-red-600"
      case "in-progress":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ver estado de verificación de habilidades</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">2</div>
            <div className="text-sm text-gray-400">Verificadas</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">1</div>
            <div className="text-sm text-gray-400">Pendientes</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">1</div>
            <div className="text-sm text-gray-400">En progreso</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
        <CardHeader>
          <CardTitle>Estado de habilidades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="p-4 rounded-lg border border-gray-600 hover:bg-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {getStatusIcon(skill.status)}
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-sm text-gray-400">Nivel: {skill.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {skill.score && <span className="text-sm font-medium">{skill.score}%</span>}
                  <Badge className={getStatusColor(skill.status)}>{getStatusText(skill.status)}</Badge>
                </div>
              </div>

              {skill.verifiedDate && (
                <p className="text-xs text-gray-500">
                  {skill.status === "verified" ? "Verificado" : "Último intento"}:{" "}
                  {new Date(skill.verifiedDate).toLocaleDateString("es-ES")}
                </p>
              )}

              {skill.status === "failed" && (
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent"
                  >
                    Reintentar verificación
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}
