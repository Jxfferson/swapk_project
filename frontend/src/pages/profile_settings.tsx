"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Settings,
  Search,
  MessageSquare,
  Bell,
  User,
  MapPin,
  Star,
  CheckCircle,
  HelpCircle,
  LogOut,
  UserCog,
  Mail,
  ChevronRight,
  Phone,
} from "lucide-react";
import Image from 'next/image';

interface UserData {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  description: string;
}

const ProfileSettings: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [userData] = useState<UserData>({
    username: "manuel.eduardo2007",
    fullName: "Manuel Eduardo Rangel Correa",
    email: "eduardo@example.com",
    phone: "300xxxxxxx",
    location: "Bogotá, Colombia",
    description: ""
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const maxDescriptionLength = 255;

  // Event handlers
  const handleSaveChanges = (): void => {
    console.log('Guardando cambios...');
  };

  const handleChangeName = (): void => {
    console.log('Cambiar nombre...');
  };

  const handleEditEmail = (): void => {
    console.log('Editar correo...');
  };

  const handleEditPhone = (): void => {
    console.log('Editar teléfono...');
  };

  const handleEditLocation = (): void => {
    console.log('Editar ubicación...');
  };

  const handleViewMore = (): void => {
    console.log('Ver más ubicación...');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Buscando:", searchQuery);
  };

  return (
    <div className="profile-settings-page">
      {/* Header Navigation */}
        <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo-container">
                <Image 
                    src="/img/logoswapk.png"
                    alt="Logo Swapk"
                    width={35}
                    height={35}
                    className="logo"
                />
            </div>
            <div className="nav-links">
              <a href="#inicio" className="nav-link">
                INICIO
              </a>
              <a href="#trueques" className="nav-link">
                TRUEQUES
              </a>
              <a href="#comunidad" className="nav-link">
                COMUNIDAD
              </a>
              <a href="#faqs" className="nav-link">
                FAQ's
              </a>
            </div>
          </div>

          <div className="nav-center">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="¿Qué aprenderás hoy?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <Search className="search-icon" />
              </button>
            </form>
          </div>

          <div className="nav-right">
            <button className="nav-icon-btn message-btn">
              <MessageSquare className="nav-icon" />
            </button>
            <button className="nav-icon-btn notification-btn">
              <Bell className="nav-icon" />
              <span className="notification-dot"></span>
            </button>
            <button
              className="nav-icon-btn profile-btn"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <User className="nav-icon" />
            </button>
            {profileMenuOpen && (
              <div className="profile-dropdown" ref={dropdownRef}>
                <div className="dropdown-item">
                  <User className="dropdown-icon" />
                  <span>Cuenta</span>
                </div>
                <div className="dropdown-item">
                  <HelpCircle className="dropdown-icon" />
                  <span>Soporte</span>
                </div>
                <a href="./profile_settings">
                <div className="dropdown-item">
                  <Settings className="dropdown-icon" />
                  <span>Ajustes</span>
                </div>
                </a>
                <div className="dropdown-separator"></div>
                <div className="dropdown-item change-account">
                  <User className="dropdown-icon" />
                  <span>Cambiar cuenta</span>
                </div>
                <a href="./login">
                <div className="dropdown-item logout">
                  <LogOut className="dropdown-icon" />
                  <span>Cerrar sesión</span>
                </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="profile-layout">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="sidebar-header">
            <Settings className="sidebar-icon" />
            <span className="sidebar-title">Ajustes</span>
          </div>
          
          <div className="sidebar-section">
            <h3 className="section-title">Configuración de mi cuenta</h3>
            <ul className="sidebar-menu">
              <li className="menu-item">
                <a href="#" className="menu-link">Cambiar correo electrónico</a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">Cambiar contraseña</a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">Eliminar cuenta</a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">Notificaciones</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title">Preferencias de la plataforma</h3>
            <ul className="sidebar-menu">
              <li className="menu-item">
                <a href="#" className="menu-link">Idioma</a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">Tema: Claro / Oscuro</a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">Modalidad preferida</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title">Privacidad y seguridad</h3>
            <ul className="sidebar-menu">
              <li className="menu-item">
                <a href="#" className="menu-link">Quién puede ver tu perfil</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3 className="section-title">Certificaciones y validaciones</h3>
            <ul className="sidebar-menu">
              <li className="menu-item">
                <a href="#" className="menu-link">Subir o actualizar logros</a>
              </li>
              <li className="menu-item">
                <a href="#" className="menu-link">Ver estado de verificación de habilidades</a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="profile-main">
          <div className="main-header">
            <h1 className="page-title">Editar perfil</h1>
            <button className="save-button" onClick={handleSaveChanges}>
              Guardar Cambios
            </button>
          </div>

          <div className="profile-card">
            {/* Profile Header */}
            <div className="profile-header-section">
            <div className="logo-gato">
                <Image 
                    src="/img/cat_profile.jpg"
                    alt="Logo Swapk"
                    width={90}
                    height={90}
                    className="logo-gato"
                />
            </div>
              <div className="profile-info">
                <h2 className="profile-username">{userData.username}</h2>
                <p className="profile-fullname">{userData.fullName}</p>
              </div>
              <button className="change-name-button" onClick={handleChangeName}>
                Cambiar nombre
              </button>
            </div>

            {/* Description Section */}
            <div className="description-section">
              <label className="form-label">Descripción</label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Escribe una descripción sobre ti..."
                className="description-textarea"
                maxLength={maxDescriptionLength}
              />
              <div className="character-counter">
                {description.length}/{maxDescriptionLength}
              </div>
            </div>

            {/* Personal Data Section */}
            <div className="personal-data-section">
              <h3 className="section-header">Datos personales</h3>
              <div className="data-items">
                <div className="data-item">
                  <div className="data-item-left">
                    <Mail className="data-icon" />
                    <div className="data-content">
                      <span className="data-label">Correo electrónico</span>
                      <span className="data-value">{userData.email}</span>
                    </div>
                  </div>
                  <button className="edit-button" onClick={handleEditEmail}>
                    <ChevronRight className="edit-icon" />
                  </button>
                </div>

                <div className="data-item">
                  <div className="data-item-left">
                    <Phone className="data-icon" />
                    <div className="data-content">
                      <span className="data-label">Número de teléfono</span>
                      <span className="data-value">{userData.phone}</span>
                    </div>
                  </div>
                  <button className="edit-button" onClick={handleEditPhone}>
                    <ChevronRight className="edit-icon" />
                  </button>
                </div>

                <div className="data-item">
                  <div className="data-item-left">
                    <MapPin className="data-icon" />
                    <div className="data-content">
                      <span className="data-label">Ubicación</span>
                      <span className="data-value">{userData.location}</span>
                      <span className="data-extra" onClick={handleViewMore}>
                        Ver más...
                      </span>
                    </div>
                  </div>
                  <button className="edit-button" onClick={handleEditLocation}>
                    <ChevronRight className="edit-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileSettings;
