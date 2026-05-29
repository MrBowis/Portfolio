import React, { useState, useRef, useEffect } from "react";

export default function TerminalPane() {
  const [history, setHistory] = useState([
    { type: "output", text: "BowisWM Terminal Simulator [v0.4.0]" },
    { type: "output", text: "Type 'help' to see all available commands." },
    { type: "output", text: "" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [matrixMode, setMatrixMode] = useState(false);
  
  const consoleContainerRef = useRef(null);
  const canvasRef = useRef(null);

  // Auto-scroll terminal to bottom (isolated to container)
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [history]);

  // Matrix Rain Canvas Animation
  useEffect(() => {
    if (!matrixMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight || 300;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*()[]{}";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff66";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    // Resize handler
    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 300;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [matrixMode]);

  const handleCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const args = trimmed.split(" ");
    const primaryCmd = args[0];

    const newHistory = [...history, { type: "input", text: cmdStr }];

    if (primaryCmd === "") {
      setHistory([...newHistory, { type: "output", text: "" }]);
      return;
    }

    switch (primaryCmd) {
      case "help":
      case "?":
        setHistory([
          ...newHistory,
          { type: "output", text: "Available commands:" },
          { type: "output", text: "  neofetch      Display system configuration specs" },
          { type: "output", text: "  skills        List developer hard & soft skills matrix" },
          { type: "output", text: "  agent [query] Interact with a simulated AI agent" },
          { type: "output", text: "  matrix        Activate full-window retro matrix code rain" },
          { type: "output", text: "  contact       Print developer email & profile links" },
          { type: "output", text: "  clear         Clear the terminal logs screen" }
        ]);
        break;
      case "clear":
        setHistory([]);
        break;
      case "neofetch":
        setHistory([
          ...newHistory,
          { type: "output", text: "OS: Arch Linux x86_64" },
          { type: "output", text: "Host: BowisWM Tiling Hyper-PC" },
          { type: "output", text: "WM: Hyprland (Web-Simulated)" },
          { type: "output", text: "Kernel: 6.12.0-arch-AI-vanguard" },
          { type: "output", text: "Brain: Gemini 3.5 Flash Model Core" },
          { type: "output", text: "Developer: Mr Bowis (Alejandro Andrade)" }
        ]);
        break;
      case "skills":
        setHistory([
          ...newHistory,
          { type: "output", text: "--- HARD SKILLS ---" },
          { type: "output", text: "  AI Orchestrations: LangChain, LlamaIndex, Agents" },
          { type: "output", text: "  Languages: JavaScript, Python, C++, PHP, HTML/CSS" },
          { type: "output", text: "  Core Tech: React 18, Vite, FastAPI, Node.js, Git" },
          { type: "output", text: "--- SOFT SKILLS ---" },
          { type: "output", text: "  Autonomous Problem Solving, Critical Thinking, Team Leadership" }
        ]);
        break;
      case "matrix":
        setMatrixMode(true);
        setHistory([
          ...newHistory,
          { type: "output", text: "Executing matrix rain screen-saver. Press ESC or type 'exit' to stop." }
        ]);
        break;
      case "contact":
        setHistory([
          ...newHistory,
          { type: "output", text: "--- CONTACT CARD ---" },
          { type: "output", text: "  Email:  aleandradeen@gmail.com" },
          { type: "output", text: "  Github: https://github.com/MrBowis" },
          { type: "output", text: "  LinkedIn: https://www.linkedin.com/in/alejandro-andrade-encalada-731b45257/" }
        ]);
        break;
      case "agent":
        const userQuery = args.slice(1).join(" ");
        if (!userQuery) {
          setHistory([
            ...newHistory,
            { type: "output", text: "Usage: agent [your query]" },
            { type: "output", text: "Example: agent tell me about your projects" }
          ]);
        } else {
          setHistory([
            ...newHistory,
            { type: "output", text: `[SYSTEM] Spawning task subagent thread...` },
            { type: "output", text: `[AGENT] Received query: "${userQuery}"` },
            { type: "output", text: `[AGENT] Thinking... executing pinecone vector lookup...` },
            { type: "output", text: `[AGENT-RESPONSE] Hello! I'm MrBowis' automated agent. He is a forward-thinking AI developer specializing in automated pipelines, reactive frontends, and Linux integrations. Type 'projects' or 'skills' to find out more!` }
          ]);
        }
        break;
      case "exit":
        if (matrixMode) {
          setMatrixMode(false);
          setHistory([...newHistory, { type: "output", text: "Matrix simulation terminated." }]);
        } else {
          setHistory([...newHistory, { type: "output", text: "Cannot exit terminal mode." }]);
        }
        break;
      default:
        setHistory([
          ...newHistory,
          { type: "output", text: `bash: command not found: ${primaryCmd}. Type 'help' for suggestions.` }
        ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "Escape" && matrixMode) {
      setMatrixMode(false);
      setHistory([...history, { type: "output", text: "Matrix simulation terminated." }]);
    }
  };

  return (
    <div className="relative bg-[#050505] p-3 border border-[#004411] rounded text-[#00ff66] font-terminal text-sm h-full flex flex-col overflow-hidden min-h-64 shadow-[inset_0_0_10px_rgba(0,68,17,0.3)]">
      {matrixMode ? (
        // Matrix Rain Mode Overlay
        <div className="absolute inset-0 z-30 bg-[#050505] cursor-pointer" onClick={() => setMatrixMode(false)}>
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute top-2 right-2 bg-neutral-900 border border-red-800 text-red-500 font-pixel text-xs px-2 py-0.5 animate-pulse">
            PRESS CANVAS OR ESC TO TERMINATE
          </div>
        </div>
      ) : null}

      {/* Console Output logs */}
      <div ref={consoleContainerRef} className="flex-1 overflow-y-auto space-y-1.5 pr-2 mb-2">
        {history.map((log, index) => {
          if (log.type === "input") {
            return (
              <div key={index} className="flex gap-2">
                <span className="text-[#00aa44] font-bold">mrbowis@archlinux ~ $</span>
                <span className="text-[#fff]">{log.text}</span>
              </div>
            );
          } else {
            return (
              <pre key={index} className="whitespace-pre-wrap leading-relaxed font-terminal">
                {log.text}
              </pre>
            );
          }
        })}
      </div>

      {/* Shell Input prompt */}
      <div className="flex items-center gap-2 border-t border-[#002208] pt-2 mt-auto bg-[#050505] z-10 shrink-0">
        <span className="text-[#00aa44] font-bold shrink-0">mrbowis@archlinux ~ $</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-[#fff] outline-none border-none caret-[#00ff66] focus:ring-0 focus:outline-none p-0 font-terminal placeholder-[#003311] placeholder:opacity-50"
          placeholder="type your query..."
          autoComplete="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
