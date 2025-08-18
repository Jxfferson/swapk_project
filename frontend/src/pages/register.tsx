"use client"
import { useState } from "react"
import { Apple, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"
import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"

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
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
            >
              Registrarte
            </button>
          </form>

          {/* Social login */}
          <div className="space-y-4">
            <p className="text-center text-sm">Otras opciones de registro</p>
            <div className="flex justify-center gap-4">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const token = credentialResponse.credential
                  if (!token) {
                    alert("No se obtuvo el token de Google ❌")
                    return
                  }
                  try {
                    const res = await axios.post(
                      "http://localhost:8000/auth/google/login",
                      { token }
                    )
                    alert(`Bienvenido ${res.data.nombre} 🎉`)
                    localStorage.setItem("user", JSON.stringify(res.data))
                    router.push("/index_dashboard")
                  } catch (err: any) {
                    console.error(err.response || err)
                    alert(
                      err.response?.data?.detail ||
                        "Error al registrarse con Google ❌"
                    )
                  }
                }}
                onError={() => {
                  console.log("Error en Google Register ❌")
                }}
                useOneTap
                theme="filled_blue"
                shape="circle" // 👈 esto lo hace botón redondo solo con el icono
              />
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