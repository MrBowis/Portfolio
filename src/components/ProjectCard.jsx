import React from "react";

export default function ProjectCard({ project }) {
  // Format repo date
  const dateFormatted = project.created_at ? project.created_at.slice(0, 10) : "2026.05.28";

  // Simulate package size
  const simulatedSize = project.size ? `${(project.size / 10).toFixed(1)} KB` : "42.8 KB";

  return (
    <div className="border border-[#002208] bg-[#020202] hover:border-[#00ff66] p-3.5 rounded text-glow-dim font-terminal text-sm transition-all duration-200 shadow-md flex flex-col justify-between hover:shadow-[0_0_10px_rgba(0,255,102,0.15)] select-none min-h-48">
      {/* Package Header */}
      <div className="flex justify-between items-start border-b border-[#002208] pb-1.5 mb-2.5">
        <div className="flex flex-col">
          <span className="font-pixel text-[13px] text-[#fff] tracking-wide">
            📁 pkg: {project.name}
          </span>
          <span className="text-[10px] text-[#00aa44]">repo - mrbowis / stable</span>
        </div>
        <span className="pacman-tag text-[9px] scale-95">v1.0.0</span>
      </div>

      {/* Package Body Description */}
      <div className="flex-1 text-[#eee] text-xs leading-relaxed mb-3">
        {project.description ? (
          <p>{project.description}</p>
        ) : (
          <p>Cutting-edge vanguard application. Initialized on: {dateFormatted}. Includes optimized AI loops and lightweight core.</p>
        )}
      </div>

      {/* Package Metadata Info */}
      <div className="border-t border-[#002208] pt-2 flex flex-col gap-1.5">
        <div className="grid grid-cols-2 text-[10px] text-[#888]">
          <span>Size: <span className="text-[#00ff66]">{simulatedSize}</span></span>
          <span>Date: <span className="text-[#00ff66]">{dateFormatted}</span></span>
          <span>Stars: <span className="text-[#00ff66]">⭐ {project.stargazers_count || 0}</span></span>
          <span>Forks: <span className="text-[#00ff66]">🍴 {project.forks_count || 0}</span></span>
        </div>

        {/* Action Link command (Interactive visual) */}
        <a 
          href={project.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-1 w-full bg-[#0c0c0c] border border-[#004411] hover:border-[#00ff66] hover:bg-[#002208] text-[#00ff66] font-pixel text-xs py-1 px-2.5 rounded text-center block transition-all uppercase tracking-wider"
        >
          $ pacman -S inspect_source
        </a>
      </div>
    </div>
  );
}
