import React, { useState, useEffect, useCallback } from 'react';
import { Settings, Search, MessageSquare, Bell, User } from 'lucide-react';
import Image from 'next/image';
import styles from "../assets/styles/community_courses.module.css";

interface Course {
  id: number;
  title: string;
  category: string;
  profession: string;
  image: string;
  userAvatar: string;
  userName: string;
  hashtags: string[];
  isOnline: boolean;
}

const CursosComunidad: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Datos de ejemplo para los cursos
  const generateCourses = (startId: number, count: number): Course[] => {
    const courseImages = [
      '/placeholder.svg?height=200&width=300&text=Workspace',
      '/placeholder.svg?height=200&width=300&text=Flower',
      '/placeholder.svg?height=200&width=300&text=Collage',
      '/placeholder.svg?height=200&width=300&text=Nature',
      '/placeholder.svg?height=200&width=300&text=Ocean',
      '/placeholder.svg?height=200&width=300&text=Books'
    ];

    const categories = ['Software Engineer', 'Diseño Gráfico', 'Marketing Digital', 'Fotografía', 'Idiomas'];
    const professions = ['Profesión', 'Estudiante', 'Freelancer', 'Instructor'];

    return Array.from({ length: count }, (_, index) => ({
      id: startId + index,
      title: 'Conceptos básicos de inglés',
      category: categories[Math.floor(Math.random() * categories.length)],
      profession: professions[Math.floor(Math.random() * professions.length)],
      image: courseImages[Math.floor(Math.random() * courseImages.length)],
      userAvatar: '/placeholder.svg?height=40&width=40&text=U',
      userName: 'Usuario',
      hashtags: ['#phrasalverbs', '#DevSr'],
      isOnline: Math.random() > 0.5
    }));
  };

  // Cargar cursos iniciales
  useEffect(() => {
    const initialCourses = generateCourses(1, 6);
    setCourses(initialCourses);
  }, []);

  // Función para cargar más cursos
  const loadMoreCourses = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simular delay de carga
    setTimeout(() => {
      const newCourses = generateCourses(courses.length + 1, 6);
      setCourses(prev => [...prev, ...newCourses]);
      setLoading(false);
      
      // Simular que no hay más cursos después de 30
      if (courses.length >= 24) {
        setHasMore(false);
      }
    }, 1000);
  }, [courses.length, loading, hasMore]);

  // Detectar scroll para cargar más cursos
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        loadMoreCourses();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreCourses]);

  // Event handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching:', searchQuery);
  };

  const handleCreateCourse = () => {
    console.log('Create course clicked');
  };

  const handleViewMore = (courseId: number) => {
    console.log('View more clicked for course:', courseId);
  };

  const handleNavClick = (section: string) => {
    console.log('Navigation clicked:', section);
  };

  const handleMessageClick = () => {
    console.log('Messages clicked');
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleProfileClick = () => {
    console.log('Profile clicked');
  };

  return (
    <div className={styles['cursos-comunidad-page']}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles['nav-container']}>
          <div className={styles['nav-left']}>
            <div className={styles['logo-container']}>
              <Image 
                src="/img/logoswapk.png"
                alt="Logo Swapk"
                width={35}
                height={35}
                className={styles.logo}
              />
            </div>
            <div className={styles['nav-links']}>
              <a href="#inicio" className={styles['nav-link']}>INICIO</a>
              <a href="#trueques" className={styles['nav-link']}>TRUEQUES</a>
              <a href="#comunidad" className={styles['nav-link']}>COMUNIDAD</a>
              <a href="#faqs" className={styles['nav-link']}>FAQ's</a>
            </div>
          </div>
          
          <div className={styles['nav-center']}>
            <form onSubmit={handleSearch} className={styles['search-form']}>
              <input
                type="text"
                placeholder="¿Qué aprenderás hoy?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles['search-input']}
              />
              <button type="submit" className={styles['search-button']}>
                <Search className={styles['search-icon']} />
              </button>
            </form>
          </div>

          <div className={styles['nav-right']}>
            <button className={`${styles['nav-icon-btn']} ${styles['message-btn']}`} onClick={handleMessageClick}>
              <MessageSquare className={styles['nav-icon']} />
            </button>
            <button className={`${styles['nav-icon-btn']} ${styles['notification-btn']}`} onClick={handleNotificationClick}>
              <Bell className={styles['nav-icon']} />
              <span className={styles['notification-dot']}></span>
            </button>
            <button className={`${styles['nav-icon-btn']} ${styles['profile-btn']}`} onClick={handleProfileClick}>
              <User className={styles['nav-icon']} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className={styles['main-content']}>
        <div className={styles['content-header']}>
          <h1 className={styles['page-title']}>Cursos de la comunidad</h1>
          <button className={styles['create-course-btn']} onClick={handleCreateCourse}>
            Crear curso
          </button>
        </div>

        {/* Courses Grid */}
        <div className={styles['courses-grid']}>
          {courses.map((course) => (
            <div key={course.id} className={styles['course-card']}>
              <div className={styles['course-image']}>
                <img src={course.image || "/placeholder.svg"} alt={course.title} />
                <div className={styles['user-avatar']}>
                  <img src={course.userAvatar || "/placeholder.svg"} alt={course.userName} />
                  {course.isOnline && <div className={styles['online-indicator']}></div>}
                </div>
              </div>
              
              <div className={styles['course-content']}>
                <div className={styles['user-info']}>
                  <span className={styles['user-name']}>{course.userName}</span>
                </div>
                
                <h3 className={styles['course-title']}>{course.title}</h3>
                <p className={styles['course-category']}>{course.category}</p>
                <p className={styles['course-profession']}>{course.profession}</p>
                
                <div className={styles['course-hashtags']}>
                  {course.hashtags.map((hashtag, index) => (
                    <span key={index} className={styles.hashtag}>
                      {hashtag}
                    </span>
                  ))}
                </div>
                
                <button 
                  className={styles['view-more-btn']}
                  onClick={() => handleViewMore(course.id)}
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className={styles['loading-container']}>
            <div className={styles['loading-spinner']}></div>
            <p>Cargando más cursos...</p>
          </div>
        )}

        {/* Call to Action Section */}
        {!hasMore && (
          <div className={styles['cta-section']}>
            <div className={styles['cta-content']}>
              <h2 className={styles['cta-title']}>¿Muy interesante no?</h2>
              <p className={styles['cta-subtitle']}>
                ¿Acaso quieres compartir cursos con los demás?
              </p>
              <button className={styles['cta-button']} onClick={handleCreateCourse}>
                Crear curso
              </button>
            </div>
            <div className={styles['cta-illustration']}>
              <div className={styles['books-stack']}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CursosComunidad;