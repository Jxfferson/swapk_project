"use client"
import { useState } from "react"
import { Search, Settings, Bell, MessageSquare, Download, Eye, ChevronLeft, Menu } from "lucide-react"
import Image from 'next/image';


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
    <div className="dashboard">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <Settings className="logo-icon" />
            </div>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu />
            </button>
            <div className={`nav-links ${mobileMenuOpen ? "nav-links-open" : ""}`}>
              <a href="#" className="nav-link">
                INICIO
              </a>
              <a href="#" className="nav-link">
                TRUEQUES
              </a>
              <a href="#" className="nav-link">
                COMUNIDAD
              </a>
              <a href="#" className="nav-link">
                FAQ's
              </a>
            </div>
          </div>

          <div className="nav-right">
            <div className="search-container">
              <input type="text" placeholder="¿Qué aprenderás hoy?" className="search-input" />
              <Search className="search-icon" />
            </div>
            <button className="icon-btn message-btn">
              <MessageSquare />
            </button>
            <button className="icon-btn notification-btn">
              <Bell />
              <span className="notification-dot"></span>
            </button>
            <div className="avatar">
              <span>U</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <div className="sidebar-content">
            <div className="sidebar-header">
              <ChevronLeft className="sidebar-icon" />
              <h2 className="sidebar-title">Ajustes</h2>
            </div>

            <div className="sidebar-sections">
              <div className="sidebar-section">
                <h3 className="section-title">Configuración de mi cuenta</h3>
                <ul className="section-links">
                  <li>
                    <a href="#" className="section-link">
                      Cambiar correo electrónico
                    </a>
                  </li>
                  <li>
                    <a href="#" className="section-link">
                      Cambiar contraseña
                    </a>
                  </li>
                  <li>
                    <a href="#" className="section-link">
                      Eliminar cuenta
                    </a>
                  </li>
                  <li>
                    <a href="#" className="section-link">
                      Notificaciones
                    </a>
                  </li>
                </ul>
              </div>

              <div className="sidebar-section">
                <h3 className="section-title">Preferencias de la plataforma</h3>
                <ul className="section-links">
                  <li>
                    <a href="#" className="section-link">
                      Idioma
                    </a>
                  </li>
                  <li>
                    <a href="#" className="section-link">
                      Tema: Claro / Oscuro
                    </a>
                  </li>
                  <li>
                    <a href="#" className="section-link">
                      Modalidad preferida
                    </a>
                  </li>
                </ul>
              </div>

              <div className="sidebar-section">
                <h3 className="section-title">Privacidad y seguridad</h3>
                <ul className="section-links">
                  <li>
                    <a href="#" className="section-link">
                      Quién puede ver tu perfil
                    </a>
                  </li>
                </ul>
              </div>

              <div className="sidebar-section">
                <h3 className="section-title">Certificaciones y validaciones</h3>
                <ul className="section-links">
                  <li>
                    <a href="#" className="section-link">
                      Subir o actualizar soportes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="section-link">
                      Ver estado de verificación de habilidades
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="content-header">
            <h1 className="page-title">Subir soporte</h1>
          </div>

          <div className="table-container">
            <table className="support-table">
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
                    <td className="name-cell">{item.name}</td>
                    <td>
                      <span className="badge badge-type">{item.type}</span>
                    </td>
                    <td>
                      <span className="badge badge-status">{item.status}</span>
                    </td>
                    <td className="date-cell">
                      <div className="date-info">
                        <span>{item.date}</span>
                        <span>{item.time}</span>
                        <span>{item.score}</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-view">
                          <Eye className="btn-icon" />
                          Ver
                        </button>
                        {index === 1 && (
                          <button className="btn btn-download">
                            <Download className="btn-icon" />
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

          <div className="table-footer">
            <button className="btn btn-primary">Ver más</button>
          </div>
        </main>
      </div>
    </div>
  )
}
