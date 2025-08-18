"use client"
import { useState } from "react"
import { Apple, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    acceptOffers: false,
  })
  const [darkMode, setDarkMode] = useState(true)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        alert("Usuario registrado con éxito")
        router.push("/index_dashboard")
      } else {
        alert(data.detail || "Error desconocido")
      }
    } catch (error) {
      console.error(error)
      alert("Error en el registro")
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`flex justify-between items-center shadow-sm border-b px-6 py-4 transition-colors duration-500 ${
          darkMode ? "bg-[#121212]" : "bg-white"
        }`}
      >
        <div className="flex items-center gap-3">
          <a href="./">
            <Image
              src="/img/logoswapk.png"
              alt="Logo Swapk"
              width={35}
              height={35}
              className="rounded-lg"
            />
          </a>
          <span className="text-xl font-bold">SWAPK</span>
        </div>

        {/* Toggle dark mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </header>

      {/* Main content */}
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center">
            <Image
              src="/img/logoswapk.png"
              alt="Logo Swapk"
              width={35}
              height={35}
              className="mx-auto rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold">
              Sw<span className="text-blue-600">a</span>pk
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 mb-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                  : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
              }`}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 mb-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                  : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
              }`}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 mb-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                  : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
              }`}
              required
            />

            {/* Checkbox */}
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="acceptOffers"
                checked={formData.acceptOffers}
                onChange={handleInputChange}
                className="mt-1 cursor-pointer"
              />
              <span>
                Quiero recibir ofertas especiales, recomendaciones personalizadas
                y consejos de aprendizaje.
              </span>
            </label>

            <button
              type="submit"
              className="cursor-pointerw-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
            >
              Registrarte
            </button>
          </form>

          {/* Social login */}
            <div className="space-y-4">
              <p className="text-center text-sm">
                Otras opciones de inicio de sesión
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-500 cursor-pointer"
                  onClick={() => handleSocialLogin("Apple")}
                >
                  <Apple className="w-5 h-5" />
                </button>
                <button
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-500 cursor-pointer"
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  className="flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-500 cursor-pointer"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </button>
              </div>
            </div>

          {/* Link login */}
          <div className="text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="./login"
              className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
            >
              Inicia sesión aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
