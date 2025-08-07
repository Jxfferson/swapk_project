import React, { useState, useEffect, useCallback } from 'react';
import { Settings, Search, MessageSquare, Bell, User } from 'lucide-react';
import Image from 'next/image';

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
    <div className="cursos-comunidad-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <Settings className="logo-icon" />
            </div>
            <div className="nav-links">
              <button 
                className="nav-link" 
                onClick={() => handleNavClick('inicio')}
              >
                INICIO
              </button>
              <button 
                className="nav-link" 
                onClick={() => handleNavClick('trueques')}
              >
                TRUEQUES
              </button>
              <button 
                className="nav-link active" 
                onClick={() => handleNavClick('comunidad')}
              >
                COMUNIDAD
              </button>
              <button 
                className="nav-link" 
                onClick={() => handleNavClick('faqs')}
              >
                FAQ's
              </button>
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
        <div className="content-header">
          <h1 className="page-title">Cursos de la comunidad</h1>
          <button className="create-course-btn" onClick={handleCreateCourse}>
            Crear curso
          </button>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image || "/placeholder.svg"} alt={course.title} />
                <div className="user-avatar">
                  <img src={course.userAvatar || "/placeholder.svg"} alt={course.userName} />
                  {course.isOnline && <div className="online-indicator"></div>}
                </div>
              </div>
              
              <div className="course-content">
                <div className="user-info">
                  <span className="user-name">{course.userName}</span>
                </div>
                
                <h3 className="course-title">{course.title}</h3>
                <p className="course-category">{course.category}</p>
                <p className="course-profession">{course.profession}</p>
                
                <div className="course-hashtags">
                  {course.hashtags.map((hashtag, index) => (
                    <span key={index} className="hashtag">
                      {hashtag}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="view-more-btn"
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
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando más cursos...</p>
          </div>
        )}

        {/* Call to Action Section */}
        {!hasMore && (
          <div className="cta-section">
            <div className="cta-content">
              <h2 className="cta-title">¿Muy interesante no?</h2>
              <p className="cta-subtitle">
                ¿Acaso quieres compartir cursos con los demás?
              </p>
              <button className="cta-button" onClick={handleCreateCourse}>
                Crear curso
              </button>
            </div>
            <div className="cta-illustration">
              <div className="books-stack"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CursosComunidad;
