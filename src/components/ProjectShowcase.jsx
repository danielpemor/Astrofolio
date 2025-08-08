import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = ({ project, index }) => {
  const projectRef = useRef(null);
  const videoRef = useRef(null);
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const el = projectRef.current;
    
    if (el && typeof window !== 'undefined') {
      gsap.fromTo(el, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95 
        },
        {
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      const timer = setTimeout(() => {
        setShowEnhanced(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [project]);

  const isEven = index % 2 === 0;
  
  // Determinar si es video o imagen
  const hasVideo = project.videoUrl && project.videoUrl.trim() !== '';

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const togglePlayPause = (e) => {
    e.preventDefault(); // Evitar que navegue al link
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div 
      ref={projectRef} 
      className="mb-20"
    >
      <div className={`bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl shadow-black/20 p-8 hover:shadow-3xl hover:shadow-black/30 transition-all duration-500 hover:-translate-y-2 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
        
        <div className={`relative group ${!isEven ? 'lg:col-start-2' : ''}`}>
          {/* Browser mockup */}
          <div className="relative bg-slate-900 rounded-2xl border border-slate-600/50 shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            
            {/* Browser bar */}
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-3 border-b border-slate-600/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full opacity-80"></div>
              </div>
              <div className="ml-4 bg-slate-700 rounded-lg px-4 py-2 text-slate-300 text-xs font-mono flex-1 max-w-xs truncate">
                {project.link.replace('https://', '')}
              </div>
              <div className="flex gap-2">
                <div className="w-4 h-4 bg-slate-700 rounded opacity-60"></div>
                <div className="w-4 h-4 bg-slate-700 rounded opacity-60"></div>
              </div>
            </div>

            {/* Content area - Clickeable */}
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative h-80 lg:h-96 overflow-hidden bg-slate-800 cursor-pointer"
            >
              
              <div className="relative h-full p-4">
                <div className="h-full bg-slate-700 rounded-xl overflow-hidden shadow-lg border border-slate-600/30 group-hover:border-slate-500/50 transition-all duration-500">
                  
                  {hasVideo ? (
                    // Video para proyectos que lo tengan
                    <div className="relative w-full h-full">
                      <video
                        ref={videoRef}
                        src={project.videoUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        autoPlay
                        onLoadedData={handleVideoLoad}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                      
                      {/* Controles de video personalizados */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={togglePlayPause}
                          className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 z-10"
                          title={isPlaying ? 'Pausar video' : 'Reproducir video'}
                        >
                          {isPlaying ? (
                            // Icono pausa
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                            </svg>
                          ) : (
                            // Icono play
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Imagen para proyectos sin video
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110"
                    />
                  )}

                  {/* Indicador "DEMO EN VIVO" para ambos */}
                  <div className="absolute top-3 left-3">
                    <div className="bg-red-600/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-medium">DEMO EN VIVO</span>
                    </div>
                  </div>
                  
                  {/* Overlay común con información del proyecto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                        <h4 className="text-white text-lg font-bold mb-2">{project.title}</h4>
                        <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2 flex-wrap">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <span key={idx} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-medium border border-blue-400/30">
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-slate-400 text-xs self-center">
                                +{project.technologies.length - 3} más
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-2">
                            <span className="text-xs text-slate-400">
                              {hasVideo ? '🎥' : '📸'}
                            </span>
                            <span className="text-xs text-blue-300 font-medium">
                              Hacer clic para visitar
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* Status bar limpio */}
            <div className="bg-slate-800/90 px-4 py-2 flex items-center justify-between border-t border-slate-600/50">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className={`w-2 h-2 rounded-full ${hasVideo ? 'bg-red-400 animate-pulse' : 'bg-blue-400'}`}></div>
                {hasVideo ? 'Demo interactivo' : 'Captura del sitio'}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500">
                  {project.type}
                </span>
                <span className="text-xs text-blue-400">
                  Clic para visitar →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del proyecto */}
        <div className={`space-y-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
          <div>
            <span className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
              {project.type}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {project.title}
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          <div className="bg-slate-700/40 border border-slate-600/50 rounded-xl p-5">
            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
              💡 Solución Implementada
            </h3>
            <p className="text-slate-300 leading-relaxed">{project.challengeSolved}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              ✨ Resultados Entregados
            </h3>
            <ul className="space-y-3">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-300">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              🛠️ Tecnologías Utilizadas
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="bg-slate-700/50 border border-slate-600/50 hover:bg-blue-600 hover:border-blue-500 hover:text-white text-slate-300 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Métricas de impacto */}
          {project.metrics && (
            <div className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                📊 Métricas de Impacto
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="text-xl font-bold text-blue-400">{value}</div>
                    <div className="text-xs text-slate-400 capitalize mt-1">{key.replace('_', ' ')}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA principal */}
          <div className="pt-6 border-t border-slate-700/50">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-1 transition-all duration-300 w-full justify-center lg:w-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Visitar Sitio Web
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;