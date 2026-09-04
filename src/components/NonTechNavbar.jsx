import React, { useState, useEffect } from "react";
import avatar from "../assets/hacker_avatar.png";

export default function NonTechNavbar({ onSwitchProfile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Inicio", targetId: "inicio" },
    { name: "Sobre Mí", targetId: "sobre-mi" },
    { name: "Habilidades", targetId: "habilidades" },
    { name: "Proyectos", targetId: "proyectos" },
    { name: "Asistente IA", targetId: "asistente" },
    { name: "Contacto", targetId: "contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans-modern ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#inicio"
          onClick={(e) => handleScrollTo(e, "inicio")}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-emerald-500/30 overflow-hidden group-hover:border-emerald-400 transition-colors p-0.5 shadow-md">
            <img
              src={avatar}
              alt="Alejandro Andrade"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold font-heading-modern text-white text-base tracking-tight group-hover:text-emerald-400 transition-colors">
              Alejandro Andrade
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold tracking-wide">
              Software Engineer & AI Vanguard
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleScrollTo(e, link.targetId)}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchProfile}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 text-cyan-400 hover:bg-cyan-950/40 text-xs font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-cyan-500/20 cursor-pointer"
            title="Cambiar al entorno técnico interactivo Arch Linux WM"
          >
            <span className="text-sm">💻</span>
            <span className="hidden sm:inline">Perfil Técnico</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-2 backdrop-blur-xl animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => handleScrollTo(e, link.targetId)}
              className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-900 transition-colors cursor-pointer"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
