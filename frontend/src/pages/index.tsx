"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FileText, Search, Handshake, Star, Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  text: string
  rating: number
}

export default function SwapkLanding() {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ana Martínez",
      role: "Estudiante de Diseño Gráfico",
      image: "img/cat_profile.jpg",
      text: "transformó mi manera de aprender! Los cursos son dinámicos y los instructores realmente dominan su tema. Ahora aplico habilidades que nunca creí posible desarrollar... ¡y todo gracias a esta comunidad!",
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      role: "Desarrollador Web",
      image: "img/fox_profile.jpg",
      text: "me permitió intercambiar mis conocimientos de programación por clases de marketing digital. Una experiencia increíble que me ayudó a crecer profesionalmente.",
      rating: 5,
    },
    {
      id: 3,
      name: "María González",
      role: "Profesora de Idiomas",
      image: "img/men_profile.jpg",
      text: "me ayudó a encontrar estudiantes increíbles que me enseñaron diseño mientras yo les enseñaba inglés. Hace posible el intercambio justo de conocimientos.",
      rating: 5,
    },
  ]

  const nextTestimonial = (): void => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = (): void => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number): void => {
    setCurrentTestimonial(index)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching:", searchQuery)
  }

  const router = useRouter()

  const handleLoginClick = (): void => {
    router.push("/auth/login")
  }

  const handleSignupClick = (): void => {
    router.push("/auth/register")
  }

  const handleJoinClick = (): void => {
    router.push("auth/register")
  }

  const handleHowItWorksClick = (): void => {
    console.log("How it works clicked")
  }

  const handleFindExchangeClick = (): void => {
    console.log("Find exchange clicked")
  }

  const handleLearnMoreClick = (): void => {
    console.log("Learn more about mission clicked")
  }

  const handleDiscoverGoalsClick = (): void => {
    console.log("Discover goals clicked")
  }

  return (
    <div className="min-h-screen bg-[#141414]">
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-800 p-2 rounded-lg text-white hover:bg-gray-700 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <nav
        className={`fixed top-0 left-0 h-full w-65 bg-[#141414] backdrop-blur-md border-r border-gray-700 z-40 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center mb-10">
            <Image
              src="/img/logoswapk.png"
              alt="Logo Swapk"
              width={30}
              height={30}
              className="absolute mx-auto top-5 left-5 rounded-lg mb-1"
            />
            <span className="absolute top-5 left-16 text-white font-bold text-xl">Swapk</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 mb-10">
            <button className="cursor-pointer text-white font-medium text-left py-3 px-4 rounded-lg hover:bg-blue-800/20 hover:text-blue-600 transition-all">
              INICIO
            </button>
            <button className="cursor-pointer text-white font-medium text-left py-3 px-4 rounded-lg hover:bg-blue-800/20 hover:text-blue-600 transition-all">
              TRUEQUES
            </button>
            <button className="cursor-pointer text-white font-medium text-left py-3 px-4 rounded-lg hover:bg-blue-800/20 hover:text-blue-600 transition-all">
              COMUNIDAD
            </button>
            <button className="cursor-pointer text-white font-medium text-left py-3 px-4 rounded-lg hover:bg-blue-800/20 hover:text-blue-600 transition-all">
              FAQ's
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Buscar en Swapk"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 w-full"
              />
              <button
                type="submit"
                className="cursor-pointer bg-blue-600 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-white font-medium"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </form>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-col gap-3 mt-auto">
            <button
              className="cursor-pointer bg-transparent text-white border border-gray-600 px-5 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
              onClick={handleLoginClick}
            >
              Iniciar Sesión
            </button>
            <button
              className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-600/30 transition-all"
              onClick={handleSignupClick}
            >
              Crea cuenta gratis
            </button>
          </div>
        </div>
      </nav>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className="lg:ml-80">
        {/* SECCIÓN 1*/}
        <section className="min-h-screen bg-gradient-to-br bg-[#141414] flex items-center">
          <div className="max-w-4xl mx-auto text-center px-5 w-full">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
              ¿Qué pasa cuando 2 <span className="text-blue-600 font-bold cursor-pointer">mentes</span> se encuentran?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-16">Aprende, enseña y conecta como nunca antes.</p>

            <div className="mb-12">
              <p className="text-lg md:text-xl text-gray-400 italic">
                "Únete a 5,000+ personas que ya están
                <br />
                revitalizando sus habilidades."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button
                className="cursor-pointer bg-transparent text-gray-400 border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all text-sm"
                onClick={handleHowItWorksClick}
              >
                ¿CÓMO FUNCIONA?
              </button>
              <button
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-600/30 transition-all"
                onClick={handleFindExchangeClick}
              >
                ENCUENTRA TU INTERCAMBIO
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2*/}
        <section className="min-h-screen bg-gradient-to-br bg-[#141414] pt-10 pb-20 px-5" id="inicio">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight">
                ¿No puedes pagar <span className="text-blue-600 font-bold cursor-pointer">cursos</span>?
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                Muchos como tú, tienen habilidades para intercambiar.
                <br />
                Aquí lo hacemos posible
              </p>
              <button
                className="cursor-pointer bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-gray-600 hover:to-gray-700 hover:shadow-xl hover:shadow-blue-600/20 transition-all mb-16"
                onClick={handleJoinClick}
              >
                ÚNETE A <span className="cursor-pointer text-gray-400">SWAPK</span> GRATIS
              </button>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-5 p-5 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:shadow-xl hover:shadow-blue-600/20 transition-all">
                <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-lg font-semibold mb-1">
                    Registra tus <span className="text-blue-600 font-bold cursor-pointer">habilidades</span>
                  </h3>
                  <p className="text-gray-400 text-sm">(que tú ofreces y que necesitas)</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:shadow-xl hover:shadow-blue-600/20 transition-all">
                <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-lg font-semibold mb-1">
                    Encuentra a tu pareja de{" "}
                    <span className="text-blue-600 font-bold cursor-pointer">intercambio</span>
                  </h3>
                  <p className="text-gray-400 text-sm">con nuestro buscador inteligente</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-5 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:shadow-xl hover:shadow-blue-600/20 transition-all">
                <div className="w-15 h-15 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Handshake className="w-7 h-7 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-lg font-semibold mb-1">
                    Acuerda el <span className="text-blue-600 font-bold cursor-pointer">intercambio</span>
                  </h3>
                  <p className="text-gray-400 text-sm">y aprende sin costos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: Mission & Vision Section */}
        <section className="min-h-screen flex items-center px-5 bg-[#141414]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            <div>
              <h2 className="text-3xl md:text-5xl text-white font-bold mb-12 leading-tight">
                Descubre la misión y visión de <span className="text-blue-600 font-bold cursor-pointer">SWAPK</span>
              </h2>

              <div className="flex flex-col gap-10">
                <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-gray-700">
                  <h3 className="text-blue-600 font-bold text-xl mb-5">NUESTRA MISIÓN</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "Revolucionar la educación mediante experiencias de aprendizaje innovadoras, haciendo que el
                    conocimiento de calidad sea accesible para todos a través del intercambio de habilidades."
                  </p>
                  <button
                    className="bg-transparent text-gray-400 border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all text-sm"
                    onClick={handleLearnMoreClick}
                  >
                    DESCUBRE NUESTROS OBJETIVOS
                  </button>
                </div>

                <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-gray-700">
                  <h3 className="text-blue-600 font-bold text-xl mb-5">NUESTRA VISIÓN</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "Ser la red global líder en aprendizaje colaborativo, donde cada persona pueda desarrollar sus
                    habilidades a través del intercambio, sin que el dinero sea una barrera para crecer."
                  </p>
                  <button
                    className="bg-transparent text-gray-400 border border-gray-600 px-6 py-3 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all text-sm"
                    onClick={handleDiscoverGoalsClick}
                  >
                    DESCUBRE NUESTRAS METAS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: Testimonials Section */}
        <section className="min-h-screen bg-[#141414] flex items-center px-5">
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-gray-700/30 border border-gray-600 rounded-2xl p-10 relative flex items-center gap-10 mb-8">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-lg leading-relaxed mb-5 text-gray-300">
                  <span className="text-blue-600 font-bold cursor-pointer">Swapk</span>{" "}
                  {testimonials[currentTestimonial].text}
                </p>

                <div className="mb-5">
                  <p className="font-semibold text-white mb-1">— {testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-400 text-sm">{testimonials[currentTestimonial].role}</p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-white">Sw</span>
                    <span className="text-blue-600 font-bold cursor-pointer">a</span>
                    <span className="text-white">pk</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full border-none cursor-pointer transition-colors ${
                    index === currentTestimonial ? "bg-blue-600" : "bg-gray-600"
                  }`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white text-gray-900 py-2 text-center ">
          <div>
            <p className="text-sm font-medium">© 2025 Swapk. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
