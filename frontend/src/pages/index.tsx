import React, { useState, useEffect } from 'react';
import { Settings, FileText, Search, Handshake, ChevronLeft, ChevronRight, Star, Router } from 'lucide-react';
import { useRouter } from "next/navigation";
import Image from 'next/image';



interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

const Inicio: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ana Martínez",
      role: "Estudiante de Diseño Gráfico",
      image: "/img/cat_profile.jpg",
      text: "transformó mi manera de aprender! Los cursos son dinámicos y los instructores realmente dominan su tema. Ahora aplico habilidades que nunca creí posible desarrollar... ¡y todo gracias a esta comunidad!",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      role: "Desarrollador Web",
      image: "/img/fox_profile.jpg",
      text: "me permitió intercambiar mis conocimientos de programación por clases de marketing digital. Una experiencia increíble que me ayudó a crecer profesionalmente.",
      rating: 5
    },
    {
      id: 3,
      name: "María González",
      role: "Profesora de Idiomas",
      image: "/img/men_profile.jpg",
      text: "me ayudó a encontrar estudiantes increíbles que me enseñaron diseño mientras yo les enseñaba inglés. Hace posible el intercambio justo de conocimientos.",
      rating: 5
    }
  ];

  const nextTestimonial = (): void => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = (): void => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number): void => {
    setCurrentTestimonial(index);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const router = useRouter();
  // Event handlers
  const handleLoginClick = (): void => {
    router.push("/login");
  };

  const handleSignupClick = (): void => {
    console.log('/registerPage');
  };

  const handleJoinClick = (): void => {
    console.log('/registerPage');
  };

  const handleHowItWorksClick = (): void => {
    console.log('How it works clicked');
  };

  const handleFindExchangeClick = (): void => {
    console.log('Find exchange clicked');
  };

  const handleLearnMoreClick = (): void => {
    console.log('Learn more about mission clicked');
  };

  const handleDiscoverGoalsClick = (): void => {
    console.log('Discover goals clicked');
  };

  return (
    <div className="swapk-landing">
      {/* Navigation */}
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
              <a href="#inicio" className="nav-link">INICIO</a>
              <a href="#trueques" className="nav-link">TRUEQUES</a>
              <a href="#comunidad" className="nav-link">COMUNIDAD</a>
              <a href="#faqs" className="nav-link">FAQ's</a>
            </div>
          </div>
          <div className="nav-right">
            <a href="./login">
            <button className="btn-secondary" onClick={handleLoginClick}>
              Iniciar Sesión
            </button>
            </a>
            <a href="./register">
            <button className="btn-primary" onClick={handleSignupClick}>
              Crea cuenta gratis
            </button>
            </a>
          </div>
        </div>
      </nav>
      {/* SECCIÓN 1: Minds Section - "¿Qué pasa cuando 2 mentes se encuentran?" */}
      <section className="minds-section">
        <div className="minds-container">
          <h2 className="minds-title">
            ¿Qué pasa cuando 2 <span className="text-blue">mentes</span> se encuentran?
          </h2>
          <p className="minds-subtitle">
            Aprende, enseña y conecta como nunca antes.
          </p>
          
          <div className="stats-container">
            <p className="stats-text">
              "Únete a 5,000+ personas que ya están<br />
              revitalizando sus habilidades."
            </p>
          </div>

          <div className="cta-buttons">
            <button className="btn-outline" onClick={handleHowItWorksClick}>
              ¿CÓMO FUNCIONA?
            </button>
            <button className="btn-primary" onClick={handleFindExchangeClick}>
              ENCUENTRA TU INTERCAMBIO
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Hero Section - "¿No puedes pagar cursos?" */}
      <section className="hero-section" id="inicio">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              ¿No puedes pagar <span className="text-blue">cursos</span>?
            </h1>
            <p className="hero-subtitle">
              Muchos como tú, tienen habilidades para intercambiar.<br />
              Aquí lo hacemos posible
            </p>
            <a href="./register">
            <button className="cta-button" onClick={handleJoinClick}>
              ÚNETE A <span className="text-gray">SWAPK</span> GRATIS
            </button>
            </a>
          </div>

          <div className="hero-features">
            <div className="feature-card">
              <div className="feature-icon">
                <FileText className="icon" />
              </div>
              <div className="feature-content">
                <h3>Registra tus <span className="text-blue">habilidades</span></h3>
                <p>(que tú ofreces y que necesitas)</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Search className="icon" />
              </div>
              <div className="feature-content">
                <h3>Encuentra a tu pareja de <span className="text-blue">intercambio</span></h3>
                <p>con nuestro buscador inteligente</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Handshake className="icon" />
              </div>
              <div className="feature-content">
                <h3>Acuerda el <span className="text-blue">intercambio</span></h3>
                <p>y aprende sin costos</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECCIÓN 3: Mission & Vision Section - "Descubre la misión y visión de Swapk" */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <h2 className="section-title">
              Descubre la misión y visión de <span className="text-bluetone">Swapk</span>
            </h2>

            <div className="mission-vision-grid">
              <div className="mission-card">
                <h3 className="card-title text-blue">NUESTRA MISIÓN</h3>
                <p className="card-text">
                  "Revolucionar la educación mediante experiencias de aprendizaje innovadoras, 
                  haciendo que el conocimiento de calidad sea accesible para todos a través del intercambio 
                  de habilidades."
                </p>
                <button className="btn-outline" onClick={handleLearnMoreClick}>
                  CONOCE CÓMO LO HACEMOS
                </button>
              </div>

              <div className="mission-card">
                <h3 className="card-title text-blue">NUESTRA VISIÓN</h3>
                <p className="card-text">
                  "Ser la red global líder en aprendizaje colaborativo, donde cada persona pueda 
                  desarrollar sus habilidades a través del intercambio, sin que el dinero sea una barrera 
                  para crecer."
                </p>
                <button className="btn-outline" onClick={handleDiscoverGoalsClick}>
                  DESCUBRE NUESTRAS METAS
                </button>
              </div>
            </div>
          </div>

          <div className="mission-illustration">
            <div className="learning-environment">
              <div className="student-workspace"></div>
              <div className="books-shelf"></div>
              <div className="learning-tools"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-avatar">
                <img 
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"} 
                  alt={testimonials[currentTestimonial].name}
                  className="avatar-image"
                />
              </div>
                <div className="quote-mark">|</div>
              <div className="testimonial-text">
                <p className="testimonial-quote">
                  "<span className="text-blue">Swapk</span> {testimonials[currentTestimonial].text}"
                </p>
                
                <div className="testimonial-author">
                  <p className="author-name">— {testimonials[currentTestimonial].name}</p>
                  <p className="author-role">{testimonials[currentTestimonial].role}</p>
                </div>

                <div className="testimonial-footer">
                  <div className="rating">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="star filled" />
                    ))}
                  </div>
                  <div className="swapk-badge">
                    <span>Sw</span><span className="text-blue">a</span><span>pk</span>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Swapk. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;
