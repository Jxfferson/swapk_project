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
  UserCog
} from "lucide-react";
import Image from 'next/image';

const Perfil: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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

  const userData = {
    name: "Manuel Eduardo",
    location: "Colombia, Cali",
    isVerified: true,
    rating: 5,
    avatar: "./img/cat_profile.jpg",
    welcomeText:
      "¡Bienvenido a tu perfil! Aquí puedes administrar tu información personal, incluyendo tu nombre, correo electrónico y estado de inscripción. Mantente al día con tu proceso de aprendizaje y aprovecha al máximo tu experiencia en Swapk.",
  };

  const exchangeStats = {
    completed: 5,
    enrolled: 2,
    coursesCompleted: "Cursos completos",
    coursesToTake: "Cursos a realizar",
    knownPeople: 7,
    instructors: "Instructores",
  };

  const skills = [
    { name: "#Python", color: "purple" },
    { name: "#Guitarra", color: "brown" },
    { name: "#Fotografía", color: "gray" },
    { name: "#Inglés B2", color: "blue" },
    { name: "#Marketing", color: "gray" },
    { name: "#Ciberseguridad", color: "gray" },
  ];

  const exchangeHistory = [
    {
      id: 1,
      type: "Clases de cocina por lecciones de fotografía",
      partner: "Usuario",
      description:
        "Gran intercambio, Eduardo explicó todo claramente y con paciencia.",
      rating: 4,
      avatar: "./img/login/man_login.jpg",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", searchQuery);
  };

  return (
    <div className="perfil-page">
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

      <div className="main-content">
        <div className="content-grid">
          {/* Left Column */}
          <div className="profile-section">
            <div className="profile-card">
              <div className="profile-avatar">
                <img
                  src={userData.avatar || "/placeholder.svg"}
                  alt={userData.name}
                  className="avatar-image"
                />
              </div>
              <div className="profile-info">
                <div className="profile-header">
                  <h2 className="profile-name">
                    {userData.name}
                    {userData.isVerified && (
                      <CheckCircle className="verified-icon" />
                    )}
                  </h2>
                  <div className="profile-location">
                    <MapPin className="location-icon" />
                    <span>{userData.location}</span>
                  </div>
                </div>
                <div className="profile-rating">
                  {[...Array(userData.rating)].map((_, i) => (
                    <Star key={i} className="star filled" />
                  ))}
                </div>
                <button className="edit-profile-btn">Editar perfil</button>
              </div>
            </div>
            <div className="welcome-text">
              <p>{userData.welcomeText}</p>
            </div>
          </div>

          {/* Center Column */}
          <div className="exchange-section">
            <h3 className="section-title">Información de Intercambios</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{exchangeStats.completed}</div>
                <div className="stat-label">Intercambios realizados</div>
                <div className="stat-sublabel">
                  {exchangeStats.coursesCompleted}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{exchangeStats.enrolled}</div>
                <div className="stat-label">Intercambios inscritos</div>
                <div className="stat-sublabel">{exchangeStats.coursesToTake}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{exchangeStats.knownPeople}</div>
                <div className="stat-label">Personas conocidas</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Personas de Intercambio</div>
                <div className="stat-sublabel">{exchangeStats.instructors}</div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="skills-section">
            <div className="skills-card">
              <h3 className="section-title">Habilidades</h3>
              <div className="skills-grid">
                {skills.map((skill, i) => (
                  <span key={i} className={`skill-tag skill-${skill.color}`}>
                    {skill.name}
                  </span>
                ))}
              </div>
              <button className="view-more-btn">Ver más</button>
            </div>
            <div className="history-card">
              <h3 className="section-title">Historial de intercambios</h3>
              {exchangeHistory.map((ex) => (
                <div key={ex.id} className="exchange-item">
                  <div className="exchange-header">
                    <div className="exchange-avatar">
                      <img
                        src={ex.avatar || "/placeholder.svg"}
                        alt={ex.partner}
                      />
                    </div>
                    <div className="exchange-info">
                      <h4 className="exchange-type">{ex.type}</h4>
                      <p className="exchange-description">
                        "{ex.description}"
                      </p>
                      <button className="view-details-btn">Ver detalles</button>
                    </div>
                  </div>
                  <div className="exchange-rating">
                    {[...Array(ex.rating)].map((_, i) => (
                      <Star key={i} className="star filled" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;