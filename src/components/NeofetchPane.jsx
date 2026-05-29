import React from "react";
import avatar from "../assets/hacker_avatar.png";

export default function NeofetchPane() {
  const asciiArch = `      /\\
     /  \\
    /\\   \\
   /      \\
  /   ,,   \\
 /   |  |   \\
/   -'''-    \\
/___'''-___-'''___\\`;

  const specs = [
    { label: "OS", value: "Arch Linux x86_64" },
    { label: "Kernel", value: "6.12.0-arch-AI-vanguard" },
    { label: "Uptime", value: "13 hours, 37 mins" },
    { label: "Shell", value: "zsh 5.9 (AI-autosuggest enabled)" },
    { label: "WM", value: "Hyprland (BowisWM v0.4.0)" },
    { label: "Theme", value: "Terminal-Green-Glow [CRT]" },
    { label: "CPU", value: "AMD Ryzen 9 AI-Max (16 cores)" },
    { label: "GPU", value: "NVIDIA RTX 5080 (Tensor-Core Optimised)" },
    { label: "AI Co-pilot", value: "Gemini 3.5 Flash (Medium Agentic State)" },
    { label: "Focus", value: "Autonomous Agents / RAG / Cognitive Systems" }
  ];

  return (
    <div className="flex flex-row max-md:flex-col items-center md:items-start gap-6 p-4 bg-[#0c0c0c] h-full text-glow-dim font-terminal overflow-y-auto">
      {/* ASCII Logo & Avatar Column */}
      <div className="flex flex-col gap-4 items-center shrink-0">
        <pre className="text-[#00ff66] font-bold text-sm leading-tight select-none max-md:text-center">
          {asciiArch}
        </pre>
        <div className="border-2 border-[#004411] p-1 bg-[#050505] rounded shadow-[0_0_8px_rgba(0,255,102,0.25)] hover:border-[#00ff66] transition-all">
          <img 
            src={avatar} 
            alt="Hacker Avatar" 
            className="w-28 h-28 object-cover rounded-sm select-none"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      </div>

      {/* Specification Details */}
      <div className="flex flex-col text-sm w-full">
        {/* User Hostname Title */}
        <div className="flex flex-col mb-2">
          <span className="font-8bit text-[11px] text-[#fff]">mrbowis@archlinux</span>
          <span className="text-[#004411] font-bold mt-[-2px]">-------------------</span>
        </div>

        {/* Specs Listing */}
        <div className="flex flex-col gap-1">
          {specs.map((spec, i) => (
            <div key={i} className="flex flex-row gap-2">
              <span className="text-[#00aa44] font-bold shrink-0">{spec.label}:</span>
              <span className="text-[#eee]">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Theme Color blocks */}
        <div className="flex gap-1.5 mt-4">
          <span className="w-5 h-4 bg-[#000]"></span>
          <span className="w-5 h-4 bg-[#004411]"></span>
          <span className="w-5 h-4 bg-[#00aa44]"></span>
          <span className="w-5 h-4 bg-[#00ff66]"></span>
          <span className="w-5 h-4 bg-[#22ff88]"></span>
          <span className="w-5 h-4 bg-[#ffffff]"></span>
        </div>
      </div>
    </div>
  );
}
