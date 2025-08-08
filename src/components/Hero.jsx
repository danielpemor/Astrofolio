import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animaciones de entrada
    tl.fromTo('.hero-text', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo('.profile-card', 
      { opacity: 0, scale: 0.9, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power3.out" }, "-=0.7"
    )
    .fromTo('.fade-in', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.5"
    );

    // Cursor effect muy sutil
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 75,
          y: e.clientY - 75,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const whatsappNumber = "+52 777 133 3155"; // 👈 Cambia por tu número de WhatsApp
  const whatsappMessage = "Hola! Me interesa saber más sobre tus servicios de desarrollo web.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Background muy oscuro con beams sutiles */}
      <div className="absolute inset-0 bg-gray-950">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="beam1" cx="20%" cy="30%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="beam2" cx="80%" cy="70%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="beam3" cx="60%" cy="20%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0"/>
            </radialGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#beam1)"/>
          <rect width="100%" height="100%" fill="url(#beam2)"/>
          <rect width="100%" height="100%" fill="url(#beam3)"/>
          
          {/* Grid pattern muy sutil */}
          <g opacity="0.02">
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#475569" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </g>
        </svg>
      </div>

      {/* Cursor effect orgánico */}
      <div 
        ref={cursorRef}
        className="fixed w-32 h-32 pointer-events-none z-10"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full bg-gradient-to-r from-blue-500/8 via-slate-400/5 to-green-500/8 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 py-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Texto promocional */}
          <div className="hero-text text-white order-2 lg:order-1">
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Desarrollo Soluciones
              <span className="bg-gradient-to-r from-blue-400 via-slate-300 to-green-400 bg-clip-text text-transparent block">
                Que Generan Resultados
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium mb-6 text-slate-300 leading-relaxed">
              Especialista en sistemas empresariales complejos y automatización inteligente que impulsan el crecimiento real
            </p>

            <p className="text-lg mb-8 text-slate-400 leading-relaxed">
              Transformo ideas en aplicaciones web potentes y escalables. Desde sistemas de reservas automatizados hasta landing pages de alto impacto que convierten visitantes en clientes.
            </p>

            {/* Tech stack oscuro */}
            <div className="mb-8">
              <p className="text-slate-500 mb-4 font-medium">Stack tecnológico:</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'React', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20' },
                  { name: 'Next.js', color: 'bg-gray-500/10 border-gray-500/20 text-gray-300 hover:bg-gray-500/20' },
                  { name: 'Node.js', color: 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20' },
                  { name: 'Python', color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20' },
                  { name: 'MongoDB', color: 'bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20' },
                  { name: 'Directus', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20' }
                ].map((tech) => (
                  <span 
                    key={tech.name} 
                    className={`${tech.color} border px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer hover:scale-105`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-600/25 hover:scale-105 transition-all duration-300"
              >
                Ver Proyectos
              </button>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:shadow-green-600/25 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Contactar Ahora
              </a>
            </div>
          </div>

          {/* Profile Card minimalista */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="profile-card bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-black/30">
              
              {/* Foto de perfil */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img 
                    src="/images/image.png" // 👈 Cambia por tu imagen
                    alt="Full Stack Developer" 
                    className="w-40 h-50 rounded-3xl object-cover mx-auto shadow-2xl border-2 border-slate-700"
                  />
                </div>
              </div>

              {/* Información principal */}
              <div className="text-center mb-8">
                <h2 className="fade-in text-3xl font-bold text-white mb-2">
                  H. Daniel Pérez Morales
                </h2>
                <p className="fade-in text-slate-400 text-lg font-medium mb-6">
                  Full Stack Developer
                </p>
                <p className="fade-in text-slate-500 text-sm leading-relaxed">
                  Especialista en automatización empresarial y desarrollo de landing pages de alto impacto.
                </p>
              </div>

              {/* Estado online */}
              <div className="fade-in flex items-center justify-center gap-3 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-400 text-sm font-medium">danielpemor123@gmail.com</span>
                </div>
                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                <span className="text-green-400 text-sm font-medium">Disponible</span>
              </div>

              {/* Stats */}
              <div className="fade-in grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="text-xl font-bold text-blue-400">3+</div>
                  <div className="text-xs text-slate-500">Años</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="text-xl font-bold text-green-400">10+</div>
                  <div className="text-xs text-slate-500">Proyectos</div>
                </div>
                <div className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="text-xl font-bold text-purple-400">100%</div>
                  <div className="text-xs text-slate-500">Éxito</div>
                </div>
              </div>

              {/* Botón de contacto principal - WhatsApp */}
              <div className="fade-in text-center">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30 hover:scale-[1.02] mb-4 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Contactar por WhatsApp
                </a>
                
                {/* Enlaces sociales */}
                <div className="flex justify-center gap-4">
                  <a 
                    href="mailto:tu-email@ejemplo.com" 
                    className="text-slate-500 hover:text-blue-400 transition-colors p-2"
                    title="Email"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/daniel-perez-8007b3328/" 
                    className="text-slate-500 hover:text-blue-400 transition-colors p-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://github.com/tu-usuario" 
                    className="text-slate-500 hover:text-green-400 transition-colors p-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botón scroll down */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;