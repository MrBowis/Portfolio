import React from "react";

export default function PitchPane() {
  const bootLogs = [
    { type: "OK", text: "Initializing cognitive loops..." },
    { type: "OK", text: "Vector databases online (embeddings: 1536d)" },
    { type: "WARN", text: "Human intervention bypassed. Autonomy level: MAXIMUM" }
  ];

  return (
    <div className="flex flex-col p-4 bg-[#0c0c0c] text-glow-dim font-terminal h-full overflow-y-auto">
      {/* Dynamic Simulated Boot Log */}
      <div className="mb-4 bg-[#020202] border border-[#004411] p-2 rounded text-[11px] font-mono leading-relaxed">
        {bootLogs.map((log, index) => (
          <div key={index} className="flex gap-2">
            <span className={log.type === "OK" ? "text-[#00ff66]" : "text-[#ffb700]"}>
              [{log.type}]
            </span>
            <span className="text-[#888]">{log.text}</span>
          </div>
        ))}
      </div>

      {/* Main Pitch Content */}
      <h2 className="font-8bit text-xs text-[#fff] mb-3 text-glow">
        &gt; THE AI VANGUARD MANIFESTO
      </h2>

      <p className="text-sm text-[#eee] leading-relaxed mb-4">
        The software engineering paradigm has shifted. We no longer write static, linear routines—we orchestrate **autonomous, stateful software agents**. I bridge the gap between robust software architecture and dynamic AI integration.
      </p>

      <p className="text-sm text-[#eee] leading-relaxed mb-4">
        My engineering methodology centers on deploying **cognitive loops**, optimizing **context windows**, implementing high-speed **RAG architectures**, and building stunning web frontends that are fast, accessible, and responsive. I exploit the maximum potential of AI, turning complex instructions into production-ready software pipelines.
      </p>

      {/* Specialty Pillars */}
      <div className="grid grid-cols-2 gap-3 mt-1 text-xs">
        <div className="border border-[#004411] p-2 bg-[#020202] rounded hover:border-[#00ff66] transition-all">
          <span className="text-[#00ff66] font-bold block mb-1">🤖 Agentic Workflows</span>
          Orchestrating multi-agent systems, LangChain/LlamaIndex frameworks, and autonomous loops.
        </div>
        <div className="border border-[#004411] p-2 bg-[#020202] rounded hover:border-[#00ff66] transition-all">
          <span className="text-[#00ff66] font-bold block mb-1">🧠 Cognitive Engineering</span>
          Semantic routing, prompt optimization, and contextual memory vector injection.
        </div>
        <div className="border border-[#004411] p-2 bg-[#020202] rounded hover:border-[#00ff66] transition-all">
          <span className="text-[#00ff66] font-bold block mb-1">⚡ Core Development</span>
          Ultra-performant React, custom hooks, dynamic rendering, and high-frequency API bridges.
        </div>
        <div className="border border-[#004411] p-2 bg-[#020202] rounded hover:border-[#00ff66] transition-all">
          <span className="text-[#00ff66] font-bold block mb-1">🐧 Arch-Linux Architecture</span>
          Built with an automated, customized ecosystem leveraging cybersecurity & fast execution.
        </div>
      </div>
    </div>
  );
}
