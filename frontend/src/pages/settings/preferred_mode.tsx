"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio_group"
import { Label } from "@/components/ui/label"
import { Monitor, Users, Share2 } from "lucide-react"
import SettingsLayout from "../../components/settings_layout"

export default function PreferredMode() {
  const [selectedMode, setSelectedMode] = useState("balanced")

const modes = [
  {
    value: "virtual",
    label: "Virtual",
    description: "Modalidad en línea desde cualquier lugar",
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    value: "presencial",
    label: "Presencial",
    description: "Clases y encuentros cara a cara",
    icon: <Users className="w-5 h-5" />,
  },
  {
    value: "hibrido",
    label: "Híbrido",
    description: "Combina sesiones virtuales y presenciales",
    icon: <Share2 className="w-5 h-5" />,
  },
]

  return (
    <SettingsLayout>
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Modalidad preferida</h1>

      <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
        <CardHeader>
          <CardTitle>Seleccionar modalidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 cursor-pointer" >
          <RadioGroup value={selectedMode} onValueChange={setSelectedMode}>
            {modes.map((mode) => (
              <div
                key={mode.value}
                className="flex items-center space-x-3 p-4 rounded-lg border border-[#2a2a2a] hover:bg-[#1e1e1e]"
              >
                <RadioGroupItem value={mode.value} id={mode.value} />
                <Label htmlFor={mode.value} className="flex items-center gap-3 cursor-pointer flex-1">
                  {mode.icon}
                  <div>
                    <div className="font-medium">{mode.label}</div>
                    <div className="text-sm text-gray-400">{mode.description}</div>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="pt-4">
            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700">Aplicar modalidad</Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </SettingsLayout>
  )
}
