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
  })

  // Cargar usuario desde localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const parsed = JSON.parse(savedUser)
      setUser(parsed.usuario)
      setPerfil(parsed.perfil)

      // Mostrar toast de bienvenida
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-gray-900 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-gray-700 transition-all duration-500 border-l-4 border-blue-600`}
        >
          <div className="flex-1 w-0 p-5">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5 text-2xl text-blue-400">👋</div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  ¡Bienvenido de nuevo, {parsed?.usuario?.nombre || "Usuario"}!
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Nos encanta verte por aquí. Hoy es un nuevo día lleno de oportunidades para crear algo increíble. ¡Tú puedes con todo!
                </p>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      ), {
        duration: 6000,
        position: 'top-right',
      })
    }
  }, [])

  // Cargar publicaciones al cambiar de pestaña
  useEffect(() => {
    if (!user) return

    const fetchPublicaciones = async () => {
      try {
        const tipo = activeTab === "Todo" ? "all" : activeTab
        const res = await fetch(`http://localhost:8000/api/publicaciones/${tipo}`)
        const data = await res.json()
        setPublicaciones(Array.isArray(data) ? data : [])

        // Inicializar likes
        const likesMap: Record<number, number> = {}
        const userLikesMap: Record<number, boolean> = {}
        data.forEach((post: any) => {
          likesMap[post.id] = post.likes?.length || 0
          userLikesMap[post.id] = post.likes?.some((like: any) => like.id_usuario === user.id) || false
        })
        setLikes(likesMap)
        setUserLikes(userLikesMap)
      } catch (error) {
        console.error("Error al cargar publicaciones:", error)
        toast.error("No se pudieron cargar las publicaciones.")
      }
    }

    fetchPublicaciones()
  }, [activeTab, user])

  const toggleTheme = () => setIsDark(!isDark)

  // Manejar like
  const handleLike = async (postId: number) => {
    if (!user) {
      toast.error("Debes iniciar sesión para dar like")
      return
    }

    try {
      const res = await fetch(`http://localhost:8000/api/publicaciones/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      if (!comentarios[postId]) {
        try {
          const res = await fetch(`http://localhost:8000/api/publicaciones/${postId}/comentarios`)
          const data = await res.json()
          setComentarios((prev) => ({ ...prev, [postId]: data }))
        } catch (error) {
          console.error("Error al cargar comentarios:", error)
        }
      }
    }
  }

  const handleComentar = async (postId: number) => {
    if (!nuevoComentario.trim()) return

    try {
      const res = await fetch("http://localhost:8000/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contenido: nuevoComentario,
          id_publicacion: postId,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setComentarios((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), data],
        }))
        setNuevoComentario("")
        toast.success("Comentario publicado")
      }
    } catch (error) {
      toast.error("Error al comentar")
    }
  }

