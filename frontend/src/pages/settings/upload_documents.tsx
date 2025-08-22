"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UploadDocuments() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "",
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white p-6 flex justify-center items-center">
      <Card className="w-full max-w-lg bg-[#1a1a1a] border-[#1a1a1a] border shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Subir Documentos
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Nombre:
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Ejemplo: Certificado de Bachiller"
                value={formData.name}
                onChange={handleChange("name")}
                className="mt-1 bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>

            {/* Tipo */}
            <div>
              <Label htmlFor="type" className="text-gray-300">
                Tipo:
              </Label>
              <Select value={formData.type} onValueChange={handleSelectChange("type")}>
                <SelectTrigger className="mt-1 bg-[#2A2A2A] border-gray-600 text-white">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] text-white border border-gray-600">
                  <SelectItem value="Certificado">Certificado</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Título">Título</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Estado */}
            <div>
              <Label htmlFor="status" className="text-gray-300">
                Estado:
              </Label>
              <Select value={formData.status} onValueChange={handleSelectChange("status")}>
                <SelectTrigger className="mt-1 bg-[#2A2A2A] border-gray-600 text-white">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent className="bg-[#2A2A2A] text-white border border-gray-600">
                  <SelectItem value="En curso">En curso</SelectItem>
                  <SelectItem value="Completado">Completado</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Botón */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Subir Documento
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
