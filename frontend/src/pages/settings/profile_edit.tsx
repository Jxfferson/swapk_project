"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SettingsLayout from "../../components/settings_layout"

// Interfaces para los datos del usuario y perfil
interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  fecha_creacion: string;
}

interface Perfil {
  id: number;
  id_usuario: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  foto_perfil: string;
  informacion_Id: number;
  historial_Id: number;
  habilidad_Id: number;
  detalle_Intercambio: number;
  detalle_Curso: number;
}

export default function ProfileEdit() {
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Cargar datos del usuario desde API

useEffect(() => {
  const fetchUserData = async () => {
    setIsLoading(true);
    setError("");

    try {
      const savedUserStr = localStorage.getItem("user");

      if (!savedUserStr) {
        setError("No se encontró el token de autenticación. Por favor, inicia sesión.");
        setIsLoading(false);
        return;
      }

      const savedUser = JSON.parse(savedUserStr);
      const token = savedUser.token;
      const userId = savedUser.id;

      if (!token || !userId) {
        setError("No se pudo identificar al usuario");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:8000/perfil/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Error ${response.status}`);
      }

      const data = await response.json();

      setEmail(data.correo || "");
      setFullName(data.nombre_usuario || "");
      setUsername(data.nombre || "");
      setDescription(data.descripcion || "");
      setLocation(data.ubicacion || "");
      setProfileImage(data.foto_perfil || "");

    } catch (err: any) {
      console.error("Error al cargar perfil:", err);
      setError(`No se pudo cargar el perfil: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  fetchUserData();
}, []);

  // Función para redirigir al login
  const redirectToLogin = () => {
    window.location.href = '/auth/login'
  }

  // Función para guardar cambios en el perfil
  const handleSaveChanges = async () => {
    try {
      setIsLoading(true)
      setError("")
      
      const token = localStorage.getItem('token') || 
                   localStorage.getItem('authToken') || 
                   localStorage.getItem('userToken')
      
      const userDataStr = localStorage.getItem('userData') || 
                         localStorage.getItem('currentUser') ||
                         localStorage.getItem('perfil')
      
      let userId = null
      
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr)
          userId = userData.id || userData.id_usuario || userData.perfil?.id_usuario
        } catch (parseError) {
          console.error("Error parsing userData:", parseError)
        }
      }

      if (!token || !userId) {
        setError("No se pudo autenticar la solicitud")
        setIsLoading(false)
        return
      }

      // Preparar datos para enviar
      const updatedProfile = {
        nombre: username,
        descripcion: description,
        ubicacion: location
      }

      // Enviar actualización a la API - intentar diferentes endpoints
      const response = await fetch(`http://localhost:8000/perfil/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfile)
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Perfil actualizado:", result)
      
      // Actualizar localStorage con los nuevos datos
      if (userDataStr) {
        try {
          const userData = JSON.parse(userDataStr)
          const updatedUserData = {
            ...userData,
            nombre: username,
            descripcion: description,
            ubicacion: location,
            perfil: {
              ...userData.perfil,
              nombre: username,
              descripcion: description,
              ubicacion: location
            }
          }
          localStorage.setItem('userData', JSON.stringify(updatedUserData))
        } catch (parseError) {
          console.error("Error updating localStorage:", parseError)
        }
      }
      
      alert("Perfil actualizado exitosamente")

    } catch (error) {
      console.error("Error al guardar cambios:", error)
      setError("Error al guardar los cambios. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <SettingsLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </SettingsLayout>
    )
  }

  if (error) {
    return (
      <SettingsLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 mr-2"
              >
                Reintentar
              </Button>
              <Button 
                onClick={redirectToLogin}
                className="bg-green-600 hover:bg-green-700"
              >
                Ir al Login
              </Button>
            </div>
          </div>
        </div>
      </SettingsLayout>
    )
  }

  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Editar <span className="text-blue-400">perfil</span>
          </h1>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>

        <Card className="bg-[#1a1a1a] border-[#1a1a1a]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profileImage || "/diverse-user-avatars.png"} />
                <AvatarFallback className="bg-blue-600 text-white">
                  {username ? username.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{username || "Usuario"}</h3>
                <p className="text-gray-400">{fullName || "Nombre completo"}</p>
              </div>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent"
              >
                Cambiar foto
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
                <p className="text-gray-400">{email || "No especificado"}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-400">
                &gt;
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div>
                <p className="font-medium">Nombre de usuario</p>
                <p className="text-gray-400">{username || "No especificado"}</p>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-400">
                &gt;
              </Button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div>
                <p className="font-medium">Ubicación</p>
                <p className="text-gray-400">{location || "No especificada"}</p>
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

        {error && (
          <div className="p-4 bg-red-900/20 border border-red-700 rounded-md">
            <p className="text-red-400">{error}</p>
          </div>
        )}
      </div>
    </SettingsLayout>
  )
}
