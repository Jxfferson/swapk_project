import React, { useState, useEffect } from 'react';
import { Settings, FileText, Search, Handshake, ChevronLeft, ChevronRight, Star, Router } from 'lucide-react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import styles from '../assets/styles/inicio.module.css'; 
import navbar from '../assets/styles/navbar.module.css'; 


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
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Searching:", searchQuery);
  };

  const router = useRouter();

  const handleLoginClick = (): void => {
    router.push("/login");
  };

  const handleSignupClick = (): void => {
    router.push("/register");
  };

  const handleJoinClick = (): void => {
    router.push("/register");
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
    <div className={styles['swapk-landing']}>
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


          <div className={styles['nav-right']}>
            <button className={styles['btn-secondary']} onClick={handleLoginClick}>
              Iniciar Sesión
            </button>
            <button className={styles['btn-primary']} onClick={handleSignupClick}>
              Crea cuenta gratis
            </button>
          </div>
        </div>
      </nav>

      {/* SECCIÓN 1: Minds Section */}
      <section className={styles['minds-section']}>
        <div className={styles['minds-container']}>
          <h2 className={styles['minds-title']}>
            ¿Qué pasa cuando 2 <span className={styles['text-blue']}>mentes</span> se encuentran?
          </h2>
          <p className={styles['minds-subtitle']}>
            Aprende, enseña y conecta como nunca antes.
          </p>
          
          <div className={styles['stats-container']}>
            <p className={styles['stats-text']}>
              "Únete a 5,000+ personas que ya están<br />
              revitalizando sus habilidades."
            </p>
          </div>

          <div className={styles['cta-buttons']}>
            <button className={styles['btn-outline']} onClick={handleHowItWorksClick}>
              ¿CÓMO FUNCIONA?
            </button>
            <a href="./register">
            <button className={styles['btn-primary']} onClick={handleFindExchangeClick}>
              ENCUENTRA TU INTERCAMBIO
            </button>
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: Hero Section */}
      <section className={styles['hero-section']} id="inicio">
        <div className={styles['hero-container']}>
          <div className={styles['hero-content']}>
            <h1 className={styles['hero-title']}>
              ¿No puedes pagar <span className={styles['text-blue']}>cursos</span>?
            </h1>
            <p className={styles['hero-subtitle']}>
              Muchos como tú, tienen habilidades para intercambiar.<br />
              Aquí lo hacemos posible
            </p>
            <button className={styles['cta-button']} onClick={handleJoinClick}>
              ÚNETE A <span className={styles['text-gray']}>SWAPK</span> GRATIS
            </button>
          </div>

          <div className={styles['hero-features']}>
            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']}>
                <FileText className={styles.icon} />
              </div>
              <div className={styles['feature-content']}>
                <h3>Registra tus <span className={styles['text-blue']}>habilidades</span></h3>
                <p>(que tú ofreces y que necesitas)</p>
              </div>
            </div>

            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']}>
                <Search className={styles.icon} />
              </div>
              <div className={styles['feature-content']}>
                <h3>Encuentra a tu pareja de <span className={styles['text-blue']}>intercambio</span></h3>
                <p>con nuestro buscador inteligente</p>
              </div>
            </div>

            <div className={styles['feature-card']}>
              <div className={styles['feature-icon']}>
                <Handshake className={styles.icon} />
              </div>
              <div className={styles['feature-content']}>
                <h3>Acuerda el <span className={styles['text-blue']}>intercambio</span></h3>
                <p>y aprende sin costos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Mission & Vision Section */}
      <section className={styles['mission-section']}>
        <div className={styles['mission-container']}>
          <div className={styles['mission-content']}>
            <h2 className={styles['section-title']}>
              Descubre la misión y visión de <span className={styles['text-bluetone']}>Swapk</span>
            </h2>

            <div className={styles['mission-vision-grid']}>
              <div className={styles['mission-card']}>
                <h3 className={`${styles['card-title']} ${styles['text-blue']}`}>NUESTRA MISIÓN</h3>
                <p className={styles['card-text']}>
                  "Revolucionar la educación mediante experiencias de aprendizaje innovadoras, 
                  haciendo que el conocimiento de calidad sea accesible para todos a través del intercambio 
                  de habilidades."
                </p>
                <button className={styles['btn-outline']} onClick={handleLearnMoreClick}>
                  CONOCE CÓMO LO HACEMOS
                </button>
              </div>

              <div className={styles['mission-card']}>
                <h3 className={`${styles['card-title']} ${styles['text-blue']}`}>NUESTRA VISIÓN</h3>
                <p className={styles['card-text']}>
                  "Ser la red global líder en aprendizaje colaborativo, donde cada persona pueda 
                  desarrollar sus habilidades a través del intercambio, sin que el dinero sea una barrera 
                  para crecer."
                </p>
                <button className={styles['btn-outline']} onClick={handleDiscoverGoalsClick}>
                  DESCUBRE NUESTRAS METAS
                </button>
              </div>
            </div>
          </div>

          <div className={styles['mission-illustration']}>
            <div className={styles['learning-environment']}>
              <div className={styles['student-workspace']}></div>
              <div className={styles['books-shelf']}></div>
              <div className={styles['learning-tools']}></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: Testimonials Section */}
      <section className={styles['testimonials-section']}>
        <div className={styles['testimonials-container']}>
          <div className={styles['testimonial-card']}>
            <div className={styles['testimonial-content']}>
              <div className={styles['testimonial-avatar']}>
                <img 
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"} 
                  alt={testimonials[currentTestimonial].name}
                  className={styles['avatar-image']}
                />
              </div>
              <div className={styles['testimonial-text']}>
                <p className={styles['testimonial-quote']}>
                  <span className={styles['text-blue']}>Swapk</span> {testimonials[currentTestimonial].text}
                </p>
                
                <div className={styles['testimonial-author']}>
                  <p className={styles['author-name']}>— {testimonials[currentTestimonial].name}</p>
                  <p className={styles['author-role']}>{testimonials[currentTestimonial].role}</p>
                </div>

                <div className={styles['testimonial-footer']}>
                  <div className={styles.rating}>
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className={`${styles.star} ${styles.filled}`} />
                    ))}
                  </div>
                  <div className={styles['swapk-badge']}>
                    <span className={styles["white-text"]}>Sw</span><span className={styles['text-blue']}>a</span><span>pk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['testimonial-dots']}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentTestimonial ? styles.active : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles['footer-content']}>
          <p>© 2025 Swapk. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;