import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Waybar from "../components/Waybar";
import NeofetchPane from "../components/NeofetchPane";
import PitchPane from "../components/PitchPane";
import TerminalPane from "../components/TerminalPane";
import TechStackPane from "../components/TechStackPane";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard({ defaultWorkspace = 1 }) {
  // Desktop Telemetry States
  const [activeWorkspace, setActiveWorkspace] = useState(defaultWorkspace);
  const [activeWindowTitle, setActiveWindowTitle] = useState("bash - mrbowis@archlinux");
  const [projects, setProjects] = useState([]);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState([]);

  // Tiling Window States for each Workspace
  const [openWindows, setOpenWindows] = useState({
    1: ["neofetch", "manifesto", "shell"], // System info
    2: ["projects", "status"],            // Projects
    3: ["tech", "orchestrator"],           // Tech Stack
    4: ["terminal_only"]                   // Full CLI
  });

  const [focusedWindow, setFocusedWindow] = useState("neofetch");

  // Router workspace alignment
  useEffect(() => {
    setActiveWorkspace(defaultWorkspace);
    if (defaultWorkspace === 2) {
      setFocusedWindow("projects");
      setActiveWindowTitle("projects.sh - Dynamic Package Manager");
    } else {
      setFocusedWindow("neofetch");
      setActiveWindowTitle("neofetch - Arch Linux Telemetry");
    }
  }, [defaultWorkspace]);

  // Scroll to top on workspace changes (ensures clean views)
  useEffect(() => {
    window.scrollTo(0, 0);
    // Find all scrollable containers inside our desktop environment and reset them to top
    const scrollableElements = document.querySelectorAll(".overflow-y-auto");
    scrollableElements.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [activeWorkspace]);

  // Fetch GitHub repos (Axios dynamic hook)
  useEffect(() => {
    axios
      .get("https://api.github.com/users/mrbowis/repos")
      .then((res) => {
        // Sort repos by update date
        const sorted = res.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setProjects(sorted);
      })
      .catch((err) => {
        console.error("Failed to query github repos, fallback to local data.", err);
      });
  }, []);

  // Simulated Arch Linux Boot Loading Sequence (WOW factor)
  useEffect(() => {
    const bootSequence = [
      "Arch Linux 6.12.0-arch-AI-vanguard x86_64",
      ":: Core packages initialized.",
      "Loading kernel modules...",
      "Mounting local vector databases... [ OK ]",
      "Connecting LLM autonomous swarm... [ OK ]",
      "Starting Wayland Compositor... [ OK ]",
      "Launching BowisWM (Hyprland simulation)...",
      "System fully online. Welcome back, Mr Bowis."
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < bootSequence.length) {
        setBootText((prev) => [...prev, bootSequence[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 800);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // Close window handler
  const closeWindow = (workspaceId, windowId) => {
    setOpenWindows((prev) => ({
      ...prev,
      [workspaceId]: prev[workspaceId].filter((id) => id !== windowId)
    }));
  };

  // Restore windows launcher
  const restoreWindows = (workspaceId) => {
    const defaults = {
      1: ["neofetch", "manifesto", "shell"],
      2: ["projects", "status"],
      3: ["tech", "orchestrator"],
      4: ["terminal_only"]
    };
    setOpenWindows((prev) => ({
      ...prev,
      [workspaceId]: defaults[workspaceId]
    }));
  };

  // Window focusing wrapper
  const focusWindow = (windowId, title) => {
    setFocusedWindow(windowId);
    setActiveWindowTitle(title);
  };

  // Dynamic status details for projects pane
  const renderStatusPane = () => (
    <div className="p-4 bg-[#0c0c0c] text-glow-dim font-terminal text-sm h-full overflow-y-auto flex flex-col justify-between">
      <div>
        <h3 className="font-8bit text-xs text-[#fff] border-b border-[#004411] pb-1.5 mb-3">&gt; REPO_METADATA.log</h3>
        <ul className="space-y-2 text-[#eee]">
          <li className="flex gap-2">
            <span className="text-[#00ff66] font-bold">[INFO]</span>
            <span>Dynamic package index loaded. Total items: <span className="text-[#00ff66] font-bold">{projects.length}</span></span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#00ff66] font-bold">[INFO]</span>
            <span>All systems stable. Hosting static deployment from Arch node espe-01.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#ffb700] font-bold">[WARN]</span>
            <span>Unused legacy modules purged (purged_scope: education_degree). Focus locked to AI vanguard systems.</span>
          </li>
        </ul>
      </div>

      <div className="bg-[#020202] border border-[#004411] p-3 rounded mt-4">
        <span className="text-[#00ff66] font-pixel block mb-1">🤖 Autonomous LLM Swarm Status</span>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-block w-2.5 h-2.5 bg-[#00ff66] rounded-full animate-pulse"></span>
          <span>Orchestrated with LlamaIndex. Listening for query requests...</span>
        </div>
      </div>
    </div>
  );

  // Dynamic panel for workspace 3 - AI Orchestrator Console
  const renderOrchestratorPane = () => (
    <div className="p-4 bg-[#0c0c0c] text-glow-dim font-terminal text-sm h-full overflow-y-auto flex flex-col justify-between">
      <div>
        <h3 className="font-8bit text-xs text-[#fff] border-b border-[#004411] pb-1.5 mb-3">&gt; COGNITIVE_TELEM.sh</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[#00aa44]">Active Pipeline:</span>
            <span className="text-[#fff] font-bold">multi_agent_rag</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#00aa44]">LLM Temperature:</span>
            <span className="text-[#fff] font-bold">0.15 (Deterministic)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#00aa44]">Embedding Database:</span>
            <span className="text-[#fff] font-bold">Pinecone Cluster-01</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#00aa44]">Agent State:</span>
            <span className="text-[#00ff66] font-bold">LISTENING [TCP]</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#00aa44]">Autonomy rating:</span>
            <span className="text-[#ffb700] font-bold">99.84%</span>
          </div>
        </div>
      </div>

      <div className="border border-[#004411] p-2 bg-[#020202] rounded text-xs leading-relaxed text-[#888] mt-4">
        <span className="text-[#00ff66] font-bold block mb-1">Telemetry Diagnostics</span>
        Heuristics are constantly evaluated. Autoregressive inference loops verify that all user request payloads are compiled cleanly. Arch Linux fish prompt ensures rapid input latency.
      </div>
    </div>
  );

  // Render wrapper for Tiling Windows
  const renderWindow = (id, title, childComponent) => {
    const isFocused = focusedWindow === id;

    return (
      <motion.div
        key={id}
        layout
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={() => focusWindow(id, title)}
        className={`flex flex-col rounded overflow-hidden select-none transition-all duration-150 h-full ${isFocused ? "hypr-active-window" : "hypr-inactive-window"
          }`}
      >
        {/* Window Chrome Title Bar */}
        <div className={`px-3 py-1 flex justify-between items-center text-xs shrink-0 select-none ${isFocused ? "bg-[#004411] text-[#00ff66]" : "bg-[#111111] text-[#666666]"
          }`}>
          <div className="flex items-center gap-1.5 font-terminal font-bold">
            <span>🪟</span>
            <span>{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); }}
              className="hover:text-[#fff] cursor-help"
              title="Focus Pane"
            >
              #
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); closeWindow(activeWorkspace, id); }}
              className="hover:text-red-500 font-bold"
              title="Close Panel"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window Core Content */}
        <div className="flex-1 overflow-hidden relative bg-[#0c0c0c]">
          {childComponent}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#00ff66] relative font-terminal overflow-hidden select-none">
      {/* Immersive CRT scanline overlays */}
      <div className="crt-overlay" />

      {/* Boot Animation Layer */}
      <AnimatePresence>
        {isBooting && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#050505] z-[99999] p-6 font-terminal text-[#00ff66] text-sm overflow-hidden flex flex-col justify-start"
          >
            <div className="w-full max-w-3xl mx-auto space-y-1">
              {bootText.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed animate-pulse">
                  {line}
                </div>
              ))}
              <div className="inline-block w-2.5 h-4 bg-[#00ff66] animate-pulse mt-2"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waybar status panel */}
      <Waybar
        activeWorkspace={activeWorkspace}
        setActiveWorkspace={setActiveWorkspace}
        activeWindowTitle={activeWindowTitle}
      />

      {/* Virtual Desktop Tiling Area */}
      <main className="flex-1 p-3 overflow-hidden relative">
        <AnimatePresence mode="popLayout">
          {/* Workspace 1: Systems & Bio */}
          {activeWorkspace === 1 && (
            <motion.div
              key="ws1"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              className="h-full w-full"
            >
              {openWindows[1].length === 0 ? (
                // Wofi launcher trigger when all windows closed
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                  <p className="font-8bit text-xs text-[#00aa44]">No active tiling windows in Workspace 1.</p>
                  <button
                    onClick={() => restoreWindows(1)}
                    className="pacman-tag uppercase"
                  >
                    $ wofi --show run_tiling_manager
                  </button>
                </div>
              ) : (
                <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Left Column: Neofetch (Full Height if alone, else shared) */}
                  {openWindows[1].includes("neofetch") && (
                    <div className={openWindows[1].length === 1 ? "col-span-2 h-full" : "h-full"}>
                      {renderWindow("neofetch", "neofetch - specs & profile", <NeofetchPane />)}
                    </div>
                  )}

                  {/* Right Column: Pitch & Shell stacked */}
                  <div className={`flex flex-col gap-3 h-full ${!openWindows[1].includes("neofetch") ? "col-span-2" : ""
                    }`}>
                    {openWindows[1].includes("manifesto") && (
                      <div className="flex-1 min-h-[45%]">
                        {renderWindow("manifesto", "ai_vanguard.md - bio", <PitchPane />)}
                      </div>
                    )}
                    {openWindows[1].includes("shell") && (
                      <div className="flex-1 min-h-[45%]">
                        {renderWindow("shell", "zsh - mrbowis@archlinux", <TerminalPane />)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Workspace 2: Dynamic Repositories */}
          {activeWorkspace === 2 && (
            <motion.div
              key="ws2"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              className="h-full w-full"
            >
              {openWindows[2].length === 0 ? (
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                  <p className="font-8bit text-xs text-[#00aa44]">No active tiling windows in Workspace 2.</p>
                  <button
                    onClick={() => restoreWindows(2)}
                    className="pacman-tag uppercase"
                  >
                    $ wofi --show run_projects_tiling
                  </button>
                </div>
              ) : (
                <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Left side: Repos Tiling (Occupies 2 cols if status is open, else 3) */}
                  {openWindows[2].includes("projects") && (
                    <div className={`h-full ${openWindows[2].includes("status") ? "col-span-2" : "col-span-3"
                      } flex flex-col overflow-hidden`}>
                      {renderWindow("projects", "projects.sh - package list", (
                        <div className="p-4 overflow-y-auto h-full bg-[#0c0c0c] flex flex-col">
                          <div className="flex justify-between items-center border-b border-[#004411] pb-2 mb-4 shrink-0">
                            <span className="font-8bit text-[10px] text-[#fff]">&gt; PACMAN -Q GITHUB_STABLE</span>
                            <span className="text-xs text-[#00aa44]">{projects.length} repository packages found.</span>
                          </div>

                          {projects.length === 0 ? (
                            <div className="flex-1 flex flex-col justify-center items-center text-[#ffb700]">
                              <div className="inline-block w-8 h-8 border-4 border-[#ffb700] border-t-transparent rounded-full animate-spin mb-3"></div>
                              <span>Loading pacman package indexes...</span>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-3 overflow-y-auto pr-1">
                              {projects.map((proj) => (
                                <ProjectCard key={proj.id} project={proj} />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Right side: Repo Status and Dynamic Info */}
                  {openWindows[2].includes("status") && (
                    <div className={`h-full ${!openWindows[2].includes("projects") ? "col-span-3" : "col-span-1"}`}>
                      {renderWindow("status", "repo_diagnostics.sh - details", renderStatusPane())}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Workspace 3: Tech Matrix */}
          {activeWorkspace === 3 && (
            <motion.div
              key="ws3"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              className="h-full w-full"
            >
              {openWindows[3].length === 0 ? (
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                  <p className="font-8bit text-xs text-[#00aa44]">No active tiling windows in Workspace 3.</p>
                  <button
                    onClick={() => restoreWindows(3)}
                    className="pacman-tag uppercase"
                  >
                    $ wofi --show run_tech_matrix
                  </button>
                </div>
              ) : (
                <div className="h-full w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Left block: Tech list (2/3 width) */}
                  {openWindows[3].includes("tech") && (
                    <div className={`h-full ${openWindows[3].includes("orchestrator") ? "col-span-2" : "col-span-3"
                      }`}>
                      {renderWindow("tech", "pacman -Q - skills", <TechStackPane />)}
                    </div>
                  )}

                  {/* Right block: AI Telemetry info (1/3 width) */}
                  {openWindows[3].includes("orchestrator") && (
                    <div className={`h-full ${!openWindows[3].includes("tech") ? "col-span-3" : "col-span-1"}`}>
                      {renderWindow("orchestrator", "ai_orchestrator.sh - control", renderOrchestratorPane())}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Workspace 4: Expanded CLI Console */}
          {activeWorkspace === 4 && (
            <motion.div
              key="ws4"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              className="h-full w-full"
            >
              {openWindows[4].length === 0 ? (
                <div className="h-full w-full flex flex-col justify-center items-center gap-4">
                  <p className="font-8bit text-xs text-[#00aa44]">No active tiling windows in Workspace 4.</p>
                  <button
                    onClick={() => restoreWindows(4)}
                    className="pacman-tag uppercase"
                  >
                    $ wofi --show start_shell
                  </button>
                </div>
              ) : (
                <div className="h-full w-full">
                  {renderWindow("terminal_only", "kitty - full_terminal_emulator", <TerminalPane />)}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative desktop status footer - sleek bar */}
      <footer className="w-full bg-[#050505] border-t border-[#002208] py-1 px-4 text-[10px] text-[#00aa44] flex flex-row justify-between items-center select-none font-terminal shrink-0">
        <div>[BowisWM: Hyprland-Engine] [Status: ONLINE]</div>
        <div className="animate-pulse">● Swarm System Connected</div>
        <div>v0.4.0-Arch</div>
      </footer>
    </div>
  );
}
