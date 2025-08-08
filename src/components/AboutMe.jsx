import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = ({ skills, stats }) => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const el = aboutRef.current;
    
    if (el && typeof window !== 'undefined') {
      gsap.fromTo(el.querySelectorAll('.fade-in'), 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={aboutRef} className="py-20 bg-gray-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Foto y datos personales */}
          <div className="fade-in text-center lg:text-left">
            <div className="relative inline-block mb-6">
              <img 
                src="/images/profile.jpg" 
                alt="Desarrollador Full Stack" 
                className="w-64 h-64 rounded-full object-cover shadow-2xl shadow-black/50 mx-auto lg:mx-0 border-4 border-slate-700"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-green-600 text-white p-3 rounded-full shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Desarrollador Full Stack
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Especializado en crear soluciones web robustas que resuelven problemas reales de negocio. 
              Experiencia en sistemas de gestión empresarial, landing pages de alto impacto y automatización de procesos.
            </p>
            
            {/* Stats mejoradas con tema oscuro */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-blue-400">{stats.years_experience}</div>
                <div className="text-sm text-slate-400">Años Experiencia</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-green-400">{stats.projects_completed}</div>
                <div className="text-sm text-slate-400">Proyectos</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-purple-400">{stats.technologies_mastered}</div>
                <div className="text-sm text-slate-400">Tecnologías</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700/50 rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-cyan-400">{stats.response_time}</div>
                <div className="text-sm text-slate-400">Respuesta</div>
              </div>
            </div>
          </div>

          {/* Skills con tema oscuro */}
          <div className="fade-in space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Stack Tecnológico</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    🎨 Frontend Development
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill, idx) => (
                      <span key={idx} className="bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  