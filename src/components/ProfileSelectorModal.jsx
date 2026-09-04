import React from "react";
import { motion } from "framer-motion";

export default function ProfileSelectorModal({ onSelectProfile }) {
  return (
    <div className="fixed inset-0 z-[100000] bg-[#050b14]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans-modern">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-emerald-500/10 text-white relative overflow-hidden"
      >
        {/* Subtle background glow highlights */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Bienvenido al Portafolio
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading-modern tracking-tight text-white mb-3">
            ¿Cómo deseas explorar mi Portafolio?
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Selecciona la experiencia visual que mejor se adapte a lo que buscas. Puedes cambiar tu elección en cualquier momento.
          </p>
        </div>

        {/* Profile Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Card Option 1: Non-Technical Profile */}
          <motion.div
            whileHover={{ scale: 1.02, translateY: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectProfile("non-technical")}
            className="group cursor-pointer rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider rounded-bl-xl font-heading-modern">
              Recomendado
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                👔
              </div>
              <h2 className="text-2xl font-bold font-heading-modern text-white mb-2 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                Perfil No Técnico
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Diseñado para reclutadores, managers y visitantes en general. Presentación moderna, ejecutiva, elegante e intuitiva con proyectos, habilidades e impacto profesional.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-bold">✓</span> Diseño moderno y cristalino (Glassmorphic)
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-bold">✓</span> Métricas claras, proyectos e impacto de software
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-emerald-400 font-bold">✓</span> Asistente interactivo de contacto y carrera
                </div>
              </div>
            </div>

            <button className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
              <span>Ingresar como Perfil No Técnico</span>
              <span>→</span>
            </button>
          </motion.div>

          {/* Card Option 2: Technical Profile (Arch Linux BowisWM) */}
          <motion.div
            whileHover={{ scale: 1.02, translateY: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectProfile("technical")}
            className="group cursor-pointer rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 hover:border-cyan-400 p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform">
                💻
              </div>
              <h2 className="text-2xl font-bold font-heading-modern text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                Perfil Técnico
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Experiencia inmersiva en entorno Arch Linux (BowisWM Tiling WM). Consola interactiva CLI, CRT scanlines, pacman packages y telemetría de sistemas.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-cyan-400 font-bold">✓</span> Simulador de Tiling Window Manager (Hyprland)
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-cyan-400 font-bold">✓</span> Terminal interactiva Zsh con comandos y Matrix rain
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="text-cyan-400 font-bold">✓</span> Neofetch y telemetría de IA vanguardista
                </div>
              </div>
            </div>

            <button className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/40 font-bold text-sm transition-colors flex items-center justify-center gap-2 group-hover:border-cyan-400">
              <span>Ingresar como Perfil Técnico</span>
              <span>⚡</span>
            </button>
          </motion.div>
        </div>

        {/* Footer text */}
        <div className="mt-8 text-center text-slate-500 text-xs relative z-10">
          💡 Alejandro Andrade — Portafolio de Ingeniero de Software • Puedes cambiar de modo en la barra superior en cualquier momento.
        </div>
      </motion.div>
    </div>
  );
}
