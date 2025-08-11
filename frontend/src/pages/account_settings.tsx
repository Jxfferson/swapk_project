"use client"
import { useState } from "react"
import { Search, Settings, Bell, MessageSquare, Download, Eye, ChevronLeft, Menu } from "lucide-react"
import Image from 'next/image';
import styles from "../assets/styles/dashboard.module.css";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const supportData = [
    {
      name: "Inglés Intermedio",
      type: "Certificado",
      status: "En revisión",
      date: "00",
      time: "00",
      score: "0000",
    },
    {
      name: "Inglés Intermedio",
      type: "Certificado",
      status: "En revisión",
      date: "00",
      time: "00",
      score: "0000",
    },
  ]

  return (
    <div className={styles.dashboard}>
      {/* Top Navigation */}
      <nav className={styles['top-nav']}>
        <div className={styles['nav-container']}>
          <div className={styles['nav-left']}>
            <div className={styles.logo}>
              <Settings className={styles['logo-icon']} />
            </div>
            <button 
              className={styles['mobile-menu-btn']} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu />
            </button>
            <div className={`${styles['nav-links']} ${mobileMenuOpen ? styles['nav-links-open'] : ''}`}>
              <a href="#" className={styles['nav-link']}>
                INICIO
              </a>
              <a href="#" className={styles['nav-link']}>
                TRUEQUES
              </a>
              <a href="#" className={styles['nav-link']}>
                COMUNIDAD
              </a>
              <a href="#" className={styles['nav-link']}>
                FAQ's
              </a>
            </div>
          </div>

          <div className={styles['nav-right']}>
            <div className={styles['search-container']}>
              <input 
                type="text" 
                placeholder="¿Qué aprenderás hoy?" 
                className={styles['search-input']} 
              />
              <Search className={styles['search-icon']} />
            </div>
            <button className={`${styles['icon-btn']} ${styles['message-btn']}`}>
              <MessageSquare />
            </button>
            <button className={`${styles['icon-btn']} ${styles['notification-btn']}`}>
              <Bell />
              <span className={styles['notification-dot']}></span>
            </button>
            <div className={styles.avatar}>
              <span>U</span>
            </div>
          </div>
        </div>
      </nav>

      <div className={styles['main-container']}>
        {/* Sidebar */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles['sidebar-open'] : styles['sidebar-closed']}`}>
          <div className={styles['sidebar-content']}>
            <div className={styles['sidebar-header']}>
              <ChevronLeft className={styles['sidebar-icon']} />
              <h2 className={styles['sidebar-title']}>Ajustes</h2>
            </div>

            <div className={styles['sidebar-sections']}>
              <div className={styles['sidebar-section']}>
                <h3 className={styles['section-title']}>Configuración de mi cuenta</h3>
                <ul className={styles['section-links']}>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Cambiar correo electrónico
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Cambiar contraseña
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Eliminar cuenta
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Notificaciones
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles['sidebar-section']}>
                <h3 className={styles['section-title']}>Preferencias de la plataforma</h3>
                <ul className={styles['section-links']}>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Idioma
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Tema: Claro / Oscuro
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Modalidad preferida
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles['sidebar-section']}>
                <h3 className={styles['section-title']}>Privacidad y seguridad</h3>
                <ul className={styles['section-links']}>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Quién puede ver tu perfil
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles['sidebar-section']}>
                <h3 className={styles['section-title']}>Certificaciones y validaciones</h3>
                <ul className={styles['section-links']}>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Subir o actualizar soportes
                    </a>
                  </li>
                  <li>
                    <a href="#" className={styles['section-link']}>
                      Ver estado de verificación de habilidades
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles['main-content']}>
          <div className={styles['content-header']}>
            <h1 className={styles['page-title']}>Subir soporte</h1>
          </div>

          <div className={styles['table-container']}>
            <table className={styles['support-table']}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {supportData.map((item, index) => (
                  <tr key={index}>
                    <td className={styles['name-cell']}>{item.name}</td>
                    <td>
                      <span className={`${styles.badge} ${styles['badge-type']}`}>{item.type}</span>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles['badge-status']}`}>{item.status}</span>
                    </td>
                    <td className={styles['date-cell']}>
                      <div className={styles['date-info']}>
                        <span>{item.date}</span>
                        <span>{item.time}</span>
                        <span>{item.score}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles['action-buttons']}>
                        <button className={`${styles.btn} ${styles['btn-view']}`}>
                          <Eye className={styles['btn-icon']} />
                          Ver
                        </button>
                        {index === 1 && (
                          <button className={`${styles.btn} ${styles['btn-download']}`}>
                            <Download className={styles['btn-icon']} />
                            Descargar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles['table-footer']}>
            <button className={`${styles.btn} ${styles['btn-primary']}`}>Ver más</button>
          </div>
        </main>
      </div>
    </div>
  )
}