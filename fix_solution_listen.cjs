const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\s*title: "Autonomous AI Assistant",[\s\S]*?bg: "rgba\(245,158,11,0\.05\)"\s*\}/m;

const replacement = `{
                            title: "Live Call Listening",
                            desc: "AI actively listens to the ongoing call and transcribes the conversation in real-time.",
                            icon: Mic,
                            color: "text-corpCyan",
                            badge: "Real-Time Audio",
                            border: "border-corpCyan/40",
                            bg: "rgba(0,229,255,0.05)"
                          },
                          {
                            title: "Proactive Data Retrieval",
                            desc: "Automatically fetches relevant contact details and prices without the agent typing anything.",
                            icon: Zap,
                            color: "text-amber-400",
                            badge: "Zero-Touch Search",
                            border: "border-amber-400/40",
                            bg: "rgba(245,158,11,0.05)"
                          },
                          {
                            title: "Smart Context Understanding",
                            desc: "Understands the customer's exact issue and filters data intelligently.",
                            icon: Brain,
                            color: "text-purple-400",
                            badge: "Semantic AI",
                            border: "border-purple-400/40",
                            bg: "rgba(168,85,247,0.05)"
                          },
                          {
                            title: "Unified Knowledgebase",
                            desc: "Instantly pulls information from all departments, portals, and PDFs into one screen.",
                            icon: Layers,
                            color: "text-blue-400",
                            badge: "Centralized Data",
                            border: "border-blue-400/40",
                            bg: "rgba(59,130,246,0.05)"
                          },
                          {
                            title: "Live Agent HUD",
                            desc: "Presents the exact answer directly to the agent's screen instantly, eliminating hold times.",
                            icon: Eye,
                            color: "text-emerald-400",
                            badge: "Instant Assist",
                            border: "border-emerald-400/40",
                            bg: "rgba(16,185,129,0.05)"
                          }`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Updated Proposed Solution for Live Listening!");
} else {
  console.log("Regex failed");
}
