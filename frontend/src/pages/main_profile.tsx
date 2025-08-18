"use client"

import type React from "react"
import { useState } from "react"
import { Search, Menu, X, LogOut, HomeIcon, Settings, Camera, Plus, Eye, Star, MapPin, Edit, User, Bell, MessageSquare } from "lucide-react"
import Image from "next/image"

export default function SwapkDashboard() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true) // true = expandido, false = colapsado

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching:", searchQuery)
  }

  return (
    <div className="relative min-h-screen bg-[#141414] flex">
      {/* Sidebar */}
      <nav
        className={`fixed md:relative h-screen bg-[rgb(30,30,30)] border-[#2E2E2E] backdrop-blur-md border-r flex flex-col transition-all duration-300
          ${isSidebarOpen ? "w-60" : "w-14"}`
        }
      >
        {/* Botón para colapsar/expandir */}
        <div className="flex justify-end p-2 left-0.5">
          <button
            className="flex justify-end text-white hover:text-blue-400 transition-colors left-2.5"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Logo */}
        {isSidebarOpen && (
          <div className="flex items-center mb-6 px-4">
            <Image src="/img/logoswapk.png" alt="Logo Swapk" width={22} height={22} className="w-6 h-6 mr-3" />
            <span className="text-white font-bold text-rm">Swapk</span>
          </div>
        )}

        {/* Perfil / Notificaciones / Mensajes */}
        {isSidebarOpen && (
          <div className="flex gap-4 justify-center mb-8">
            <User className="w-6 h-6 text-white hover:text-blue-400 cursor-pointer transition-colors" />
            <Bell className="w-6 h-6 text-white hover:text-blue-400 cursor-pointer transition-colors" />
            <MessageSquare className="w-6 h-6 text-white hover:text-blue-400 cursor-pointer transition-colors" />
          </div>
        )}


        {/* Buscador (solo visible si está abierto) */}
        {isSidebarOpen && (
          <div className="mb-8 px-4">
            <form onSubmit={handleSearch} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="¿Qué aprenderás hoy?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800/80 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 w-full transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 rounded-lg hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200 flex items-center justify-center gap-2 text-white font-medium shadow-lg hover:shadow-emerald-500/25"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </form>
          </div>
        )}

        {/* Links navegación */}
        <div className="flex flex-col gap-2 mb-8 px-2">
          <button className="flex items-center gap-3 text-white font-medium py-3 px-2 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
            <HomeIcon />
            {isSidebarOpen && "INICIO"}
          </button>
          <button className="flex items-center gap-3 text-white font-medium py-3 px-2 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
            <Search />
            {isSidebarOpen && "EXPLORAR"}
          </button>
          <button className="flex items-center gap-3 text-white font-medium py-3 px-2 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
            <Star />
            {isSidebarOpen && "MIS TRUEQUES"}
          </button>
          <button className="flex items-center gap-3 text-white font-medium py-3 px-2 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
            <Camera />
            {isSidebarOpen && "MIS CURSOS"}
          </button>
          <button className="flex items-center gap-3 text-white font-medium py-3 px-2 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
            <Plus />
            {isSidebarOpen && "COMUNIDAD"}
          </button>
          <button className="flex items-center gap-3 text-white font-medium py-3 px-2 rounded-lg hover:bg-emerald-500/20 hover:text-emerald-400 transition-all duration-200">
            <Settings />
            {isSidebarOpen && "AJUSTES"}
          </button>
        </div>

        {/* Logout */}
        <div className="mt-auto px-2 mb-4">
          <button className="flex items-center justify-center gap-2 text-red-500 hover:text-red-400 transition w-full">
            <LogOut />
            {isSidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="`transition-all duration-300 p-6 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* User Profile Card */}
            <div className="bg-[#1E1E1E] border-[#2E2E2E] rounded-xl p-6 border ">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center overflow-hidden">
                    <Image
                      src="/img/cat_profile.jpg"
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-1 -right-1 bg-emerald-600 p-2 rounded-full hover:bg-emerald-500 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>

                <h2 className="text-white text-xl font-bold mb-1 flex items-center justify-center gap-2">
                  Manuel Eduardo
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </h2>

                <div className="flex items-center justify-center gap-1 text-gray-400 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>Colombia, cali</span>
                </div>

                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-6 py-2.5 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl">
                  <Edit className="w-4 h-4" />
                  Editar perfil
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                <p className="text-gray-300 text-sm leading-relaxed">
                  ¡Bienvenido a tu perfil! Aquí puedes administrar tu información personal, incluyendo tu nombre, correo
                  electrónico y estado de inscripción. Mantente al día con tu proceso de aprendizaje y aprovecha al
                  máximo tu experiencia en Swapk.
                </p>
              </div>
            </div>

            {/* Exchange Information */}
            <div className="bg-[#1E1E1E] border-[#2E2E2E] rounded-xl p-6">
              <h3 className="text-white text-lg font-bold mb-6">Información de Intercambios</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">5</div>
                  <div className="text-gray-400 text-sm">intercambios realizados</div>
                  <div className="text-gray-500 text-xs">cursos completos</div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">2</div>
                  <div className="text-gray-400 text-sm">Intercambios Inscrito</div>
                  <div className="text-gray-500 text-xs">Cursos a realizar</div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white mb-1">7</div>
                  <div className="text-gray-400 text-sm">Persona conocidas</div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                  <div className="text-gray-400 text-sm">Personas de intercambio</div>
                  <div className="text-gray-500 text-xs">instructores</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-10">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-white text-lx font-semibold">Certificados</h4>
                  <div className="flex gap-2">
                    <button className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-1 py-4 rounded-lg hover:from-emerald-500 hover:to-emerald-400 transition-all duration-200 flex items-center gap-1 text-sm font-medium shadow-lg hover:shadow-emerald-500/25">
                      <Plus className="w-4 h-4" />
                      Agregar
                    </button>
                    <button className="bg-gradient-to-r from-gray-700 to-gray-600 text-white px-1 py-4 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-200 flex items-center gap-1 text-sm font-medium shadow-lg">
                      <Eye className="w-4 h-4" />
                      Ver más
                    </button>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-6">
                  <div className="text-center text-gray-400">
                    <p className="text-sm">No tienes certificados aún</p>
                    <p className="text-xs text-gray-500">Subelos a tu perfil para obtener el recononimiento!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-[#1E1E1E] border-[#2E2E2E] rounded-xl p-6 border ">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-bold">Habilidades</h3>
                <button className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors font-medium hover:underline">
                  Ver más
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-purple-500/25 hover:scale-105 transition-all duration-200 cursor-pointer">
                  #Python
                </span>
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all duration-200 cursor-pointer">
                  #Guitarra
                </span>
                <span className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-pink-500/25 hover:scale-105 transition-all duration-200 cursor-pointer">
                  #Fotografía
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200 cursor-pointer">
                  #Inglés B2
                </span>
                <span className="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-green-500/25 hover:scale-105 transition-all duration-200 cursor-pointer">
                  #Marketing
                </span>
                <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-200 cursor-pointer">
                  #Ciberseguridad
                </span>
              </div>

              {/* Exchange History */}
              <div className="border-t border-gray-700 pt-10">
                <h4 className="text-white text-lg font-bold mb-15">Historial de intercambios</h4>

                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">U</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-white font-medium">Usuario</span>
                        <span className="text-gray-400 text-sm">Clases de cocina por lecciones de fotografía</span>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-400 text-sm italic mb-3">
                        "Gran intercambio. Eduardo explicó todo claramente y con paciencia."
                      </p>
                      <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-500 hover:to-blue-400 transition-all duration-200 font-medium shadow-lg hover:shadow-blue-500/25">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
