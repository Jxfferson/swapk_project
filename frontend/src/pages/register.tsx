"use client"
import { useState } from "react"
import { Settings, Apple } from 'lucide-react'
import Image from "next/image";
import styles from "../assets/styles/registerPage.module.css";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    acceptOffers: false
  })

  //Ruta para redirecciones
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:8000/register', { // cambiar URL si es necesario
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        })
      })

      const data = await res.json()
      if (res.ok) {
        alert('Usuario registrado con éxito')
        router.push("/primary_dashboard");
        console.log(data)
      } else {
        console.error('Error al registrar:', data)
        alert(data.detail || 'Error desconocido')
      }
    } catch (error) {
      console.error(error)
      alert('Error en el registro')
    }
  }

  return (
    <div className={styles['register-page']}>
      {/* Header */}
      <header className={styles['register-header']}>
        <div className={styles['logo-header']}>
          <div className={styles['logo-container']}>
            <a href="./">
              <Image 
                src="/img/logoswapk.png"
                alt="Logo Swapk"
                width={35}
                height={35}
                className={styles.logo}
              />
            </a>
          </div>
          <span className={styles['logo-text']}>SWAPK</span>
        </div>
      </header>

      <div className={styles['login-container']}>
        {/* Right Side - Form */}
        <div className={styles['register-right']}>
          <div className={styles['form-container']}>
            {/* Logo */}
            <div className={styles['form-logo']}>
              <div className={styles['logo-container']}>
                <a href="./">
                  <Image 
                    src="/img/logoswapk.png"
                    alt="Logo Swapk"
                    width={35}
                    height={35}
                    className={styles.logo}
                  />
                </a>
              </div>
              <h1 className={styles['form-title']}>
                Sw<span className={styles.highlight}>a</span>pk
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles['register-form']}>
              <div className={styles['form-group']}>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={styles['form-input']}
                  required
                />
              </div>

              <div className={styles['form-group']}>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles['form-input']}
                  required
                />
              </div>

              <div className={styles['form-group']}>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles['form-input']}
                  required
                />
              </div>

              <div className={styles['checkbox-group']}>
                <label className={styles['checkbox-label']}>
                  <input
                    type="checkbox"
                    name="acceptOffers"
                    checked={formData.acceptOffers}
                    onChange={handleInputChange}
                    className={styles['checkbox-input']}
                  />
                  <span className={styles['checkbox-custom']}></span>
                  <span className={styles['checkbox-text']}>
                    Quiero recibir ofertas especiales, recomendaciones personalizadas y consejos de aprendizaje.
                  </span>
                </label>
              </div>

              <button type="submit" className={styles['register-button']}>
                Registrarte
              </button>
            </form>

            {/* Social Login */}
            <div className={styles['social-section']}>
              <p className={styles['social-text']}>Otras opciones de registro</p>
              <div className={styles['social-buttons']}>
                <button className={`${styles['social-btn']} ${styles['apple-btn']}`}>
                  <Apple className={styles['social-icon']} />
                </button>
                <button className={`${styles['social-btn']} ${styles['facebook-btn']}`}>
                  <svg className={styles['social-icon']} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className={`${styles['social-btn']} ${styles['google-btn']}`}>
                  <svg className={styles['social-icon']} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Login Link */}
            <div className={styles['login-link']}>
              <span className={styles['login-text']}>¿Ya tienes una cuenta? </span>
              <a href="./login" className={styles['login-link-text']}>Inicia sesión aquí.</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
