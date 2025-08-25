"use client"
import React, { useState } from "react"
import { Apple, Eye, EyeOff, Sun, Moon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios"

interface LoginFormData {
  emailOrUsername: string
  password: string
  showPassword: boolean
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrUsername: "",
    password: "",
    showPassword: false,
  })
  const [error, setError] = useState("")
  const [darkMode, setDarkMode] = useState(true)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }))
  }

  const handleForgotPassword = () => router.push("/auth/forgotpassword")
  const handleRegister = () => router.push("/auth/register")
  const handleSocialLogin = (provider: string) => {
    alert(`Login con ${provider} en construcción 🚧`)
  }

  // LOGIN NORMAL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrUsername: formData.emailOrUsername,
          password: formData.password,
        }),
      })

      if (res.ok) {
        const data = await res.json();

        // ✅ Guardar el token EN EL OBJETO "user" en localStorage
        const userData = {
          token: data.token,           // ← ¡Importante! Incluye el token aquí
          id: data.user.id,
          nombre: data.user.nombre,
          correo: data.user.correo,
          perfil: data.perfil,
        };

        // ✅ Guardar todo en localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        console.log("✅ Token guardado:", userData.token);
        console.log("🔍 Longitud del token:", userData.token?.length);
        console.log("📦 Usuario guardado en localStorage:", JSON.parse(localStorage.getItem("user")!));

        // 🍪 Opcional: también guardar en cookie (puedes usarlo en el backend)
        document.cookie = `token=${data.token}; path=/; max-age=3600; secure; samesite=strict`;

        router.push("../dashboard/index_dashboard");
        } else {
        const errorData = await res.json()
        setError(errorData.detail || "Error al iniciar sesión")
      }
    } catch (err) {
      console.error(err)
      setError("Error de conexión con el servidor")
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#121212] text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-700`}>
      {/* Header */}
      <header className={`flex justify-between items-center shadow-sm border-b px-6 py-4 transition-colors duration-700 ${darkMode ? "bg-[#121212] border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="flex items-center gap-3">
          <a href="./">
            <Image src="/img/logoswapk.png" alt="Logo Swapk" width={35} height={35} className="rounded-lg" />
          </a>
          <span className="text-xl font-bold">SWAPK</span>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="cursor-pointer p-2 rounded-lg border hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-500">
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
        </button>
      </header>

      {/* Contenido */}
      <div className="flex min-h-[calc(100vh-80px)] transition-colors duration-700">
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Image src="/img/logoswapk.png" alt="Logo Swapk" width={35} height={35} className="mx-auto rounded-lg mb-4" />
              <h1 className="text-3xl font-bold">Sw<span className="text-blue-600">a</span>pk</h1>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-600 text-sm text-center">{error}</p>}

              <input
                type="text"
                name="emailOrUsername"
                placeholder="Correo electrónico o usuario"
                value={formData.emailOrUsername}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 mb-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-500 ${darkMode ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700" : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"}`}
                required
              />

              <div className="relative">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 mb-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-500 ${darkMode ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700" : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"}`}
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition cursor-pointer" onClick={togglePasswordVisibility}>
                  {formData.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button type="submit" className="cursor-pointer w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-500">
                Iniciar sesión
              </button>
            </form>

            {/* Opciones sociales */}
            <div className="space-y-4">
              <p className="text-center text-sm">Otras opciones de inicio de sesión</p>
              <div className="flex justify-center gap-4">

                {/* Botón Google corregido */}
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    console.log("Google response:", credentialResponse); // 👈 revisa qué devuelve Google
                    
                    const token = credentialResponse.credential; // 👈 este es el id_token (JWT)
                    if (!token) {
                      alert("No se obtuvo el token de Google ❌");
                      return;
                    }

                    try {
                      const res = await axios.post("http://localhost:8000/auth/google/login", { token });
                      alert(`Bienvenido ${res.data.nombre} 🎉`);
                      localStorage.setItem("user", JSON.stringify(res.data));
                      router.push("../dashboard/index_dashboard");
                    } catch (err: any) {
                      console.error(err.response || err);
                      alert(err.response?.data?.detail || "Error al iniciar sesión con Google ❌");
                    }
                  }}
                  onError={() => {
                    console.log("Error en Google Login ❌");
                  }}
                  useOneTap
                  theme="filled_blue"
                  shape="circle"
                />
              </div>
            </div>

            {/* Links extra */}
            <div className="text-center space-y-3">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-500 cursor-pointer" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</button>
              <p className="text-sm">¿No tienes una cuenta? <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-500 cursor-pointer" onClick={handleRegister}>Regístrate gratis.</button></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
