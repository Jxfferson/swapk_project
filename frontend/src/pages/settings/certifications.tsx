"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Plus, ExternalLink } from "lucide-react"
import SettingsLayout from "../../components/settings_layout"

export default function Certifications() {
  const [certifications] = useState([
    {
      id: 1,
      name: "Certificación React Developer",
      issuer: "Meta",
      date: "2023-08-15",
      status: "verified",
      credentialId: "META-REACT-2023-001",
    },
    {
      id: 2,
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023-06-20",
      status: "verified",
      credentialId: "AWS-CP-2023-456",
    },
    {
      id: 3,
      name: "JavaScript Advanced",
      issuer: "FreeCodeCamp",
      date: "2023-03-10",
      status: "pending",
      credentialId: "FCC-JS-2023-789",
    },
  ])

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Certificaciones y validaciones</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Agregar certificación
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Mis certificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="p-4 rounded-lg border border-gray-600 hover:bg-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{cert.name}</h3>
                  <p className="text-gray-400 mb-2">Emitido por {cert.issuer}</p>
                  <p className="text-sm text-gray-500">Fecha: {new Date(cert.date).toLocaleDateString("es-ES")}</p>
                  <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={cert.status === "verified" ? "default" : "secondary"}
                    className={cert.status === "verified" ? "bg-green-600" : "bg-yellow-600"}
                  >
                    {cert.status === "verified" ? "Verificado" : "Pendiente"}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {certifications.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No tienes certificaciones agregadas</p>
              <p className="text-sm">Agrega tus certificaciones para validar tus habilidades</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}
