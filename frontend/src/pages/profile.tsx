"use client"
import React, { useState } from 'react';
import { Settings, Search, MessageSquare, Bell, User, MapPin, Star, CheckCircle, Eye } from 'lucide-react';

interface Skill {
  name: string;
  color: string;
}

interface ExchangeHistory {
  id: number;
  type: string;
  partner: string;
  description: string;
  rating: number;
  avatar: string;
}

interface ExchangeStats {
  completed: number;
  enrolled: number;
  coursesCompleted: string;
  coursesToTake: string;
  knownPeople: number;
  instructors: string;
}

const Perfil: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // User data
  const userData = {
    name: "Manuel Eduardo",
    location: "Colombia, cali",
    isVerified: true,
    rating: 5,
    avatar: "/placeholder.svg?height=120&width=120&text=ME",
    welcomeText: "¡Bienvenido a tu perfil! Aquí puedes administrar tu información personal, incluyendo tu nombre, correo electrónico y estado de inscripción. Mantente al día con tu proceso de aprendizaje y aprovecha al máximo tu experiencia en Swapk."
  };

  // Exchange statistics
  const exchangeStats: ExchangeStats = {
    completed: 5,
    enrolled: 2,
    coursesCompleted: "Cursos completos",
    coursesToTake: "Cursos a realizar",
    knownPeople: 7,
    instructors: "Instructores"
  };

  // Skills data
  const skills: Skill[] = [
    { name: "#Python", color: "purple" },
    { name: "#Guitarra", color: "brown" },
    { name: "#Fotografía", color: "gray" },
    { name: "#Inglés B2", color: "blue" },
    { name: "#Marketing", color: "gray" },
    { name: "#Ciberseguridad", color: "gray" }
  ];

  // Exchange history
  const exchangeHistory: ExchangeHistory[] = [
    {
      id: 1,
      type: "Clases de cocina por lecciones de fotografía",
      partner: "Usuario",
      description: "Gran intercambio, Eduardo explicó todo claramente y con paciencia.",
      rating: 4,
      avatar: "/placeholder.svg?height=40&width=40&text=U"
    }
  ];

  // Event handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching:', searchQuery);
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleViewMore = () => {
    console.log('View more skills clicked');
  };

  const handleViewDetails = () => {
    console.log('View exchange details clicked');
  };

  const handleMessageClick = () => {
    console.log('Messages clicked');
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile menu clicked');
  };

  return (
    <div className="perfil-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <Settings className="logo-icon" />
            </div>
            <div className="nav-links">
              <a href="#inicio" className="nav-link">INICIO</a>
              <a href="#trueques" className="nav-link">TRUEQUES</a>
              <a href="#comunidad" className="nav-link">COMUNIDAD</a>
              <a href="#faqs" className="nav-link">FAQ's</a>
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
            <button className="nav-icon-btn message-btn" onClick={handleMessageClick}>
              <MessageSquare className="nav-icon" />
            </button>
            <button className="nav-icon-btn notification-btn" onClick={handleNotificationClick}>
              <Bell className="nav-icon" />
              <span className="notification-dot"></span>
            </button>
            <button className="nav-icon-btn profile-btn" onClick={handleProfileClick}>
              <User className="nav-icon" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-grid">
          {/* Left Column - User Profile */}
          <div className="profile-section">
            <div className="profile-card">
              <div className="profile-avatar">
                <img src={userData.avatar || "/placeholder.svg"} alt={userData.name} className="avatar-image" />
              </div>
              
              <div className="profile-info">
                <div className="profile-header">
                  <h2 className="profile-name">
                    {userData.name}
                    {userData.isVerified && <CheckCircle className="verified-icon" />}
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

                <button className="edit-profile-btn" onClick={handleEditProfile}>
                  Editar perfil
                </button>
              </div>
            </div>

            <div className="welcome-text">
              <p>{userData.welcomeText}</p>
            </div>
          </div>

          {/* Center Column - Exchange Information */}
          <div className="exchange-section">
            <h3 className="section-title">Información de Intercambios</h3>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{exchangeStats.completed}</div>
                <div className="stat-label">intercambios realizados</div>
                <div className="stat-sublabel">{exchangeStats.coursesCompleted}</div>
              </div>

              <div className="stat-card">
                <div className="stat-number">{exchangeStats.enrolled}</div>
                <div className="stat-label">Intercambios Inscrito</div>
                <div className="stat-sublabel">{exchangeStats.coursesToTake}</div>
              </div>

              <div className="stat-card">
                <div className="stat-number">{exchangeStats.knownPeople}</div>
                <div className="stat-label">Persona conocidas</div>
              </div>

              <div className="stat-card">
                <div className="stat-label">Personas de Intercambio</div>
                <div className="stat-sublabel">{exchangeStats.instructors}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Skills and History */}
          <div className="skills-section">
            <div className="skills-card">
              <h3 className="section-title">Habilidades</h3>
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <span key={index} className={`skill-tag skill-${skill.color}`}>
                    {skill.name}
                  </span>
                ))}
              </div>
              <button className="view-more-btn" onClick={handleViewMore}>
                Ver más
              </button>
            </div>

            <div className="history-card">
              <h3 className="section-title">Historial de intercambios</h3>
              {exchangeHistory.map((exchange) => (
                <div key={exchange.id} className="exchange-item">
                  <div className="exchange-header">
                    <div className="exchange-avatar">
                      <img src={exchange.avatar || "/placeholder.svg"} alt={exchange.partner} />
                    </div>
                    <div className="exchange-info">
                      <h4 className="exchange-type">{exchange.type}</h4>
                      <p className="exchange-description">"{exchange.description}"</p>
                      <button className="view-details-btn" onClick={handleViewDetails}>
                        Ver detalles
                      </button>
                    </div>
                  </div>
                  <div className="exchange-rating">
                    {[...Array(exchange.rating)].map((_, i) => (
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
