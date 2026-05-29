import React, { useState, useEffect } from "react";

export default function Waybar({ activeWorkspace, setActiveWorkspace, activeWindowTitle }) {
  const [time, setTime] = useState("");
  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(4.3);
  const [aiLoad, setAiLoad] = useState("idle");

  // Clock Update
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleDateString("es-ES") + " | " + date.toLocaleTimeString("es-ES", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // CPU and RAM Metric Fluctuations (WOW factor realism)
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(8 + Math.random() * 15));
      setRam(parseFloat((4.1 + Math.random() * 0.4).toFixed(1)));
      
      const aiStates = ["idle", "analyzing", "optimizing", "deploying agents", "inference active"];
      setAiLoad(aiStates[Math.floor(Math.random() * aiStates.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const workspaces = [
    { id: 1, label: "1:system", icon: "⚙️" },
    { id: 2, label: "2:projects", icon: "📁" },
    { id: 3, label: "3:tech-matrix", icon: "🧠" },
    { id: 4, label: "4:terminal", icon: "💻" }
  ];

  return (
    <header className="w-full bg-[#050505] border-b border-[#004411] text-[#00ff66] text-sm py-1.5 px-4 flex flex-row justify-between items-center z-50 font-terminal">
      {/* Left: Arch Logo and Workspaces */}
      <div className="flex items-center gap-3">
        {/* Arch Logo Icon */}
        <div className="flex items-center text-[#00ff66] hover:text-[#fff] cursor-pointer" title="Arch Linux inside BowisWM">
          <svg viewBox="0 0 128 128" className="w-5 h-5 fill-current">
            <path d="M64 5.922L12.359 109.281a3.02 3.02 0 001.375 3.906c.922.5 2.063.36 2.828-.313 14.156-12.437 32.188-16.797 47.438-16.797 15.25 0 33.281 4.36 47.438 16.797.765.672 1.906.812 2.828.313a3.02 3.02 0 001.375-3.906L64 5.922zm0 18.062L102.75 96.094c-8.922-8.547-22.11-12.282-38.75-12.282-16.64 0-29.828 3.735-38.75 12.282L64 23.984z" />
          </svg>
          <span className="font-8bit text-[9px] ml-1.5 max-md:hidden">ARCH</span>
        </div>

        {/* Workspace Badges */}
        <div className="flex items-center bg-[#0c0c0c] border border-[#004411] rounded px-1 gap-1">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => setActiveWorkspace(ws.id)}
              className={`px-2 py-0.5 rounded text-xs font-pixel transition-all duration-150 ${
                activeWorkspace === ws.id
                  ? "bg-[#004411] text-[#00ff66] border border-[#00ff66] font-bold"
                  : "text-[#00aa44] hover:text-[#00ff66]"
              }`}
            >
              <span className="mr-1">{ws.icon}</span>
              {ws.label}
            </button>
          ))}
        </div>
      </div>

      {/* Center: Window Title Descriptor */}
      <div className="flex-1 text-center font-8bit text-[9px] text-[#00aa44] px-4 truncate max-sm:hidden">
        {activeWindowTitle ? `:: ${activeWindowTitle} ::` : ":: BowisWM (Hyprland Simulation) ::"}
      </div>

      {/* Right: Telemetry & Time */}
      <div className="flex items-center gap-3">
        {/* Dynamic System Stats */}
        <div className="flex items-center gap-2 max-lg:hidden">
          <span className="bg-[#0c0c0c] px-2 py-0.5 border border-[#002208] rounded text-xs">
            CPU: <span className="font-bold text-[#fff]">{cpu}%</span>
          </span>
          <span className="bg-[#0c0c0c] px-2 py-0.5 border border-[#002208] rounded text-xs">
            RAM: <span className="font-bold text-[#fff]">{ram}G/16G</span>
          </span>
          <span className="bg-[#0c0c0c] px-2 py-0.5 border border-[#002208] rounded text-xs text-[#ffb700] hover:text-[#00ff66] cursor-help" title="Simulated AI Agent Swarm status">
            AI_AGENT: <span className="font-bold uppercase">{aiLoad}</span>
          </span>
        </div>

        {/* Date / Time clock */}
        <div className="bg-[#0c0c0c] px-2.5 py-0.5 border border-[#004411] rounded text-xs font-bold text-[#fff]">
          📅 {time}
        </div>
      </div>
    </header>
  );
}
