"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast, { Toaster } from 'react-hot-toast'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import {
  Search,
  MessageSquare,
  Bell,
  User,
  Home,
  TrendingUp,
  RefreshCw,
  BookOpen,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  Share,
  Bookmark,
  Flag,
  Sun,
  Moon,
  Menu,
  X,
  PlusIcon,
  Image as ImageIcon
} from "lucide-react"

export default function ForumLayout() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("Intercambios")
  const [isDark, setIsDark] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [perfil, setPerfil] = useState<any>(null)

  

  // Estados para publicaciones y comentarios
  const [publicaciones, setPublicaciones] = useState<any[]>([])
  const [likes, setLikes] = useState<Record<number, number>>({})
  const [userLikes, setUserLikes] = useState<Record<number, boolean>>({})
  const [comentarios, setComentarios] = useState<Record<number, any[]>>({})
  const [comentariosAbiertos, setComentariosAbiertos] = useState<number | null>(null)
  const [nuevoComentario, setNuevoComentario] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    titulo: "",
    contenido: "",
    tipo: "Intercambio",
    imagen: ""
  })

  // Cargar usuario desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      setUser(parsed.usuario || { id: parsed.id, nombre: parsed.nombre })
      setPerfil(parsed.perfil)
    }
  }, [])

  // Cargar publicaciones al cambiar de pestaña
  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const tipo = activeTab === "Todo" ? "all" : activeTab
        const res = await fetch(`http://localhost:8000/api/publicaciones/${tipo}`)
        const data = await res.json()
        const posts = Array.isArray(data) ? data : []

        setPublicaciones(posts)

        // Inicializar likes
        const likesMap: Record<number, number> = {}
        const userLikesMap: Record<number, boolean> = {}
        posts.forEach((post: any) => {
          likesMap[post.id] = post.likes?.length || 0
          userLikesMap[post.id] = post.likes?.some((like: any) => like.id_usuario === user?.id) || false
        })
        setLikes(likesMap)
        setUserLikes(userLikesMap)
      } catch (error) {
        console.error("Error al cargar publicaciones:", error)
        toast.error("No se pudieron cargar las publicaciones.")
      }
    }

    fetchPublicaciones()
  }, [activeTab])

  const toggleTheme = () => setIsDark(!isDark)

  // Manejar like
  const handleLike = async (postId: number) => {
    if (!user) {
      toast.error("Debes iniciar sesión para dar like")
      return
    }

    try {
      const token = JSON.parse(localStorage.getItem("user")!).token
      const res = await fetch(`http://localhost:8000/api/publicaciones/${postId}/like`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
      const data = await res.json()
      setLikes((prev) => ({ ...prev, [postId]: data.total_likes }))
      setUserLikes((prev) => ({ ...prev, [postId]: data.liked }))
    } catch (error) {
      toast.error("No se pudo procesar el like")
    }
  }

  // Manejar comentarios
  const toggleComentarios = async (postId: number) => {
    if (comentariosAbiertos === postId) {
      setComentariosAbiertos(null)
    } else {
      setComentariosAbiertos(postId)
      try {
        const res = await fetch(`http://localhost:8000/api/publicaciones/${postId}/comentarios`)
        const data = await res.json()
        setComentarios((prev) => ({
          ...prev,
          [postId]: Array.isArray(data) ? data : []
        }))
      } catch (error) {
        console.error("Error al cargar comentarios:", error)
        setComentarios((prev) => ({ ...prev, [postId]: [] }))
      }
    }
  }

  // Comentar
  const handleComentar = async (postId: number) => {
    if (!nuevoComentario.trim()) return

    try {
      const token = JSON.parse(localStorage.getItem("user")!).token
      const res = await fetch(`http://localhost:8000/api/publicaciones/comentarios`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          contenido: nuevoComentario,
          id_publicacion: postId,
        }),
      })

      if (res.ok) {
        // ✅ Recargar comentarios del backend para mantener sincronización
        const updatedRes = await fetch(`http://localhost:8000/api/publicaciones/${postId}/comentarios`)
        const updatedComments = await updatedRes.json()
        setComentarios((prev) => ({
          ...prev,
          [postId]: Array.isArray(updatedComments) ? updatedComments : []
        }))
        setNuevoComentario("")
        toast.success("Comentario publicado")
      } else {
        const error = await res.json()
        toast.error(error.detail || "Error al comentar")
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor")
    }
  }

  // Crear nueva publicación
  const handleCreatePost = async () => {
    if (!newPost.titulo.trim() || !newPost.contenido.trim()) {
      toast.error("Completa título y contenido")
      return
    }

    const savedUser = localStorage.getItem("user")
    if (!savedUser) {
      toast.error("No tienes una sesión activa")
      return
    }

    const parsedUser = JSON.parse(savedUser)
    const token = parsedUser.token
    const usuario = { id: parsedUser.id, nombre: parsedUser.nombre }
    const perfil = parsedUser.perfil

    try {
      const res = await fetch("http://localhost:8000/api/publicaciones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newPost,
          id_usuario: usuario.id,
          id_perfil: perfil?.id || null
        }),
      })

      if (res.ok) {
        toast.success("Publicación creada")
        setIsModalOpen(false)
        setNewPost({ titulo: "", contenido: "", tipo: "Intercambio", imagen: "" })

        // Recargar publicaciones
        const updated = await fetch(`http://localhost:8000/api/publicaciones/${activeTab}`)
        const data = await updated.json()
        setPublicaciones(Array.isArray(data) ? data : [])
      } else {
        const error = await res.json()
        toast.error(error.detail || "Error al crear publicación")
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor")
    }
  }

    const formatFecha = (fechaStr: string) => {
      const fecha = new Date(fechaStr)
      const ahora = new Date()
      const diffMs = ahora.getTime() - fecha.getTime()
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMin = Math.floor(diffMs / (1000 * 60))

      if (diffMin < 1) return "ahora"
      if (diffMin < 60) return `hace ${diffMin} min`
      if (diffHrs < 24) return `hace ${diffHrs} hrs`
      return fecha.toLocaleDateString()
    }



  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-gray-50 text-gray-900"}`}>
      <Toaster position="top-right" />

      {/* Botón Hamburguesa */}
      <div className="absolute top-4 left-4 md:hidden z-50">
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600 dark:text-gray-300">
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Sidebar Izquierdo */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex flex-col border-r ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}>
        <div className={`p-3 border-b ${isDark ? "border-[#2E2E2E]" : "border-gray-200"}`}>
          <div className="flex items-center gap-2 mb-3">
            <img src="/img/logoswapk.png" alt="Swapk Logo" className="w-7 h-auto" />
            <span className={`text-sm ${isDark ? "text-[#F5F5F5]" : "text-gray-700"}`}>SWAPK</span>
            <Button variant="ghost" size="sm" onClick={toggleTheme} className={`ml-auto h-6 w-6 p-0 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E]" : "text-gray-600 hover:text-gray-900"}`}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          <div className="relative mb-3">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-[#A0A0A0]" : "text-gray-500"}`} />
            <Input placeholder="Buscar en Swapk" className={`pl-10 w-full h-8 border-none shadow-none focus-visible:ring-0 cursor-pointer ${isDark ? "bg-[#1E1E1E] text-[#F5F5F5] placeholder-[#A0A0A0]" : "bg-gray-100 text-gray-900 placeholder-gray-500"}`} />
          </div>

          <div className="flex gap-1 mb-3">
            {[MessageSquare, Bell, User].map((Icon, idx) => (
              <Button key={idx} variant="ghost" size="sm" className={`flex-1 h-8 cursor-pointer ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E]" : "text-gray-600 hover:text-gray-900"}`}>
                <Icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <nav className="space-y-1">
            {[
              { icon: Home, label: "Inicio", active: true },
              { icon: TrendingUp, label: "Popular", active: false },
              { icon: RefreshCw, label: "Intercambios", active: false },
              { icon: BookOpen, label: "Mis Cursos", active: false },
            ].map((item, idx) => (
              <Button key={idx} variant="ghost" size="sm" className={`w-full justify-start h-8 cursor-pointer transition-colors ${item.active ? "bg-blue-600 text-white hover:bg-blue-700" : isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E]" : "text-gray-700 hover:bg-gray-100"}`}>
                <item.icon className="w-4 h-4 mr-2" /> {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* Botón Cerrar Sesión */}
        <div className={`mt-auto p-3 border-t ${isDark ? "border-[#2E2E2E]" : "border-gray-200"}`}>
          <Button
            variant="ghost"
            className={`w-full justify-start ${isDark ? "text-red-400 hover:bg-red-900 hover:text-white" : "text-red-600 hover:bg-red-100 hover:text-red-800"} transition-colors duration-200 cursor-pointer`}
            onClick={() => {
              localStorage.removeItem("user")
              setUser(null)
              setPerfil(null)
              toast.success("Sesión cerrada correctamente")
              setTimeout(() => router.push("/auth/login"), 1000)
            }}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Tabs */}
        <div className="flex gap-5 mb-6">
          {["Todo", "Intercambios", "Cursos", "Preguntas", "Logros"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              className={`transition-colors ${activeTab === tab ? "bg-blue-600 text-white" : isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
          {/* Botón Nueva Publicación */}
          <div className="flex justify-end mb-2">
            <Button
              variant="default"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusIcon className="w-5 h-5" /> Nueva Publicación
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 text-gray-500 hover:text-gray-700"
              onClick={async () => {
                const tipo = activeTab === "Todo" ? "all" : activeTab
                try {
                  const res = await fetch(`http://localhost:8000/api/publicaciones/${tipo}`)
                  const data = await res.json()
                  setPublicaciones(Array.isArray(data) ? data : [])
                  toast.success("Publicaciones actualizadas")
                } catch (error) {
                  toast.error("Error al recargar")
                }
              }}
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>


        {/* Publicaciones */}
        <div className="space-y-6">
          {publicaciones.length > 0 ? (
            publicaciones.map((post) => (
              <Card key={post.id} className={`transition-colors ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Likes */}
                    <div className="flex flex-col items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleLike(post.id)} className={`transition-colors ${userLikes[post.id] ? "text-blue-500" : isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                        <ChevronUp className="w-5 h-5" />
                      </Button>
                      <span className={`text-lg font-semibold ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>{likes[post.id] ?? 0}</span>
                      <Button variant="ghost" size="icon" className={`transition-colors ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                        <ChevronDown className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-6 h-6 rounded-full ${post.tipo === "Intercambio" ? "bg-green-600" : post.tipo === "Curso" ? "bg-blue-600" : post.tipo === "Pregunta" ? "bg-yellow-600" : "bg-purple-600"}`}></div>
                        <span className={`text-sm ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>r/{post.tipo.toLowerCase()}</span>
                        <span className={`text-sm ${isDark ? "text-[#707070]" : "text-gray-500"}`}>• {post.usuario.nombre} • hace {Math.floor(Math.random() * 24)} horas</span>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      <h2 className={`text-xl font-semibold mb-3 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>{post.titulo}</h2>
                      <p className={`mb-4 ${isDark ? "text-[#D0D0D0]" : "text-gray-700"}`}>{post.contenido}</p>

                      {/* Imagen opcional */}
                      {post.imagen && (
                        <img src={post.imagen} alt="Publicación" className="w-full h-auto rounded-lg mb-4" />
                      )}

                      <div className={`flex gap-2 mb-4 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                        <Badge className="bg-blue-600 text-white">#{post.tipo.toLowerCase()}</Badge>
                      </div>

                      <div className={`flex items-center gap-4 text-sm ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                        <Button variant="ghost" size="sm" onClick={() => toggleComentarios(post.id)} className="transition-colors">
                          <MessageSquare className="w-4 h-4 mr-1" /> {comentarios[post.id]?.length || 0} comentarios
                        </Button>
                        <Button variant="ghost" size="sm" className="transition-colors">
                          <Share className="w-4 h-4 mr-1" /> Compartir
                        </Button>
                        <Button variant="ghost" size="sm" className="transition-colors">
                          <Bookmark className="w-4 h-4 mr-1" /> Guardar
                        </Button>
                        <Button variant="ghost" size="sm" className="transition-colors">
                          <Flag className="w-4 h-4 mr-1" /> Denunciar
                        </Button>
                      </div>

                      {/* Comentarios */}
                      {comentariosAbiertos === post.id && (
                        <div className="mt-4 pt-4 border-t space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Escribe un comentario..."
                              value={nuevoComentario}
                              onChange={(e) => setNuevoComentario(e.target.value)}
                              className={isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-white text-gray-900"}
                            />
                            <Button onClick={() => handleComentar(post.id)} className="bg-blue-600 hover:bg-blue-700 text-white">
                              Enviar
                            </Button>
                          </div>
                          {(comentarios[post.id] || []).map((com) => (
                            <div key={com.id} className="ml-4 border-l pl-4">
                              <div className="flex items-center gap-2">
                                <img src={com.foto_perfil} alt="" className="w-6 h-6 rounded-full" />
                                <span className="font-medium text-sm">{com.nombre_usuario}</span>
                                <span className="text-xs text-gray-500">{new Date(com.fecha).toLocaleDateString()}</span>
                              </div>
                              <p className={`text-sm mt-1 ${isDark ? "text-[#D0D0D0]" : "text-gray-700"}`}>{com.contenido}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className={`text-center py-10 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              No hay publicaciones disponibles.
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className={`w-82 p-4 border-l ${isDark ? "border-[#2E2E2E]" : "border-gray-200"}`}>
        <Card className={`mb-4 ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}>
          <CardContent className="p-3">
            <h3 className={`text-base font-semibold mb-3 flex items-center gap-2 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
              <TrendingUp className="w-4 h-4" /> Cursos Populares
            </h3>
            <div className="space-y-7">
              {[
                { name: "r/IntercambioIdiomas", members: "45.2k miembros", color: "bg-green-600" },
                { name: "r/ProgramaciónPython", members: "38.1k miembros", color: "bg-blue-600" },
                { name: "r/DiseñoGráfico", members: "29.5k miembros", color: "bg-yellow-600" },
                { name: "r/CursosGratuitos", members: "52.3k miembros", color: "bg-purple-600" },
                { name: "r/MarketingDigital", members: "31.7k miembros", color: "bg-red-600" },
                { name: "r/FotografíaBásica", members: "24.9k miembros", color: "bg-indigo-600" },
              ].map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${c.color} rounded-full`}></div>
                    <div>
                      <div className={`text-sm font-medium ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>{c.name}</div>
                      <div className={`text-xs ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>{c.members}</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1">
                    Unirse
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={`${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}>
          <CardContent className="p-3">
            <h3 className={`text-base font-semibold mb-3 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
              Tus Estadísticas
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className={`p-2 rounded-lg text-center ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
                <div className="text-xl font-bold text-blue-400">12</div>
                <div className={`text-xs uppercase ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>Intercambios</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
                <div className="text-xl font-bold text-green-400">23</div>
                <div className={`text-xs uppercase ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>Cursos</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
                <div className="text-xl font-bold text-yellow-400">4.8</div>
                <div className={`text-xs uppercase ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>Rating</div>
              </div>
              <div className={`p-2 rounded-lg text-center ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
                <div className="text-xl font-bold text-purple-400">23</div>
                <div className={`text-xs uppercase ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>Conexiones</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Modal Nueva Publicación */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden ${isDark ? "bg-[#1E1E1E]" : "bg-white"}`}>
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className={`text-xl font-semibold ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>Crear Nueva Publicación</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <select
                value={newPost.tipo}
                onChange={(e) => setNewPost({ ...newPost, tipo: e.target.value })}
                className={`w-full p-2 rounded-lg border ${isDark ? "bg-[#141414] border-[#2E2E2E] text-[#F5F5F5]" : "bg-white border-gray-300 text-gray-900"}`}
              >
                <option value="Intercambio">Intercambio</option>
                <option value="Curso">Curso</option>
                <option value="Pregunta">Pregunta</option>
                <option value="Logro">Logro</option>
              </select>
              <input
                type="text"
                placeholder="Título de tu publicación..."
                value={newPost.titulo}
                onChange={(e) => setNewPost({ ...newPost, titulo: e.target.value })}
                className={`w-full p-2 rounded-lg border ${isDark ? "bg-[#141414] border-[#2E2E2E] text-[#F5F5F5]" : "bg-white border-gray-300 text-gray-900"}`}
              />
              <textarea
                rows={6}
                placeholder="Escribe aquí tu mensaje..."
                value={newPost.contenido}
                onChange={(e) => setNewPost({ ...newPost, contenido: e.target.value })}
                className={`w-full p-2 rounded-lg border ${isDark ? "bg-[#141414] border-[#2E2E2E] text-[#F5F5F5]" : "bg-white border-gray-300 text-gray-900"}`}
              />
              <input
                type="text"
                placeholder="URL de la imagen (opcional)"
                value={newPost.imagen}
                onChange={(e) => setNewPost({ ...newPost, imagen: e.target.value })}
                className={`w-full p-2 rounded-lg border ${isDark ? "bg-[#141414] border-[#2E2E2E] text-[#F5F5F5]" : "bg-white border-gray-300 text-gray-900"}`}
              />
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleCreatePost}>Publicar</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}