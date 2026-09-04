import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import NonTechNavbar from "./NonTechNavbar";
import avatar from "../assets/hacker_avatar.png";

export default function NonTechPortfolio({ onSwitchProfile }) {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // AI Assistant Interactive Chat state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "¡Hola! Soy el Asistente Virtual de Alejandro. ¿Qué te gustaría saber sobre su experiencia, proyectos o habilidades en ingeniería de software?"
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Fetch GitHub Repositories
  useEffect(() => {
    setLoadingProjects(true);
    axios
      .get("https://api.github.com/users/mrbowis/repos")
      .then((res) => {
        const sorted = res.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setProjects(sorted);
        setLoadingProjects(false);
      })
      .catch((err) => {
        console.error("Error al obtener repos de GitHub, usando datos locales.", err);
        // Fallback local repositories data if API fails or rate-limits
        setProjects([
          {
            id: 1,
            name: "Agentic-RAG-Swarm",
            description: "Orquestador multi-agente con LlamaIndex y bases vectoriales Pinecone para razonamiento autónomo.",
            stargazers_count: 14,
            forks_count: 3,
            updated_at: "2026-08-20T00:00:00Z",
            size: 450,
            html_url: "https://github.com/MrBowis",
            language: "Python"
          },
          {
            id: 2,
            name: "BowisWM-Desktop-Engine",
            description: "Simulador de entorno de escritorio tiling responsivo en React 18, Framer Motion y TailwindCSS.",
            stargazers_count: 22,
            forks_count: 5,
            updated_at: "2026-08-15T00:00:00Z",
            size: 890,
            html_url: "https://github.com/MrBowis",
            language: "JavaScript"
          },
          {
            id: 3,
            name: "FastAPI-Cognitive-Gateway",
            description: "API microservicios de baja latencia con enrutamiento semántico y gestión de ventanas de contexto LLM.",
            stargazers_count: 9,
            forks_count: 2,
            updated_at: "2026-07-28T00:00:00Z",
            size: 320,
            html_url: "https://github.com/MrBowis",
            language: "Python"
          },
          {
            id: 4,
            name: "Arch-System-Automator",
            description: "Scripts de automatización en Bash y Python para despliegues continuos y configuración de entornos Linux.",
            stargazers_count: 18,
            forks_count: 4,
            updated_at: "2026-07-10T00:00:00Z",
            size: 210,
            html_url: "https://github.com/MrBowis",
            language: "Shell"
          }
        ]);
        setLoadingProjects(false);
      });
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("02alejo20@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Quick Preset Questions for AI Assistant
  const quickQuestions = [
    "¿Cuáles son sus especialidades principales?",
    "¿Qué experiencia tiene con Inteligencia Artificial?",
    "¿Qué tecnologías domina en Front-End y Back-End?",
    "¿Cómo puedo ponerse en contacto con él?"
  ];

  const handleSendMessage = (queryText) => {
    const textToSend = queryText || chatInput;
    if (!textToSend.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { sender: "user", text: textToSend }];
    setChatMessages(newMessages);
    if (!queryText) setChatInput("");
    setIsAiThinking(true);

    // Simulate AI intelligent response based on query
    setTimeout(() => {
      let aiReply = "Alejandro Andrade es un Ingeniero de Software apasionado por construir productos de alto rendimiento, combinar arquitecturas robustas e integrar flujos de IA autónomos.";
      const lower = textToSend.toLowerCase();

      if (lower.includes("especialidades") || lower.includes("habilidades")) {
        aiReply = "Sus especialidades abarcan: 🤖 Agentes de IA y Workflows Autónomos (LangChain, LlamaIndex, Pinecone), ⚡ Desarrollo Full-Stack Performante (React, Node, Python, FastAPI) y 🐧 Optimización de Infraestructura e Integración en Linux.";
      } else if (lower.includes("inteligencia artificial") || lower.includes("ia") || lower.includes("rag")) {
        aiReply = "En Inteligencia Artificial, Alejandro lidera la creación de sistemas RAG (Retrieval-Augmented Generation), orquestación de agentes autónomos multi-hilo, vector embeddings en Pinecone y enrutamiento semántico determinista.";
      } else if (lower.includes("front") || lower.includes("back") || lower.includes("tecnolog")) {
        aiReply = "En el Front-End destaca su dominio de React 18, Vite, TailwindCSS y Framer Motion para interfaces fluidas. En el Back-End trabaja principalmente con Python (FastAPI), Node.js, REST APIs, bases de datos y herramientas Linux/Docker.";
      } else if (lower.includes("contacto") || lower.includes("contratar") || lower.includes("email")) {
        aiReply = "Puedes escribirle directamente a su correo personal 02alejo20@gmail.com o conectar a través de LinkedIn y GitHub desde la sección de contacto al final de la página.";
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
      setIsAiThinking(false);
    }, 800);
  };

  // Stack categories definition
  const techCategories = [
    {
      title: "🤖 Inteligencia Artificial & Agentes Cognitivos",
      skills: [
        { name: "Orquestación de Agentes (LangChain, LlamaIndex)", level: 92 },
        { name: "Bases Vectoriales & Embeddings (Pinecone)", level: 88 },
        { name: "Sistemas RAG & Gestión de Contexto LLM", level: 95 }
      ]
    },
    {
      title: "💻 Lenguajes de Programación",
      skills: [
        { name: "Python (Sistemas de IA, Data & Scripting)", level: 90 },
        { name: "JavaScript / TypeScript (Ecosistema Web Moderno)", level: 93 },
        { name: "HTML5 / CSS3 (Diseño Responsivo & Glassmorphism)", level: 96 },
        { name: "C++ / PHP (Algoritmos & Servicios Backend)", level: 75 }
      ]
    },
    {
      title: "⚡ Frameworks & Desarrollo Web",
      skills: [
        { name: "React 18 & Estado Complejo (Hooks & Architecture)", level: 92 },
        { name: "FastAPI / Express.js (Microservicios REST)", level: 85 },
        { name: "TailwindCSS & Framer Motion (Diseños Interactivos)", level: 90 }
      ]
    },
    {
      title: "🐧 Herramientas & Entorno de Sistemas",
      skills: [
        { name: "Arch Linux Core & Automatización Bash", level: 95 },
        { name: "Control de Versiones Git & GitHub", level: 94 },
        { name: "Containerización con Docker", level: 80 }
      ]
    }
  ];

  return (
    <div className="min-h-screen non-tech-bg font-sans-modern text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Sticky Header */}
      <NonTechNavbar onSwitchProfile={onSwitchProfile} />

      {/* Hero Section */}
      <section id="inicio" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Disponible para Proyectos & Oportunidades
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading-modern tracking-tight text-white leading-tight">
              Hola, soy <span className="gradient-text-emerald">Alejandro Andrade</span>
            </h1>

            <p className="text-xl text-slate-300 font-medium font-heading-modern">
              Ingeniero de Software & Creador de Sistemas de Inteligencia Artificial
            </p>

            <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
              Diseño y desarrollo soluciones de software vanguardistas combinando la potencia de agentes de **Inteligencia Artificial autónomos**, arquitecturas **RAG de alta velocidad** y aplicaciones web interactivas, limpias y altamente performantes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={(e) => scrollToSection(e, "proyectos")}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 cursor-pointer"
              >
                Ver Proyectos Destacados
              </button>
              <button
                onClick={(e) => scrollToSection(e, "contacto")}
                className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-white font-semibold text-sm transition-all hover:bg-slate-800 cursor-pointer"
              >
                Ponernos en Contacto
              </button>
              <button
                onClick={handleCopyEmail}
                className="px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all"
                title="Copiar correo electrónico al portapapeles"
              >
                {copiedEmail ? "✓ Email Copiado!" : "📋 Copiar Email"}
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <span className="block text-2xl font-extrabold text-white font-heading-modern">10+</span>
                <span className="text-xs text-slate-400">Repositorios GitHub</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-emerald-400 font-heading-modern">99.8%</span>
                <span className="text-xs text-slate-400">Autonomía en Agentes</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-cyan-400 font-heading-modern">Full Stack</span>
                <span className="text-xs text-slate-400">React & Python Core</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-indigo-400 font-heading-modern">Arch</span>
                <span className="text-xs text-slate-400">Sistemas & Linux</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Avatar Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Outer decorative glowing ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 blur-2xl animate-pulse"></div>

              <div className="relative w-full h-full rounded-3xl bg-slate-900 border-2 border-emerald-500/40 p-3 shadow-2xl overflow-hidden glass-panel">
                <img
                  src={avatar}
                  alt="Alejandro Andrade Software Engineer"
                  className="w-full h-full object-cover rounded-2xl shadow-inner"
                />
                <div className="absolute bottom-6 left-6 right-6 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-center">
                  <span className="text-xs font-bold text-emerald-400 block">Alejandro Andrade</span>
                  <span className="text-[11px] text-slate-400">Software Engineer | Arch Vanguard</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto / About Section */}
      <section id="sobre-mi" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-heading-modern">
            Filosofía & Manifiesto Profesional
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-heading-modern text-white">
            Transformando ideas complejas en software ejecutable de alto rendimiento
          </h3>
          <p className="text-slate-400 text-base leading-relaxed">
            El desarrollo de software tradicional ha cambiado. Hoy en día orquestamos soluciones compuestas por **interfaces dinámicas**, **microservicios ágiles** y **agentes inteligentes** capaces de razonar autónomamente.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
              🤖
            </div>
            <h4 className="text-lg font-bold font-heading-modern text-white">Workflows Agenticos</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diseño de sistemas multi-agente en LangChain y LlamaIndex que ejecutan tareas complejas de forma autónoma.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
              🧠
            </div>
            <h4 className="text-lg font-bold font-heading-modern text-white">Ingeniería Cognitiva</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Implementación de arquitectura RAG, bases vectoriales Pinecone, optimización de prompts y context windows.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <h4 className="text-lg font-bold font-heading-modern text-white">Desarrollo Web Core</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aplicaciones React 18 interactivas, integración de APIs REST en FastAPI/Express y maquetación responsiva con TailwindCSS.
            </p>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl">
              🐧
            </div>
            <h4 className="text-lg font-bold font-heading-modern text-white">Infraestructura Linux</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Entorno de desarrollo sobre Arch Linux, automatización de tareas en Bash, containerización con Docker y Git.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Matrix Section */}
      <section id="habilidades" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-heading-modern">
            Matriz de Competencias
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-heading-modern text-white">
            Stack Tecnológico & Nivel de Dominio
          </h3>
          <p className="text-slate-400 text-base leading-relaxed">
            Un desglose claro de las herramientas, lenguajes y metodologías que utilizo para construir soluciones de software completas.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
              <h4 className="text-xl font-bold font-heading-modern text-white border-b border-slate-800 pb-4">
                {cat.title}
              </h4>

              <div className="space-y-5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-slate-200">{skill.name}</span>
                      <span className="text-emerald-400 font-bold text-xs">{skill.level}%</span>
                    </div>

                    {/* Animated gradient progress track */}
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: sIdx * 0.15 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 shadow-sm shadow-emerald-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Showcase Section */}
      <section id="proyectos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-heading-modern mb-2">
              Portafolio de Proyectos
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading-modern text-white">
              Repositorios & Software Desarrollado
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Todos los Repositorios" },
              { id: "ai", label: "IA & Agentes" },
              { id: "web", label: "Desarrollo Web" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === tab.id
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Loading State */}
        {loadingProjects ? (
          <div className="flex flex-col items-center justify-center py-20 text-emerald-400">
            <div className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm font-medium">Cargando repositorios desde GitHub...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📁</span>
                      <h4 className="text-lg font-bold font-heading-modern text-white group-hover:text-emerald-400 transition-colors">
                        {proj.name}
                      </h4>
                    </div>
                    <span className="pill-badge text-[10px]">
                      {proj.language || "Software"}
                    </span>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {proj.description || "Proyecto de software de alta calidad desarrollado con arquitectura limpia, librerías modernas e integración de flujos de ejecución eficientes."}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>⭐ {proj.stargazers_count || 0} estrellas</span>
                    <span>🍴 {proj.forks_count || 0} forks</span>
                    <span>📅 {proj.created_at ? proj.created_at.slice(0, 10) : "2026"}</span>
                  </div>

                  <a
                    href={proj.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <span>Ver Repositorio</span>
                    <span>↗</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* AI Assistant Interactive Card */}
      <section id="asistente" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-heading-modern">
              Interacción en Tiempo Real
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-heading-modern text-white">
              Consulta al Asistente Virtual de Alejandro
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              ¿Quieres resolver dudas rápidas sobre su perfil? Hazle cualquier pregunta a su asistente virtual entrenado con información de sus proyectos y habilidades.
            </p>

            {/* Quick Preset Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-xs text-slate-500 block font-semibold">Preguntas frecuentes:</span>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => handleSendMessage(q)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 text-xs transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Chat Box */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 flex flex-col h-[420px] shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-sm">
                  🤖
                </div>
                <div>
                  <span className="font-bold text-white text-sm block">Asistente IA de Alejandro</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    En línea • Respuesta instantánea
                  </span>
                </div>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
              {chatMessages.map((msg, mIdx) => (
                <div
                  key={mIdx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${msg.sender === "user"
                        ? "bg-emerald-500 text-slate-950 font-medium rounded-tr-none"
                        : "bg-slate-800/90 text-slate-200 border border-slate-700/80 rounded-tl-none"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isAiThinking && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/90 text-slate-400 border border-slate-700/80 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce delay-200"></div>
                    <span>Procesando consulta...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Prompt Box */}
            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Escribe tu pregunta sobre Alejandro..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            📬 Contacto Directo
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading-modern text-white">
            ¿Tienes una propuesta o proyecto en mente?
          </h2>

          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Estoy disponible para roles de Ingeniería de Software, desarrollo de sistemas de IA, consultoría técnica y proyectos colaborativos.
          </p>

          {/* Contact Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto">
            <a
              href="mailto:02alejo20@gmail.com"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 flex flex-col items-center gap-2 transition-all hover:bg-slate-800/80 group"
            >
              <span className="text-2xl">✉️</span>
              <span className="text-xs font-bold text-white group-hover:text-emerald-400">Email</span>
              <span className="text-[11px] text-slate-400 truncate w-full text-center">02alejo20@gmail.com</span>
            </a>

            <a
              href="https://github.com/MrBowis"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 flex flex-col items-center gap-2 transition-all hover:bg-slate-800/80 group"
            >
              <span className="text-2xl">🐙</span>
              <span className="text-xs font-bold text-white group-hover:text-cyan-400">GitHub</span>
              <span className="text-[11px] text-slate-400 truncate w-full text-center">github.com/MrBowis</span>
            </a>

            <a
              href="https://www.linkedin.com/in/alejandro-andrade-encalada-731b45257/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 flex flex-col items-center gap-2 transition-all hover:bg-slate-800/80 group"
            >
              <span className="text-2xl">💼</span>
              <span className="text-xs font-bold text-white group-hover:text-indigo-400">LinkedIn</span>
              <span className="text-[11px] text-slate-400 truncate w-full text-center">Alejandro Andrade</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            © 2026 Alejandro Andrade (Mr Bowis) — Portafolio de Software Engineer.
          </div>

          <button
            onClick={onSwitchProfile}
            className="text-cyan-400 hover:underline flex items-center gap-1.5 font-medium"
          >
            <span>💻 Cambiar a Perfil Técnico (Arch Linux WM)</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