const handleCreatePost = async () => {
  if (!newPost.titulo.trim() || !newPost.contenido.trim()) {
    toast.error("Compleeta título y contenido")
    return
  }

  // Obtén el token del localStorage
  const savedUser = localStorage.getItem("user")
  if (!savedUser) {
    toast.error("No tienes una sesión activa")
    return
  }

  const parsedUser = JSON.parse(savedUser)
  const token = parseUser.token
  const usuario = parseUser.usuario
  const perfil = parseUser.perfil

  // Validar que el usuario exista y tenga id
  if (!usuario || typeof usuario !== "object" || !usuario.id) {
    toast.error("Usuario no válido")
    return
  }

  if (!token) {
    toast.error("Debes iniciar sesión para crear una publicación")
    return
  }

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
      setNewPost({ titulo: "", contenido: "", tipo: "Intercambio" })

      // Recargar publicaciones
      const updated = await fetch(`http://localhost:8000/api/publicaciones/${activeTab}`)
      const data = await updated.json()
      setPublicaciones(Array.isArray(data) ? data : [])
    } else {
      const error = await res.json()
      toast.error(error.detail || "Error al crear publicación")
    }
  } catch (error) {
    console.error("Error al crear publicación:", error)
    toast.error("Error de conexión con el servidor")
  }
}
  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: { background: '#363636', color: '#fff' },
          success: { iconTheme: { primary: '#4CAF50', secondary: 'white' } },
          error: { iconTheme: { primary: '#EF5350', secondary: 'white' } },
        }}
      />

      {/* Botón Hamburguesa */}
      <div className="absolute top-4 left-4 md:hidden z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 dark:text-gray-300"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Sidebar Izquierdo */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
          flex-col border-r 
          ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}
        `}
      >
        <div className={`p-3 border-b ${isDark ? "border-[#2E2E2E]" : "border-gray-200"}`}>
          <div className="flex items-center gap-2 mb-3">
            <img src="/img/logoswapk.png" alt="Swapk Logo" className="w-7 h-auto" />
            <span className={`text-sm ${isDark ? "text-[#F5F5F5]" : "text-gray-700"}`}>SWAPK</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`ml-auto h-6 w-6 p-0 ${
                isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          <div className="relative mb-3">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? "text-[#A0A0A0]" : "text-gray-500"}`} />
            <Input
              placeholder="Buscar en Swapk"
              className={`pl-10 w-full h-8 border-none shadow-none focus-visible:ring-0 ${
                isDark ? "bg-[#1E1E1E] text-[#F5F5F5] placeholder-[#A0A0A0]" : "bg-gray-100 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>

          <div className="flex gap-1 mb-3">
            {[MessageSquare, Bell, User].map((Icon, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className={`flex-1 h-8 ${
                  isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E]" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          <nav className="space-y-3">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700 h-8"
            >
              <Home className="w-4 h-4 mr-2" /> Inicio
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start h-8 ${isDark ? "text-[#F5F5F5] hover:bg-[#2E2E2E]" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <TrendingUp className="w-4 h-4 mr-2" /> Popular
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start h-8 ${isDark ? "text-[#F5F5F5] hover:bg-[#2E2E2E]" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Intercambios
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`w-full justify-start h-8 ${isDark ? "text-[#F5F5F5] hover:bg-[#2E2E2E]" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <BookOpen className="w-4 h-4 mr-2" /> Mis Cursos
            </Button>
          </nav>
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
              className={`transition-colors ${
                activeTab === tab ? "bg-blue-600 text-white" : isDark ? "text-[#A0A0A0]" : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Botón Nueva Publicación */}
        <div className="flex justify-end mb-4">
          <Button
            variant="default"
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <PlusIcon className="w-5 h-5" /> Nueva Publicación
          </Button>
        </div>

        {/* Publicaciones */}
        <div className="space-y-6">
          {publicaciones.length > 0 ? (
            publicaciones.map((post) => (
              <Card
                key={post.id}
                className={`transition-colors ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Likes */}
                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleLike(post.id)}
                        className={`transition-colors ${
                          userLikes[post.id] ? "text-blue-500" : isDark ? "text-[#A0A0A0]" : "text-gray-600"
                        }`}
                      >
                        <ChevronUp className="w-5 h-5" />
                      </Button>
                      <span className={`text-lg font-semibold ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
                        {likes[post.id] ?? 0}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`transition-colors ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Contenido */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-6 h-6 rounded-full ${
                            post.tipo === "Intercambio" ? "bg-green-600" :
                            post.tipo === "Curso" ? "bg-blue-600" :
                            post.tipo === "Pregunta" ? "bg-yellow-600" : "bg-purple-600"
                          }`}
                        ></div>
                        <span className={`text-sm ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                          r/{post.tipo.toLowerCase()}
                        </span>
                        <span className={`text-sm ${isDark ? "text-[#707070]" : "text-gray-500"}`}>
                          • hace {Math.floor(Math.random() * 24)} horas
                        </span>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      <h2 className={`text-xl font-semibold mb-3 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
                        {post.titulo}
                      </h2>
                      <p className={`mb-4 ${isDark ? "text-[#D0D0D0]" : "text-gray-700"}`}>{post.contenido}</p>

                      <div className={`flex gap-2 mb-4 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                        <Badge className="bg-blue-600 text-white">#{post.tipo.toLowerCase()}</Badge>
                      </div>

                      <div className={`flex items-center gap-4 text-sm ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleComentarios(post.id)}
                          className="transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {comentarios[post.id]?.length || 0} comentarios
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
                            <Button
                              onClick={() => handleComentar(post.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
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
              <h2 className={`text-xl font-semibold ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
                Crear Nueva Publicación
              </h2>
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
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleCreatePost}
                >
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}