const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\s*title: "Conversational AI Bot",[\s\S]*?bg: "rgba\(245,158,11,0\.05\)"\s*\}/m;

const replacement = `{
                            title: "Autonomous AI Assistant",
                            desc: "A single, intelligent bot that replaces manual searching through PDFs and portals.",
                            icon: MessageSquare,
                            color: "text-corpCyan",
                            badge: "AI-Powered",
                            border: "border-corpCyan/40",
                            bg: "rgba(0,229,255,0.05)"
                          },
                          {
                            title: "Natural Language Interface",
                            desc: "Agents can type questions in everyday language instead of using complex search filters.",
                            icon: Target,
                            color: "text-emerald-400",
                            badge: "Conversational",
                            border: "border-emerald-400/40",
                            bg: "rgba(16,185,129,0.05)"
                          },
                          {
                            title: "Smart Contextual Search",
                            desc: "Instantly understands exactly what the agent needs and finds the precise contact.",
                            icon: Brain,
                            color: "text-purple-400",
                            badge: "Semantic Priority",
                            border: "border-purple-400/40",
                            bg: "rgba(168,85,247,0.05)"
                          },
                          {
                            title: "Unified Knowledgebase",
                            desc: "Searches across all departments, locations, and organizations simultaneously.",
                            icon: Layers,
                            color: "text-blue-400",
                            badge: "Centralized Data",
                            border: "border-blue-400/40",
                            bg: "rgba(59,130,246,0.05)"
                          },
                          {
                            title: "Instant Contact Discovery",
                            desc: "Delivers sub-second results, drastically reducing customer hold times and agent stress.",
                            icon: Zap,
                            color: "text-amber-400",
                            badge: "Sub-Second Speed",
                            border: "border-amber-400/40",
                            bg: "rgba(245,158,11,0.05)"
                          }`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Solution details clarified!");
} else {
  console.log("Regex failed");
}
