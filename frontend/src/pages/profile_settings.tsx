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
import styles from "../assets/styles/profile_settings.module.css";

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
    <div className={styles.profileSettingsPage}>
      {/* Header Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.navLeft}>
            <div className={styles.logoContainer}>
              <Image 
                src="/img/logoswapk.png"
                alt="Logo Swapk"
                width={35}
                height={35}
                className={styles.logo}
              />
            </div>
            <div className={styles.navLinks}>
              <a href="#inicio" className={styles.navLink}>
                INICIO
              </a>
              <a href="#trueques" className={styles.navLink}>
                TRUEQUES
              </a>
              <a href="#comunidad" className={styles.navLink}>
                COMUNIDAD
              </a>
              <a href="#faqs" className={styles.navLink}>
                FAQ's
              </a>
            </div>
          </div>

          <div className={styles.navCenter}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="¿Qué aprenderás hoy?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                <Search className={styles.searchIcon} />
              </button>
            </form>
          </div>

          <div className={styles.navRight}>
            <button className={`${styles.navIconBtn} ${styles.messageBtn}`}>
              <MessageSquare className={styles.navIcon} />
            </button>
            <button className={`${styles.navIconBtn} ${styles.notificationBtn}`}>
              <Bell className={styles.navIcon} />
              <span className={styles.notificationDot}></span>
            </button>
            <button
              className={`${styles.navIconBtn} ${styles.profileBtn}`}
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              <User className={styles.navIcon} />
            </button>
            {profileMenuOpen && (
              <div className={styles.profileDropdown} ref={dropdownRef}>
                <div className={styles.dropdownItem}>
                  <User className={styles.dropdownIcon} />
                  <span>Cuenta</span>
                </div>
                <div className={styles.dropdownItem}>
                  <HelpCircle className={styles.dropdownIcon} />
                  <span>Soporte</span>
                </div>
                <a href="./profile_settings">
                  <div className={styles.dropdownItem}>
                    <Settings className={styles.dropdownIcon} />
                    <span>Ajustes</span>
                  </div>
                </a>
                <div className={styles.dropdownSeparator}></div>
                <div className={`${styles.dropdownItem} ${styles.changeAccount}`}>
                  <User className={styles.dropdownIcon} />
                  <span>Cambiar cuenta</span>
                </div>
                <a href="./login">
                  <div className={`${styles.dropdownItem} ${styles.logout}`}>
                    <LogOut className={styles.dropdownIcon} />
                    <span>Cerrar sesión</span>
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className={styles.profileLayout}>
        {/* Sidebar */}
        <aside className={styles.profileSidebar}>
          <div className={styles.sidebarHeader}>
            <Settings className={styles.sidebarIcon} />
            <span className={styles.sidebarTitle}>Ajustes</span>
          </div>
          
          <div className={styles.sidebarSection}>
            <h3 className={styles.sectionTitle}>Configuración de mi cuenta</h3>
            <ul className={styles.sidebarMenu}>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Cambiar correo electrónico</a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Cambiar contraseña</a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Eliminar cuenta</a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Notificaciones</a>
              </li>
            </ul>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sectionTitle}>Preferencias de la plataforma</h3>
            <ul className={styles.sidebarMenu}>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Idioma</a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Tema: Claro / Oscuro</a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Modalidad preferida</a>
              </li>
            </ul>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sectionTitle}>Privacidad y seguridad</h3>
            <ul className={styles.sidebarMenu}>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Quién puede ver tu perfil</a>
              </li>
            </ul>
          </div>

          <div className={styles.sidebarSection}>
            <h3 className={styles.sectionTitle}>Certificaciones y validaciones</h3>
            <ul className={styles.sidebarMenu}>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Subir o actualizar logros</a>
              </li>
              <li className={styles.menuItem}>
                <a href="#" className={styles.menuLink}>Ver estado de verificación de habilidades</a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.profileMain}>
          <div className={styles.mainHeader}>
            <h1 className={styles.pageTitle}>Editar perfil</h1>
            <button className={styles.saveButton} onClick={handleSaveChanges}>
              Guardar Cambios
            </button>
          </div>

          <div className={styles.profileCard}>
            {/* Profile Header */}
            <div className={styles.profileHeaderSection}>
              <div className={styles.logoGato}>
                <Image 
                  src="/img/cat_profile.jpg"
                  alt="Logo Swapk"
                  width={90}
                  height={90}
                  className={styles.logoGato}
                />
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.profileUsername}>{userData.username}</h2>
                <p className={styles.profileFullname}>{userData.fullName}</p>
              </div>
              <button className={styles.changeNameButton} onClick={handleChangeName}>
                Cambiar nombre
              </button>
            </div>

            {/* Description Section */}
            <div className={styles.descriptionSection}>
              <label className={styles.formLabel}>Descripción</label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Escribe una descripción sobre ti..."
                className={styles.descriptionTextarea}
                maxLength={maxDescriptionLength}
              />
              <div className={styles.characterCounter}>
                {description.length}/{maxDescriptionLength}
              </div>
            </div>

            {/* Personal Data Section */}
            <div className={styles.personalDataSection}>
              <h3 className={styles.sectionHeader}>Datos personales</h3>
              <div className={styles.dataItems}>
                <div className={styles.dataItem}>
                  <div className={styles.dataItemLeft}>
                    <Mail className={styles.dataIcon} />
                    <div className={styles.dataContent}>
                      <span className={styles.dataLabel}>Correo electrónico</span>
                      <span className={styles.dataValue}>{userData.email}</span>
                    </div>
                  </div>
                  <button className={styles.editButton} onClick={handleEditEmail}>
                    <ChevronRight className={styles.editIcon} />
                  </button>
                </div>

                <div className={styles.dataItem}>
                  <div className={styles.dataItemLeft}>
                    <Phone className={styles.dataIcon} />
                    <div className={styles.dataContent}>
                      <span className={styles.dataLabel}>Número de teléfono</span>
                      <span className={styles.dataValue}>{userData.phone}</span>
                    </div>
                  </div>
                  <button className={styles.editButton} onClick={handleEditPhone}>
                    <ChevronRight className={styles.editIcon} />
                  </button>
                </div>

                <div className={styles.dataItem}>
                  <div className={styles.dataItemLeft}>
                    <MapPin className={styles.dataIcon} />
                    <div className={styles.dataContent}>
                      <span className={styles.dataLabel}>Ubicación</span>
                      <span className={styles.dataValue}>{userData.location}</span>
                      <span className={styles.dataExtra} onClick={handleViewMore}>
                        Ver más...
                      </span>
                    </div>
                  </div>
                  <button className={styles.editButton} onClick={handleEditLocation}>
                    <ChevronRight className={styles.editIcon} />
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