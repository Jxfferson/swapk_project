"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Settings,
  Search,
  MessageSquare,
  Bell,
  User,
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  TrendingUp,
  Award,
  LogOut,
  HelpCircle
} from "lucide-react";
import styles from "../assets/styles/primary_dashboard.module.css"; // Importa el CSS Module
import navbar from "../assets/styles/navbar.module.css"; 
import Image from 'next/image';


interface Post {
  id: number;
  user: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  community: string;
  timeAgo: string;
  title: string;
  content: string;
  image?: string;
  votes: number;
  comments: number;
  category: "exchange" | "course" | "question" | "achievement";
  tags: string[];
}

interface Community {
  name: string;
  members: string;
  icon: string;
  category: string;
}

const Dashboard: React.FC = () => {
const [posts, setPosts] = useState<Post[]>([]);
const [searchQuery, setSearchQuery] = useState<string>("");
const [selectedFilter, setSelectedFilter] = useState<string>("all");
const [profileMenuOpen, setProfileMenuOpen] = useState(false);

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



  // Datos de ejemplo para las publicaciones
  const samplePosts: Post[] = [
    {
      id: 1,
      user: {
        name: "María González",
        avatar: "",
        isVerified: true,
      },
      community: "IntercambioIdiomas",
      timeAgo: "2 horas",
      title: "¡Intercambio exitoso! Inglés por Diseño Gráfico",
      content:
        "Acabo de terminar mi primer intercambio en Swapk y fue increíble. Enseñé inglés conversacional durante 3 semanas y a cambio aprendí los fundamentos de Photoshop e Illustrator. Mi compañero de intercambio fue súper paciente y profesional. ¿Alguien más ha tenido experiencias similares?",
      image: "",
      votes: 24,
      comments: 8,
      category: "exchange",
      tags: ["#inglés", "#diseño", "#photoshop"],
    },
    {
      id: 2,
      user: {
        name: "Carlos Rodríguez",
        avatar: "",
        isVerified: false,
      },
      community: "ProgramaciónPython",
      timeAgo: "4 horas",
      title: "Busco intercambio: Python por Marketing Digital",
      content:
        "Hola comunidad! Soy desarrollador Python con 3 años de experiencia y me gustaría aprender marketing digital, especialmente SEO y Google Ads. Puedo enseñar desde lo básico hasta conceptos avanzados como Django y Flask. ¿Hay algún experto en marketing interesado?",
      votes: 15,
      comments: 12,
      category: "exchange",
      tags: ["#python", "#marketing", "#seo"],
    },
    {
      id: 3,
      user: {
        name: "Ana Martínez",
        avatar: "",
        isVerified: true,
      },
      community: "CursosGratuitos",
      timeAgo: "6 horas",
      title: "Nuevo curso: Fundamentos de UX/UI Design",
      content:
        "¡Hola diseñadores! He creado un curso completo sobre los fundamentos del diseño UX/UI. Incluye teoría, ejercicios prácticos y un proyecto final. El curso está disponible para intercambio por clases de fotografía o edición de video.",
      image: "/placeholder.svg?height=250&width=400&text=Curso+UX/UI",
      votes: 42,
      comments: 18,
      category: "course",
      tags: ["#ux", "#ui", "#diseño"],
    },
  ];

  // Comunidades populares
  const popularCommunities: Community[] = [
    { name: "IntercambioIdiomas", members: "45.2k", icon: "🗣️", category: "Idiomas" },
    { name: "ProgramaciónPython", members: "38.1k", icon: "🐍", category: "Tecnología" },
    { name: "DiseñoGráfico", members: "29.8k", icon: "🎨", category: "Diseño" },
    { name: "CursosGratuitos", members: "52.3k", icon: "📚", category: "Educación" },
    { name: "MarketingDigital", members: "31.7k", icon: "📈", category: "Marketing" },
    { name: "FotografíaBásica", members: "24.9k", icon: "📸", category: "Arte" },
  ];

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

  // Event handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching:", searchQuery);
  };

  const handleVote = (postId: number, direction: "up" | "down") => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, votes: direction === "up" ? post.votes + 1 : post.votes - 1 } : post
      )
    );
  };

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredPosts = selectedFilter === "all" ? posts : posts.filter((post) => post.category === selectedFilter);
  return (
    <div className={navbar["dashboard-page"]}>
      {/* Navigation */}
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

      <div className={styles["main-container"]}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles["sidebar-content"]}>
            <div className={styles["sidebar-section"]}>
              <div className={`${styles["sidebar-item"]} ${styles.active}`}>
                <div className={styles["sidebar-icon"]}>🏠</div>
                <span>Inicio</span>
              </div>
              <div className={styles["sidebar-item"]}>
                <div className={styles["sidebar-icon"]}>🔥</div>
                <span>Popular</span>
              </div>
              <div className={styles["sidebar-item"]}>
                <div className={styles["sidebar-icon"]}>🔄</div>
                <span>Nuevos intercambios</span>
              </div>
              <div className={styles["sidebar-item"]}>
                <div className={styles["sidebar-icon"]}>📚</div>
                <span>Recomendados para ti</span>
              </div>
            </div>

            <div className={styles["sidebar-divider"]}></div>

            <div className={styles["sidebar-section"]}>
              <h3 className={styles["sidebar-title"]}>TEMAS</h3>
              <div className={styles["sidebar-item"]}>
                <div className={styles["sidebar-icon"]}>💻</div>
                <span>Tecnología</span>
              </div>
              <div className={styles["sidebar-item"]}>
                <div className={styles["sidebar-icon"]}>🎨</div>
                <span>Diseño</span>
              </div>
              <div className={styles["sidebar-item"]}>
                <div className={styles["sidebar-icon"]}>🗣️</div>
                <span>Idiomas</span>
              </div>
              <div className={styles["sidebar-item"]}>
                <div className={styles["sidebar-icon"]}>📈</div>
                <span>Marketing</span>
              </div>
              <div className={styles["sidebar-item"]}>
                <div className={styles["sidebar-icon"]}>📸</div>
                <span>Fotografía</span>
              </div>

              <div className={styles["sidebar-divider"]}></div>

              <h3 className={styles["sidebar-title"]}>Otras opciones</h3>

                <div className={styles["sidebar-item"]}>
                <LogOut className={navbar.dropdownIcon} />
                <span>Cerrar sesión</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles["main-content"]}>
          {/* Filter Tabs */}
          <div className={styles["filter-tabs"]}>
            <button
              className={`${styles["filter-tab"]} ${selectedFilter === "all" ? styles.active : ""}`}
              onClick={() => handleFilter("all")}
            >
              Todo
            </button>
            <button
              className={`${styles["filter-tab"]} ${selectedFilter === "exchange" ? styles.active : ""}`}
              onClick={() => handleFilter("exchange")}
            >
              Intercambios
            </button>
            <button
              className={`${styles["filter-tab"]} ${selectedFilter === "course" ? styles.active : ""}`}
              onClick={() => handleFilter("course")}
            >
              Cursos
            </button>
            <button
              className={`${styles["filter-tab"]} ${selectedFilter === "question" ? styles.active : ""}`}
              onClick={() => handleFilter("question")}
            >
              Preguntas
            </button>
            <button
              className={`${styles["filter-tab"]} ${selectedFilter === "achievement" ? styles.active : ""}`}
              onClick={() => handleFilter("achievement")}
            >
              Logros
            </button>
          </div>

          {/* Posts Feed */}
          <div className={styles["posts-feed"]}>
            {filteredPosts.map((post) => (
              <article key={post.id} className={styles["post-card"]}>

                <div className={styles["post-content"]}>
                  <div className={styles["post-header"]}>
                    <div className={styles["post-meta"]}>
                      <img src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} className={styles["user-avatar"]} />
                      <span className={styles["community-name"]}>{post.community}</span>
                      <span className={styles["post-separator"]}>•</span>
                      <span className={styles["post-time"]}>hace {post.timeAgo}</span>
                    </div>
                    <button className={styles["post-menu"]}>
                      <MoreHorizontal className={styles["menu-icon"]} />
                    </button>
                  </div>

                  <h2 className={styles["post-title"]}>{post.title}</h2>
                  <p className={styles["post-text"]}>{post.content}</p>

                  <div className={styles["post-tags"]}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className={styles["post-tag"]}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles["post-actions"]}>
                    <button className={styles["action-btn"]}>
                      <MessageCircle className={styles["action-icon"]} />
                      <span>{post.comments} comentarios</span>
                    </button>
                    <button className={styles["action-btn"]}>
                      <Share2 className={styles["action-icon"]} />
                      <span>Compartir</span>
                    </button>
                    <button className={styles["action-btn"]}>
                      <Bookmark className={styles["action-icon"]} />
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className={styles["right-sidebar"]}>
          <div className={styles.widget}>
            <h3 className={styles["widget-title"]}>
              <TrendingUp className={styles["widget-icon"]} />
              Cursos
            </h3>
            <div className={styles["communities-list"]}>
              {popularCommunities.map((community, index) => (
                <div key={index} className={styles["community-item"]}>
                  <div className={styles["community-info"]}>
                    <span className={styles["community-icon"]}>{community.icon}</span>
                    <div className={styles["community-details"]}>
                      <span className={styles["community-name"]}>{community.name}</span>
                      <span className={styles["community-members"]}>{community.members} miembros</span>
                    </div>
                  </div>
                  <button className={styles["join-btn"]}>Unirse</button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.widget}>
            <h3 className={styles["widget-title"]}>
              <Award className={styles["widget-icon"]} />
              Tus Estadísticas
            </h3>
            <div className={styles["stats-grid"]}>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>5</span>
                <span className={styles["stat-label"]}>Intercambios</span>
              </div>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>12</span>
                <span className={styles["stat-label"]}>Cursos</span>
              </div>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>4.8</span>
                <span className={styles["stat-label"]}>Rating</span>
              </div>
              <div className={styles["stat-item"]}>
                <span className={styles["stat-number"]}>23</span>
                <span className={styles["stat-label"]}>Conexiones</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default Dashboard;
