"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import SettingsLayout from "../../components/settings_layout"

export default function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("")
  const [password, setPassword] = useState("")

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Eliminar cuenta</h1>

      <Card className="bg-red-900/20 border-red-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Zona de peligro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-900/30 p-4 rounded-lg border border-red-700">
            <h3 className="font-semibold text-red-300 mb-2">¡Advertencia!</h3>
            <p className="text-sm text-red-200">
              Esta acción no se puede deshacer. Se eliminarán permanentemente todos tus datos, incluyendo tu perfil,
              configuraciones y cualquier contenido asociado.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Escribe "ELIMINAR" para confirmar</label>
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="ELIMINAR"
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Confirma tu contraseña</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <Button
            variant="destructive"
            disabled={confirmText !== "ELIMINAR" || !password}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            Eliminar cuenta permanentemente
          </Button>
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}
