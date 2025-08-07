"use client"
import { useState } from "react"
import { Settings, Apple } from 'lucide-react'
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    acceptOffers: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="register-page">
      {/* Header */}
      <header className="register-header">
        <div className="logo-header">
          <Image 
            src="/img/logoswapk.png"
            alt="Logo Swapk"
            width={35}
            height={35}
            className="logo"
          />
          <span className="logo-text">SWAPK</span>
        </div>
      </header>

       <div className="login-container">
              {/* Left Side - Illustrations Placeholder */}
              <div className="login-left">
              <div className="image-stack">
                {/* Imagen de fondo */}
                <Image 
                  src=""
                  alt="Fondo ilustración"
                  width={500}
                  height={300}
                  className="stacked-image background-image"
                />
      
                {/* Imagen secundaria */}
                <Image 
                  src=""
                  alt="Ilustración secundaria"
                  width={250}
                  height={180}
                  className="stacked-image secondary-image"
                />
      
                {/* Imagen principal */}
                <Image 
                  src=""
                  alt="Ilustración principal"
                  width={280}
                  height={200}
                  className="stacked-image primary-image"
                />
              </div>
        </div>

        {/* Right Side - Form */}
        <div className="register-right">
          <div className="form-container">
            {/* Logo */}
            <div className="form-logo">
              <Image 
                  src="/img/logoswapk.png"
                  alt="Logo Swapk"
                  width={35}
                  height={35}
                  className="logo"
              />
              <h1 className="form-title">
                Sw<span className="highlight">a</span>pk
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="acceptOffers"
                    checked={formData.acceptOffers}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    Quiero recibir ofertas especiales, recomendaciones personalizadas y consejos de aprendizaje.
                  </span>
                </label>
              </div>

              <button type="submit" className="register-button">
                Registrarte
              </button>
            </form>

            {/* Social Login */}
            <div className="social-section">
              <p className="social-text">Otras opciones de registro</p>
              <div className="social-buttons">
                <button className="social-btn apple-btn">
                  <Apple className="social-icon" />
                </button>
                <button className="social-btn facebook-btn">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="social-btn google-btn">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Login Link */}
            <div className="login-link">
              <span className="login-text">¿Ya tienes una cuenta? </span>
              <a href="./login" className="login-link-text">Inicia sesión aquí.</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
