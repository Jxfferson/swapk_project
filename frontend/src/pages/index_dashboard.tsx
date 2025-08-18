"use client"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"
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
} from "lucide-react"

export default function ForumLayout() {
  const [activeTab, setActiveTab] = useState("Intercambios")
  const [isDark, setIsDark] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <div
      className={`min-h-screen flex transition-colors duration-300 ${
        isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 🔹 Botón Hamburguesa (solo en pantallas pequeñas) */}
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

      {/* 🔹 Sidebar Izquierdo */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
          flex-col border-r 
          ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}
        `}
      >
        <div
          className={`p-3 border-b transition-colors duration-300 ${
            isDark ? "border-[#2E2E2E]" : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <img src="/img/logoswapk.png" alt="Swapk Logo" className="w-7 h-auto" />
            <span
              className={`text-sm transition-colors duration-300 ${
                isDark ? "text-[#F5F5F5]" : "text-gray-700"
              }`}
            >
              SWAPK
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`ml-auto h-6 w-6 p-0 transition-colors duration-300 ${
                isDark
                  ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 cursor-pointer " />
              ) : (
                <Moon className="cursor-pointer w-4 h-4" />
              )}
            </Button>
          </div>

          {/* 🔹 Barra de búsqueda */}
          <div className="relative mb-3">
            <Search
              className={`cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                isDark ? "text-[#A0A0A0]" : "text-gray-500"
              }`}
            />
            <Input
              placeholder="Buscar en Swapk"
              className={`pl-10 w-full h-8 transition-colors duration-300 
                    border-none shadow-none focus-visible:ring-0 ${
                      isDark
                        ? "bg-[#1E1E1E] text-[#F5F5F5] placeholder-[#A0A0A0]"
                        : "bg-gray-100 text-gray-900 placeholder-gray-500"
                    }`} 
            />
          </div>

          {/* 🔹 Acciones de usuario */}
          <div className="flex gap-1 mb-3">
            {[MessageSquare, Bell, User].map((Icon, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className={`cursor-pointer flex-1 h-8 transition-colors duration-300 ${
                  isDark
                    ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
              </Button>
            ))}
          </div>

          {/* 🔹 Navegación */}
          <nav className="space-y-3">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer w-full justify-start bg-blue-600 text-white hover:bg-blue-700 h-8 transition-colors duration-300"
            >
              <Home className="w-4 h-4 mr-2" />
              Inicio
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`cursor-pointer w-full justify-start h-8 transition-colors duration-300 ${
                isDark
                  ? "text-[#F5F5F5] hover:bg-[#2E2E2E]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Popular
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`cursor-pointer w-full justify-start h-8 transition-colors duration-300 ${
                isDark
                  ? "text-[#F5F5F5] hover:bg-[#2E2E2E]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Intercambios
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`cursor-pointer w-full justify-start h-8 transition-colors duration-300 ${
                isDark
                  ? "text-[#F5F5F5] hover:bg-[#2E2E2E]"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Mis Cursos
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        {/* Tab Navigation */}
        <div className="flex gap-5 mb-6">
          {["Todo", "Intercambios", "Cursos", "Preguntas", "Logros"].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "ghost"}
              size="sm"
              className={`cursor-pointer transition-colors duration-300 ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : `${isDark ? "text-[#A0A0A0] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Forum Posts */}
        <div className="space-y-6 w-200">
          {/* Post 1 */}
          <Card className={`transition-colors duration-300 ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Vote Section */}
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </Button>
                  <span className={`text-lg font-semibold transition-colors duration-300 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>24</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                    <span className={`cursor-pointer text-sm transition-colors duration-300 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                      r/intercambioidiomas
                    </span>
                    <span className={`text-sm transition-colors duration-300 ${isDark ? "text-[#707070]" : "text-gray-500"}`}>• hace 2 horas</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`cursor-pointer ml-auto transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <h2 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
                    ¡Intercambio exitoso! Inglés por Diseño Gráfico
                  </h2>

                  <p className={`mb-4 transition-colors duration-300 ${isDark ? "text-[#D0D0D0]" : "text-gray-700"}`}>
                    Acabo de terminar mi primer intercambio en Swapk y fue increíble. Enseñé inglés conversacional
                    durante 3 semanas y a cambio aprendí los fundamentos de Photoshop e Illustrator. Mi compañero de
                    intercambio fue súper paciente y profesional. ¿Alguien más ha tenido experiencias similares?
                  </p>

                  <div className={`flex gap-2 mb-4 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                    <Badge variant="secondary" className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                      #inglés
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                      #diseño
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                      #photoshop
                    </Badge>
                  </div>

                  <div className={`flex items-center gap-4 text-sm ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />8 comentarios
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <Share className="w-4 h-4 mr-1" />
                      Compartir
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <Bookmark className="w-4 h-4 mr-1" />
                      Guardar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      Denunciar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post 2 */}
          <Card className={`transition-colors duration-300 ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Vote Section */}
                <div className="flex flex-col items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </Button>
                  <span className={`text-lg font-semibold transition-colors duration-300 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>15</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                    <span className={`cursor-pointer text-sm transition-colors duration-300 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                      r/ProgramaciónPython
                    </span>
                    <span className={`text-sm transition-colors duration-300 ${isDark ? "text-[#707070]" : "text-gray-500"}`}>• hace 4 horas</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`cursor-pointer ml-auto transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  <h2 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
                    Busco intercambio: Python por Marketing Digital
                  </h2>

                  <p className={`mb-4 transition-colors duration-300 ${isDark ? "text-[#D0D0D0]" : "text-gray-700"}`}>
                    Hola comunidad! Soy desarrollador Python con 3 años de experiencia y me gustaría aprender marketing
                    digital, especialmente SEO y Google Ads. Puedo enseñar desde lo básico hasta conceptos avanzados
                    como Django y Flask. ¿Hay algún experto en marketing interesado?
                  </p>

                  <div className={`cursor-pointer flex gap-2 mb-4 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                    <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                      #python
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                      #marketing
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300">
                      #seo
                    </Badge>
                  </div>

                  <div className={`cursor-pointer flex items-center gap-4 text-sm ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      12 comentarios
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <Share className="w-4 h-4 mr-1" />
                      Compartir
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <Bookmark className="w-4 h-4 mr-1" />
                      Guardar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`cursor-pointer transition-colors duration-300 ${isDark ? "text-[#A0A0A0] hover:bg-[#2E2E2E] hover:text-[#F5F5F5]" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      Denunciar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className={`w-82 p-4 border-l transition-colors duration-300 ${isDark ? "border-[#2E2E2E]" : "border-gray-200"}`}>
        {/* Popular Communities */}
        <Card className={`mb-4 transition-colors duration-300 ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}>
          <CardContent className="p-3">
            <h3
              className={`text-base font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}
            >
              <TrendingUp className="w-4 h-4" />
              Cursos Populares
            </h3>

            <div className="space-y-7">
              {[
                { name: "r/IntercambioIdiomas", members: "45.2k miembros", color: "bg-green-600" },
                { name: "r/ProgramaciónPython", members: "38.1k miembros", color: "bg-blue-600" },
                { name: "r/DiseñoGráfico", members: "29.5k miembros", color: "bg-yellow-600" },
                { name: "r/CursosGratuitos", members: "52.3k miembros", color: "bg-purple-600" },
                { name: "r/MarketingDigital", members: "31.7k miembros", color: "bg-red-600" },
                { name: "r/FotografíaBásica", members: "24.9k miembros", color: "bg-indigo-600" },
              ].map((community, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 ${community.color} rounded-full`}></div>
                    <div>
                      <div className={`text-sm font-medium transition-colors duration-300 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
                        {community.name}
                      </div>
                      <div className={`text-xs transition-colors duration-300 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>{community.members}</div>
                    </div>
                  </div>
                  <Button size="sm" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 transition-colors duration-300">
                    Unirse
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Statistics */}
        <Card className={`transition-colors duration-300 ${isDark ? "bg-[#1E1E1E] border-[#2E2E2E]" : "bg-white border-gray-200"}`}>
          <CardContent className="p-3">
            <h3 className={`text-base font-semibold mb-3 transition-colors duration-300 ${isDark ? "text-[#F5F5F5]" : "text-gray-900"}`}>
              Tus Estadísticas
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <div className={`cursor-pointer p-2 rounded-lg text-center transition-colors duration-300 ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
                <div className="text-xl font-bold text-blue-400">12</div>
                <div className={`text-xs uppercase transition-colors duration-300 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>Intercambios</div>
              </div>
              <div className={`cursor-pointer p-3 rounded-lg text-center transition-colors duration-300 ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
                <div className="text-xl font-bold text-green-400">23</div>
                <div className={`text-xs uppercase transition-colors duration-300 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>Cursos</div>
              </div>
              <div className={`cursor-pointer p-3 rounded-lg text-center transition-colors duration-300 ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
                <div className="text-xl font-bold text-yellow-400">4.8</div>
                <div className={`text-xs uppercase transition-colors duration-300 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>Rating</div>
              </div>
              <div className={`cursor-pointer p-2 rounded-lg text-center transition-colors duration-300 ${isDark ? "bg-[#141414]" : "bg-gray-100"}`}>
                <div className="text-xl font-bold text-purple-400">23</div>
                <div className={`text-xs uppercase transition-colors duration-300 ${isDark ? "text-[#A0A0A0]" : "text-gray-600"}`}>Conexiones</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}