import React from "react";

export default function TechStackPane() {
  const stack = [
    {
      category: "AI & Cognitive Agents",
      skills: [
        { name: "Agentic Workflows (LangChain, LlamaIndex)", value: 92 },
        { name: "Vector Databases & Embeddings (Pinecone)", value: 88 },
        { name: "LLM Orchestration & Context Windows", value: 95 }
      ]
    },
    {
      category: "Languages",
      skills: [
        { name: "Python (AI Modeling & Scripting)", value: 90 },
        { name: "JavaScript / TypeScript (Vite & Node)", value: 93 },
        { name: "C++ / PHP (Algorithms & Systems)", value: 75 },
        { name: "HTML5 / CSS3 (Neon Layouts)", value: 96 }
      ]
    },
    {
      category: "Frameworks & Engine Core",
      skills: [
        { name: "React 18 & Virtual Dom Architectures", value: 92 },
        { name: "FastAPI / Express.js Rest Services", value: 85 },
        { name: "TailwindCSS & Framer Motion", value: 90 }
      ]
    },
    {
      category: "Linux Ecosystem & Tools",
      skills: [
        { name: "Arch Linux Core & Bash Automation", value: 95 },
        { name: "Git Version Control", value: 94 },
        { name: "Docker Containerization", value: 80 }
      ]
    }
  ];

  // Helper to render terminal style progress indicators [=====>   ]
  const renderTerminalBar = (val) => {
    const totalBlocks = 20;
    const filledBlocks = Math.round((val / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    const fillStr = "=".repeat(filledBlocks) + ">";
    const emptyStr = " ".repeat(Math.max(0, emptyBlocks - 1));
    return `[${fillStr.slice(0, totalBlocks)}${emptyStr}] ${val}%`;
  };

  return (
    <div className="p-4 bg-[#0c0c0c] text-glow-dim font-terminal h-full overflow-y-auto flex flex-col gap-5">
      {/* Title */}
      <div className="flex justify-between items-center border-b border-[#004411] pb-2">
        <h2 className="font-8bit text-xs text-[#fff]">&gt; PACMAN -S TECH_STACK</h2>
        <span className="pacman-tag">arch_repo -v 2026.05</span>
      </div>

      {/* Grid of stack Categories */}
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        {stack.map((cat, i) => (
          <div key={i} className="border border-[#002208] bg-[#020202] p-3 rounded hover:border-[#00ff66] transition-all">
            <h3 className="font-pixel text-[14px] text-[#fff] mb-2 flex items-center gap-1.5 border-b border-[#002208] pb-1">
              <span>⚡</span> {cat.category}
            </h3>

            <div className="flex flex-col gap-3">
              {cat.skills.map((skill, si) => (
                <div key={si} className="flex flex-col">
                  <div className="flex justify-between text-xs text-[#00aa44] mb-1 font-terminal">
                    <span>{skill.name}</span>
                  </div>

                  {/* Retro Text Bar Visualizer */}
                  <div className="font-mono text-xs text-[#00ff66] select-none tracking-wider">
                    {renderTerminalBar(skill.value)}
                  </div>
                  
                  {/* CSS Progress Bar Visualizer */}
                  <div className="terminal-progress-track mt-1.5 rounded-sm">
                    <div 
                      className="terminal-progress-fill" 
                      style={{ width: `${skill.value}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
