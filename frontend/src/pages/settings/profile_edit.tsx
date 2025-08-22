"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SettingsLayout from "../../components/settings_layout"

export default function ProfileEdit() {
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("eduardo@example.com")
  const [phone, setPhone] = useState("3008889999")
  const [location, setLocation] = useState("Bogotá, Colombia")

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Editar <span className="text-blue-400">perfil</span>
        </h1>
        <Button className="bg-green-600 hover:bg-green-700">Guardar Cambios</Button>
      </div>

      <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback className="bg-blue-600 text-white">ME</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">manuel.eduardo2007</h3>
              <p className="text-gray-400">Manuel Eduardo Rangel Correa</p>
            </div>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent"
            >
              Cambiar nombre
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe una descripción sobre ti..."
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                maxLength={255}
              />
              <p className="text-right text-sm text-gray-400 mt-1">{description.length}/255</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Datos personales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <div>
              <p className="font-medium">Correo electrónico</p>
              <p className="text-gray-400">{email}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-400">
              &gt;
            </Button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <div>
              <p className="font-medium">Número de teléfono</p>
              <p className="text-gray-400">{phone}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-400">
              &gt;
            </Button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <div>
              <p className="font-medium">Ubicación</p>
              <p className="text-gray-400">{location}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-400">
              &gt;
            </Button>
          </div>

          <Button variant="link" className="text-blue-400 p-0">
            Ver más...
          </Button>
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}
