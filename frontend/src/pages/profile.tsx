"use client";
import React, { useState, useRef, useEffect } from "react";
import { MapPin, Edit2, Star, CheckCircle, Search, MessageSquare, Bell, User, Settings, HelpCircle, LogOut } from "lucide-react";
import navbar from "../assets/styles/navbar.module.css";
import styles from "../assets/styles/profile.module.css";
import Image from 'next/image';

const Perfil: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  interface UserData {
    name: string;
    location: string;
    avatar: string;
    bio: string;
    stats: {
      number: number | string;
      label: string;
      sublabel?: string;
    }[];
    skills: string[];
  }

  // Datos del usuario
  const userData: UserData = {
    name: "Manuel Eduardo",
    location: "Colombia, Cali",
    avatar: "/img/cat_profile.jpg",
    bio: "¡Bienvenido a tu perfil! Aquí puedes administrar tu información personal...",
    stats: [
      { number: 5, label: "Intercambios realizados", sublabel: "Cursos completos" },
      { number: 2, label: "Intercambios inscritos", sublabel: "Cursos a realizar" }
    ],
    skills: ["#Python", "#Guitarra", "#Fotografía", "#Inglés B2"]
  };

  const exchangeStats = [
    { number: 5, label: "Intercambios realizados", sublabel: "Cursos completos" },
    { number: 2, label: "Intercambios inscritos", sublabel: "Cursos a realizar" }
  ];

  const skills = ["#Python", "#Guitarra", "#Fotografía", "#Inglés B2"];
  const exchangeHistory = [
    {
      type: "Clases de cocina por lecciones de fotografía",
      description: "Gran intercambio, explicó todo claramente...",
      time: "6:01 p.m."
    }
  ];

  // Manejar clicks fuera del dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", searchQuery);
  };

  return (
    <div className={styles.profilePage}>
      {/* Navigation - Navbar existente sin cambios */}
      <nav className={navbar.navbar}>
        <div className={navbar["nav-container"]}>
          <div className={navbar["nav-left"]}>
            <div className={navbar.logo}>
              <div className={styles.logoContainer}>
                <Image 
                  src="/img/logoswapk.png"
                  alt="Logo Swapk"
                  width={25}
                  height={25}
                  className={styles.logo}
                />
              </div>
            </div>
            <div className={navbar["main-nav-links"]}>
              <button className={navbar["main-nav-link"]} onClick={() => console.log("INICIO clicked")}>
                INICIO
              </button>
              <button className={navbar["main-nav-link"]} onClick={() => console.log("TRUEQUES clicked")}>
                TRUEQUES
              </button>
              <button className={`${navbar["main-nav-link"]} ${navbar.active}`} onClick={() => console.log("COMUNIDAD clicked")}>
                COMUNIDAD
              </button>
              <button className={navbar["main-nav-link"]} onClick={() => console.log("FAQS clicked")}>
                FAQ's
              </button>
            </div>
          </div>

          <div className={navbar["nav-center"]}>
            <form onSubmit={handleSearch} className={navbar["search-form"]}>
              <input
                type="text"
                placeholder="Buscar en Swapk"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={navbar["search-input"]}
              />
              <button type="submit" className={navbar["search-button"]}>
                <Search className={navbar["search-icon"]} />
              </button>
            </form>
          </div>

          <div className={navbar.navRight}>
            <button className={`${navbar.navIconBtn} ${navbar.messageBtn}`}>
              <MessageSquare className={navbar.navIcon} />
            </button>
            <button className={`${navbar.navIconBtn} ${navbar.notificationBtn}`}>
              <Bell className={navbar.navIcon} />
              <span className={navbar.notificationDot}></span>
            </button>
            <button
              className={`${navbar.navIconBtn} ${navbar.profileBtn}`}
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <User className={navbar.navIcon} />
            </button>
            {profileMenuOpen && (
              <div className={navbar.profileDropdown} ref={dropdownRef}>
                <div className={navbar.dropdownItem}>
                  <User className={navbar.dropdownIcon} />
                  <span>Cuenta</span>
                </div>
                <div className={navbar.dropdownItem}>
                  <HelpCircle className={navbar.dropdownIcon} />
                  <span>Soporte</span>
                </div>
                <a href="./profile_settings">
                  <div className={navbar.dropdownItem}>
                    <Settings className={navbar.dropdownIcon} />
                    <span>Ajustes</span>
                  </div>
                </a>
                <div className={navbar.dropdownSeparator}></div>
                <div className={`${navbar.dropdownItem} ${navbar.changeAccount}`}>
                  <User className={navbar.dropdownIcon} />
                  <span>Cambiar cuenta</span>
                </div>
                <a href="./login">
                  <div className={`${navbar.dropdownItem} ${navbar.logout}`}>
                    <LogOut className={navbar.dropdownIcon} />
                    <span>Cerrar sesión</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Contenido del Perfil - Versión mejorada */}
      <div className={styles.profileContent}>
        {/* Header de perfil */}
        <div className={styles.profileHeader}>
          <h1 className={styles.profileName}>{userData.name}</h1>
          <div className={styles.profileLocation}>
            <MapPin size={18} />
            <span>{userData.location}</span>
          </div>
          <p className={styles.profileBio}>{userData.bio}</p>
        </div>

        {/* Información de Intercambios */}
        <div className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>Información de Intercambios</h2>
          <div className={styles.exchangeStats}>
            {userData.stats.map((stat, index) => (
              <div key={index}>
                <div className={styles.exchangeStat}>
                  {stat.number} {stat.label}
                </div>
                {stat.sublabel && (
                  <div className={styles.exchangeSubtext}>{stat.sublabel}</div>
                )}
              </div>
            ))}
            <div>
              <div className={styles.exchangeStat}>Personas conocidas</div>
              <div className={styles.exchangeSubtext}>7 Personas conocidas</div>
            </div>
            <div>
              <div className={styles.exchangeStat}>Personas de Intercambio</div>
              <div className={styles.exchangeSubtext}>Instructores</div>
            </div>
          </div>
        </div>

        {/* Habilidades */}
        <div className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>Habilidades</h2>
          <div className={styles.skillsList}>
            {userData.skills.map((skill, index) => (
              <span key={index} className={styles.skillTag}>{skill}</span>
            ))}
            <span className={styles.viewMore}>Ver más</span>
          </div>
        </div>

        {/* Historial de intercambios */}
        <div className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>Historial de intercambios</h2>
          <div className={styles.exchangeItem}>
            <div className={styles.exchangeTitle}>
              {exchangeHistory[0].type}
            </div>
            <div className={styles.exchangeDescription}>
              "{exchangeHistory[0].description}"
            </div>
            <span className={styles.viewDetails}>Ver detalles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;