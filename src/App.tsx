import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Clock, Brain, Zap, Sparkles,
  XCircle, CheckCircle2, Search, Target, Layers, MessageSquare,
  Briefcase, HeartHandshake, Coins, Building2, 
  Cpu,  Maximize, Minimize,
  RotateCcw, AlertTriangle, Headphones, Mic,
  Radio, Activity, Users, Eye, Timer, Rocket
} from 'lucide-react';

const SLIDES = [
  { id: 0, title: "Overview", tag: "Cover" },
  { id: 1, title: "01) The Problem", tag: "01" },
  { id: 2, title: "02) Proposed Solution", tag: "02" },
  { id: 3, title: "03) Key Benefits", tag: "03" },
  { id: 4, title: "Live Search Demo", tag: "Demo" },
  { id: 5, title: "04) How We Will Build It", tag: "04" },
  { id: 6, title: "05) Market Potential", tag: "05" },
  { id: 7, title: "06) What We Need", tag: "06" },
  { id: 8, title: "Conclusion", tag: "Summary" }
];

const TOTAL_SLIDES = SLIDES.length;

// Section 1: Old Search System Problems
const CHARACTER_SIMULATION_STEPS = [
  {
    step: 1,
    char: "P",
    matchesCount: "1,420 matches",
    elapsed: "00:07s",
    shiftsCount: 1,
    alertText: "Screen updates too fast. Too many results.",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    problemTitle: "Results change while typing, causing confusion",
    problemIcon: <Search className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Packaging & Supplies HQ", dept: "Logistics Dept", ext: "1102", status: "Not a person" },
      { name: "Pathirana, D.B.", dept: "Customer Care Unit", ext: "5421", status: "Wrong department" },
      { name: "Perera, A.K.", dept: "Administration", ext: "4120", status: "Unclear division" },
      { name: "Perera, B.N.", dept: "Finance Division", ext: "3310", status: "Wrong location" }
    ]
  },
  {
    step: 2,
    char: "Pe",
    matchesCount: "680 matches",
    elapsed: "00:15s",
    shiftsCount: 2,
    alertText: "Screen jumps! Hard to read the names.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Too many similar names make it hard to choose",
    problemIcon: <Users className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Personnel Division", dept: "Corporate HR HQ", ext: "9001", status: "General line only" },
      { name: "Peter, M.L.", dept: "IT Infrastructure", ext: "7742", status: "Wrong contact" },
      { name: "Perera, C.W.", dept: "Regional Warehouse", ext: "6109", status: "Wrong branch" },
      { name: "Petroleum Advisory", dept: "External Relations", ext: "2201", status: "Irrelevant" }
    ]
  },
  {
    step: 3,
    char: "Per",
    matchesCount: "310 matches",
    elapsed: "00:24s",
    shiftsCount: 3,
    alertText: "Screen jumps again! Agent loses track.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Hard to find the right person quickly",
    problemIcon: <Eye className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Perera, D.S.", dept: "Branch Billing", ext: "4811", status: "Wrong person" },
      { name: "Perry, L.A.", dept: "Fleet Operations", ext: "2190", status: "Wrong section" },
      { name: "Perera, G.K.", dept: "Network Maintenance", ext: "3911", status: "Is this Kandy?" },
      { name: "Perera, H.M.", dept: "Legal Advisory", ext: "5020", status: "Unrelated" }
    ]
  },
  {
    step: 4,
    char: "Perera",
    matchesCount: "48 Identical Names",
    elapsed: "00:42s",
    shiftsCount: 4,
    alertText: "Too many similar names! Hard to find the correct person.",
    badgeClass: "bg-red-500/30 text-red-300 border-red-500/60 animate-pulse",
    problemTitle: "Searching takes too much time, making customers wait",
    problemIcon: <Timer className="w-10 h-10 md:w-12 md:h-12 text-rose-500 drop-shadow-md" />,
    rows: [
      { name: "Perera, K.A.D.", dept: "General Pool (Dept: ???)", ext: "4120", status: "Ambiguous" },
      { name: "Perera, K.M.", dept: "Regional Office (Unknown)", ext: "8812", status: "Ambiguous" },
      { name: "Perera, K.S.", dept: "Maintenance (Kandy or Colombo?)", ext: "3911", status: "Target contact?" },
      { name: "Perera, M.T.", dept: "Network Services (Inactive?)", ext: "1042", status: "Time wasted" }
    ]
  },
  {
    step: 5,
    char: "FAIL",
    matchesCount: "Business Impact",
    elapsed: "01:20s",
    shiftsCount: 5,
    alertText: "Manual searching wastes time and hurts business.",
    badgeClass: "bg-corpCyan/20 text-corpCyan border-corpCyan/40 animate-pulse",
    problemTitle: "Why It Matters",
    problemIcon: <Clock className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Delays customer issue resolution", dept: "Customer Experience", ext: "KPI", status: "Impact" },
      { name: "Reduces employee productivity", dept: "Operations", ext: "KPI", status: "Impact" },
      { name: "Increases Average Handling Time", dept: "Support", ext: "KPI", status: "Impact" },
      { name: "Frustration in urgent lookups", dept: "User Experience", ext: "KPI", status: "Impact" }
    ],
    isWhyItMatters: true
  }
];

// Section 2: Human Agent with System Processing Animation Stages
const EMBEDDED_SOFTPHONE_STAGES = [
  {
    id: 0,
    title: "1. Incoming Call",
    tag: "Listening to Customer",
    callerVoice: "Customer: 'What are the prices for the SLT Fibre unlimited packages?'",
    softphoneStatus: "Active Call • Inbound 1912",
    pulseRate: "pulse-fast",
    aiState: "Listening to Audio stream...",
    highlight: "audio",
    contactReady: false
  },
  {
    id: 1,
    title: "2. System Processing",
    tag: "Audio Processing",
    callerVoice: "System hears the voice...",
    softphoneStatus: "Audio Channel 01 • Live VoIP Stream",
    pulseRate: "pulse-normal",
    aiState: "Softphone audio routed directly to Neural AI Core",
    highlight: "softphone",
    contactReady: false
  },
  {
    id: 2,
    title: "3. Understanding Customer",
    tag: "AI Processing",
    callerVoice: "Intent: [SLT Fibre] [Unlimited Packages] [Product]",
    softphoneStatus: "Internal AI Copilot • 99% Confidence",
    pulseRate: "pulse-cyan",
    aiState: "No typing needed • AI gets the data",
    highlight: "ai",
    contactReady: true
  },
  {
    id: 3,
    title: "4. Instant Answer",
    tag: "Problem Solved",
    callerVoice: "Agent: 'The Unlimited 10 package is Rs. 4,490...'",
    softphoneStatus: "Resolved in 00:09s • AHT Reduced",
    pulseRate: "pulse-success",
    aiState: "Answer is shown directly on screen!",
    highlight: "hud",
    contactReady: true
  }
];

const Particles = () => {
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1.5 + 'px',
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    baseOpacity: Math.random() * 0.4 + 0.1,
    yAnim: Math.random() * -140 - 50,
    xAnim: (Math.random() - 0.5) * 50,
    targetOpacity: Math.random() * 0.8 + 0.2,
    duration: Math.random() * 14 + 10,
    delay: Math.random() * 8,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-corpCyan rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            opacity: p.baseOpacity,
          }}
          animate={{
            y: [0, p.yAnim],
            x: [0, p.xAnim],
            opacity: [0, p.targetOpacity, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Section 1: Agent Brain Overload — Softphone inside the Head visualization
const AgentBrainOverload = ({ stepIdx, setStepIdx, setAuto }: any) => {
  const steps = CHARACTER_SIMULATION_STEPS;

  const s = steps[stepIdx];
  const chaos = stepIdx / (steps.length - 1); // 0→1 as chaos escalates



  return (
    <div
      className="glass-card rounded-2xl border-2 border-rose-500/40 bg-gradient-to-b from-rose-950/30 via-[#0A0515]/80 to-[#050010]/90 flex flex-col flex-1 min-h-0 shadow-[0_0_50px_rgba(244,63,94,0.2)] relative overflow-hidden"
    >
      {/* Subtle red ambient pulse behind whole card */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: stepIdx === 3
            ? ['inset 0 0 40px rgba(244,63,94,0.08)', 'inset 0 0 70px rgba(244,63,94,0.2)', 'inset 0 0 40px rgba(244,63,94,0.08)']
            : 'none'
        }}
        transition={{ duration: 0.9, repeat: Infinity }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-rose-500/20">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-rose-400" />
            Agent is confused and stressed
          </span>
        </div>
        <button
          onClick={() => { setStepIdx(0); setAuto(true); }}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono text-slate-400 border border-white/10 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>

      {/* Step Pills row */}
      <div className="flex gap-1.5 items-center px-4 pt-2.5">
        <span className="text-[9px] uppercase font-bold text-slate-500 mr-1">Typed:</span>
        {steps.map((st, i) => (
          <button
            key={i}
            onClick={() => { setStepIdx(i); setAuto(false); }}
            className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${stepIdx === i
              ? 'bg-rose-500 text-white shadow-[0_0_10px_rgba(244,63,94,0.7)] scale-110'
              : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white'
              }`}
          >
            &ldquo;{st.char}&rdquo;
          </button>
        ))}
        <span className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${s.badgeClass}`}>
          {s.matchesCount}
        </span>
      </div>

      <div className="flex flex-1 min-h-0 items-center justify-center relative px-2 py-1">
        <svg
          viewBox="0 0 360 265"
          className="w-full h-full"
          style={{ filter: `drop-shadow(0 0 ${12 + chaos * 30}px rgba(244,63,94,${0.3 + chaos * 0.4}))` }}
        >
          {/* ── Background Tech Grid ── */}
          <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,229,255,0.06)" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />

          {/* ── Rotating Tech Rings (Background) ── */}
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ originX: '180px', originY: '118px' }}>
            <circle cx="180" cy="118" r="110" fill="none" stroke={`rgba(0,229,255,${0.1 - chaos * 0.05})`} strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="180" cy="118" r="130" fill="none" stroke={`rgba(244,63,94,${chaos * 0.25})`} strokeWidth="2" strokeDasharray="20 40" />
          </motion.g>

          <motion.g animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ originX: '180px', originY: '118px' }}>
            <circle cx="180" cy="118" r="100" fill="none" stroke={`rgba(0,229,255,${0.15 - chaos * 0.1})`} strokeWidth="0.5" strokeDasharray="2 4" />
          </motion.g>

          {/* ── Head Base ── */}
          {/* Glowing aura */}
          <motion.ellipse cx="180" cy="118" rx="85" ry="105"
            fill="none" stroke={`rgba(${244 * chaos}, ${200 * (1 - chaos)}, 255, ${0.1 + chaos * 0.2})`} strokeWidth="20"
            style={{ filter: 'blur(15px)' }}
          />

          <path d="M 60 265 Q 82 215, 118 205 Q 138 200, 152 197 L 208 197 Q 222 200, 242 205 Q 278 215, 300 265 Z"
            fill="rgba(6,10,25,0.95)" stroke="rgba(0,229,255,0.2)" strokeWidth="1.5" />
          <ellipse cx="180" cy="118" rx="76" ry="90" fill="rgba(4,8,20,0.98)" stroke="rgba(0,229,255,0.4)" strokeWidth="2" />

          {/* Cybernetic details on head */}
          <path d="M 110 50 L 250 50 M 105 118 L 255 118" stroke="rgba(0,229,255,0.15)" strokeWidth="1" strokeDasharray="8 6" />
          <path d="M 180 28 L 180 60" stroke="rgba(0,229,255,0.5)" strokeWidth="2" />
          <circle cx="180" cy="60" r="3" fill="rgba(0,229,255,0.8)" />

          {/* ── Neural Brain Core ── */}
          <clipPath id="brain-clip">
            <ellipse cx="180" cy="85" rx="65" ry="55" />
          </clipPath>
          <g clipPath="url(#brain-clip)">
            {/* Pulsing background */}
            <motion.rect x="100" y="20" width="160" height="130"
              fill={`rgba(${244 * chaos}, ${63 * (1 - chaos)}, ${94 + 160 * (1 - chaos)}, ${0.1 + chaos * 0.3})`}
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1 - chaos * 0.8, repeat: Infinity }}
            />
            {/* Neural Nodes & Connections */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.circle key={`node-${i}`}
                cx={120 + (i * 27) % 120} cy={40 + (i * 19) % 90} r={1.5 + (i % 3)}
                fill={stepIdx >= 2 ? '#F43F5E' : '#00E5FF'}
                animate={{ opacity: [0.2, 0.9, 0.2] }}
                transition={{ duration: 0.5 + (i % 3) * 0.2, repeat: Infinity, delay: (i % 5) * 0.1 }}
              />
            ))}
            {/* Network lines */}
            <path d="M 130 50 L 160 80 L 210 60 L 230 90 L 190 110 L 140 90 M 150 70 L 180 95 L 220 75"
              fill="none" stroke={stepIdx >= 2 ? "rgba(244,63,94,0.5)" : "rgba(0,229,255,0.3)"} strokeWidth="1" />
          </g>
          <ellipse cx="180" cy="85" rx="65" ry="55" fill="none" stroke={stepIdx >= 2 ? "rgba(244,63,94,0.7)" : "rgba(0,229,255,0.4)"} strokeWidth="2" strokeDasharray="5 5" />

          {/* ── Eyes (Digital Visor) ── */}
          <rect x="130" y="145" width="100" height="18" rx="9" fill="rgba(0,0,0,0.9)" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5" />
          <motion.rect x="142" y="152" width="28" height="4" rx="2"
            fill={stepIdx >= 2 ? '#F43F5E' : '#00E5FF'}
            style={{ filter: `drop-shadow(0 0 6px ${stepIdx >= 2 ? '#F43F5E' : '#00E5FF'})` }}
            animate={stepIdx >= 3 ? { x: [-3, 3, -3] } : {}} transition={{ duration: 0.12, repeat: Infinity }}
          />
          <motion.rect x="190" y="152" width="28" height="4" rx="2"
            fill={stepIdx >= 2 ? '#F43F5E' : '#00E5FF'}
            style={{ filter: `drop-shadow(0 0 6px ${stepIdx >= 2 ? '#F43F5E' : '#00E5FF'})` }}
            animate={stepIdx >= 3 ? { x: [3, -3, 3] } : {}} transition={{ duration: 0.12, repeat: Infinity }}
          />

          {/* ── Stress / Overload Meters (Cheeks/Jaw) ── */}
          <path d="M 120 155 A 70 70 0 0 0 145 195" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeLinecap="round" />
          <motion.path d="M 120 155 A 70 70 0 0 0 145 195" fill="none"
            stroke={stepIdx >= 2 ? '#F43F5E' : '#00E5FF'} strokeWidth="4" strokeLinecap="round"
            strokeDasharray="100" strokeDashoffset={100 - (chaos * 100)}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />

          <path d="M 240 155 A 70 70 0 0 1 215 195" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeLinecap="round" />
          <motion.path d="M 240 155 A 70 70 0 0 1 215 195" fill="none"
            stroke={stepIdx >= 2 ? '#F43F5E' : '#00E5FF'} strokeWidth="4" strokeLinecap="round"
            strokeDasharray="100" strokeDashoffset={100 - (chaos * 100)}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />

          {/* ── Advanced Holographic Search UI (Projected from brain) ── */}
          <motion.g
            animate={stepIdx >= 2 ? {
              x: [0, -4, 4, -2, 3, 0],
              y: [0, 3, -3, 4, -2, 0]
            } : {}}
            transition={{ duration: 0.35, repeat: Infinity, ease: "linear" }}
          >
            {/* Projection beams */}
            <polygon points="180,95 90,40 270,40" fill="rgba(0,229,255,0.04)" />

            {/* Main Holographic Panel */}
            <rect x="80" y="30" width="200" height="95" rx="8"
              fill="rgba(10,15,30,0.85)"
              stroke={stepIdx >= 2 ? "rgba(244,63,94,0.8)" : "rgba(0,229,255,0.6)"}
              strokeWidth="1.5"
            />

            {/* Search Bar */}
            <rect x="90" y="40" width="180" height="18" rx="4" fill="rgba(255,255,255,0.05)" stroke={stepIdx >= 2 ? "rgba(244,63,94,0.5)" : "rgba(255,255,255,0.15)"} />
            <text x="100" y="53" fill="white" fontSize="11" fontFamily="monospace" fontWeight="bold">
              <tspan fill={stepIdx >= 2 ? "#F43F5E" : "#00E5FF"}>&gt;</tspan> {s.char}
              <motion.tspan animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>_</motion.tspan>
            </text>
            <text x="210" y="53" fill={stepIdx >= 2 ? "#F43F5E" : "#00E5FF"} fontSize="9" fontFamily="monospace" fontWeight="bold">
              [{stepIdx === 0 ? '1420' : stepIdx === 1 ? '680' : stepIdx === 2 ? '310' : '48!!'}]
            </text>

            {/* Holographic Results */}
            <g transform="translate(90, 65)">
              <AnimatePresence mode="wait">
                <motion.g key={stepIdx}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.15 }}
                >
                  {s.rows.slice(0, 3).map((row, ri) => (
                    <g key={ri} transform={`translate(0, ${ri * 17})`}>
                      <rect width="180" height="14" rx="3" fill={`rgba(${stepIdx >= 2 ? '244,63,94' : '0,229,255'}, ${0.1 + ri * 0.05 + chaos * 0.1})`} />
                      <text x="5" y="10" fill="rgba(255,255,255,0.95)" fontSize="8" fontFamily="monospace">
                        {row.name.length > 22 ? row.name.slice(0, 22) + '…' : row.name}
                      </text>
                      <text x="175" y="10" textAnchor="end" fill={stepIdx >= 2 ? "rgba(244,63,94,0.9)" : "rgba(0,229,255,0.7)"} fontSize="7.5" fontFamily="monospace">
                        EXT:{row.ext}
                      </text>
                    </g>
                  ))}
                </motion.g>
              </AnimatePresence>
            </g>
          </motion.g>

          {/* ── Warning/Error Banners overlapping at high chaos ── */}
          {stepIdx >= 2 && (
            <motion.g
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 0.25, repeat: Infinity }}
              style={{ originX: '180px', originY: '115px' }}
            >
              <rect x="100" y="100" width="160" height="30" rx="4" fill="rgba(244,63,94,0.95)" style={{ filter: 'drop-shadow(0 0 15px rgba(244,63,94,0.9))' }} />
              <text x="180" y="120" textAnchor="middle" fill="white" fontSize="14" fontWeight="black" fontFamily="sans-serif" letterSpacing="3">
                COGNITIVE OVERLOAD
              </text>
            </motion.g>
          )}

          {stepIdx === 3 && (
            <motion.g
              animate={{ opacity: [0, 1, 0], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 0.35, repeat: Infinity }}
              style={{ originX: '180px', originY: '77px' }}
            >
              <rect x="120" y="65" width="120" height="24" rx="3" fill="none" stroke="#F43F5E" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 0 8px red)' }} />
              <text x="180" y="81" textAnchor="middle" fill="#F43F5E" fontSize="12" fontWeight="bold">MULTIPLE MATCHES</text>
            </motion.g>
          )}

          {/* ── Bionic Headset ── */}
          <path d="M 106 116 Q 106 50, 180 44 Q 254 50, 254 116" fill="none" stroke="rgba(0,229,255,0.6)" strokeWidth="3" strokeLinecap="round" />
          {/* Ear cups */}
          <rect x="90" y="105" width="22" height="35" rx="6" fill="rgba(4,8,20,0.98)" stroke="rgba(0,229,255,0.8)" strokeWidth="2" />
          <rect x="248" y="105" width="22" height="35" rx="6" fill="rgba(4,8,20,0.98)" stroke="rgba(0,229,255,0.8)" strokeWidth="2" />
          {/* Equalizer bars on ear cups */}
          <g transform="translate(94, 112)">
            <motion.rect x="0" y="0" width="2.5" height="20" fill="#00E5FF" animate={{ y: [0, 10, 0], height: [20, 10, 20] }} transition={{ duration: 0.35, repeat: Infinity }} />
            <motion.rect x="5" y="5" width="2.5" height="15" fill="#00E5FF" animate={{ y: [5, 0, 5], height: [15, 20, 15] }} transition={{ duration: 0.45, repeat: Infinity }} />
            <motion.rect x="10" y="10" width="2.5" height="10" fill="#00E5FF" animate={{ y: [10, 5, 10], height: [10, 15, 10] }} transition={{ duration: 0.25, repeat: Infinity }} />
          </g>
          {/* Mic */}
          <path d="M 100 135 C 120 165, 140 170, 155 170" fill="none" stroke="rgba(0,229,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="155" cy="170" r="4.5" fill="#00E5FF" />
          <motion.circle cx="155" cy="170" r="8" fill="none" stroke="#00E5FF" strokeWidth="1.5" animate={{ r: [8, 16], opacity: [1, 0] }} transition={{ duration: 1.2, repeat: Infinity }} />
        </svg>
      </div>

      {/* Alert banner */}
      <motion.div
        key={s.step + '-alert'}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-3 mb-2 px-3 py-1.5 rounded-lg bg-rose-500/12 border border-rose-500/25 text-[11px] font-medium text-rose-200 flex items-center gap-2"
      >
        <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
        <span>{s.alertText}</span>
      </motion.div>

      {/* Bottom stats */}
      <div className="grid grid-cols-3 gap-2 px-3 pb-3 font-mono">
        <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">
          <span className="text-[9px] text-slate-400 uppercase block">UI Shifts</span>
          <span className="text-rose-400 font-bold text-sm">{s.shiftsCount}x</span>
        </div>
        <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">
          <span className="text-[9px] text-slate-400 uppercase block">Hold Time</span>
          <span className="text-amber-400 font-bold text-sm">{s.elapsed}</span>
        </div>
        <div className="bg-white/5 p-1.5 rounded-lg border border-white/5 text-center">
          <span className="text-[9px] text-slate-400 uppercase block">Brain State</span>
          <span className={`font-bold text-[10px] block ${stepIdx < 2 ? 'text-amber-300' : stepIdx < 3 ? 'text-rose-300' : 'text-rose-400'}`}>
            {stepIdx === 0 ? '🙁 Confused' : stepIdx === 1 ? '😟 Frustrated' : stepIdx === 2 ? '😩 Overloaded' : '🔥 Meltdown'}
          </span>
        </div>
      </div>
    </div>
  );
};

// Section 2: Human Agent with System Processing Animation Component
export const EmbeddedSoftphoneAgent = () => {
  const [stageIdx, setStageIdx] = useState(0);
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setStageIdx((prev) => (prev + 1) % EMBEDDED_SOFTPHONE_STAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [autoCycle]);

  const current = EMBEDDED_SOFTPHONE_STAGES[stageIdx];

  return (
    <div className="glass-card p-0 rounded-2xl border-0 bg-transparent flex flex-col justify-between relative overflow-hidden h-full shadow-none">
      {/* HUD Border Overlay */}
      <div className="absolute inset-0 border-2 border-corpCyan/20 rounded-2xl pointer-events-none" style={{ clipPath: 'polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%)' }}></div>
      <div className="absolute top-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-corpCyan/80 to-transparent"></div>

      {/* Background Cyber-Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-corpCyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="p-5 md:p-6 flex-1 flex flex-col z-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-corpCyan/20 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-corpCyan opacity-75"></span>
              <span className="relative flex items-center justify-center rounded-full h-4 w-4 bg-corpCyan/20 border border-corpCyan text-corpCyan">
                <div className="w-1.5 h-1.5 bg-corpCyan rounded-full"></div>
              </span>
            </div>
            <span className="text-sm md:text-base font-extrabold uppercase tracking-widest text-white flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
              <Activity className="w-5 h-5 text-corpCyan" />
              CYBERNETIC SOFTPHONE SYNC
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded bg-corpCyan/10 border border-corpCyan/30 text-corpCyan font-bold uppercase tracking-widest">
              SYS_ID: BIONIC_001
            </span>
          </div>
        </div>

        {/* Stage Switcher */}
        <div className="grid grid-cols-4 gap-2 mb-6 relative z-30">
          {EMBEDDED_SOFTPHONE_STAGES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => { setStageIdx(idx); setAutoCycle(false); }}
              className={`relative py-1.5 px-2 rounded-none text-[10px] md:text-[11px] font-bold font-mono tracking-widest uppercase transition-all overflow-hidden border ${stageIdx === idx
                ? 'bg-corpCyan/10 border-corpCyan text-corpCyan shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                : 'bg-white/[0.02] border-white/10 text-slate-500 hover:text-white hover:border-white/30'
                }`}
            >
              {stageIdx === idx && (
                <motion.div
                  layoutId="activeStageGlow"
                  className="absolute inset-0 bg-gradient-to-r from-corpCyan/0 via-corpCyan/20 to-corpCyan/0 pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
              {s.title}
            </button>
          ))}
        </div>

        {/* Bionic Human Canvas */}
        <div className="relative flex-1 bg-[#020611] rounded-xl border border-white/5 overflow-hidden flex items-center justify-center p-4">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwgMjQwLCAyNTUsIDAuMSkiLz48L3N2Zz4=')] opacity-30"></div>

          {/* Holographic Wireframe SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300">
            <defs>
              <filter id="glowCyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="bodyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Rotating Data Rings behind Head */}
            <g transform="translate(200, 50)">
              <motion.circle cx="0" cy="0" r="45" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="1" strokeDasharray="4 8" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
              <motion.circle cx="0" cy="0" r="55" fill="none" stroke="rgba(0,240,255,0.1)" strokeWidth="1" strokeDasharray="20 10 5 10" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
            </g>

            {/* Human Head & Torso Mesh */}
            <path d="M 200 15 C 220 15, 235 30, 235 50 C 235 70, 220 85, 200 85 C 180 85, 165 70, 165 50 C 165 30, 180 15, 200 15 Z" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="2 4" filter="url(#glowCyan)" />
            <path d="M 130 140 Q 160 100, 190 100 L 210 100 Q 240 100, 270 140 L 300 300 L 100 300 Z" fill="url(#bodyGradient)" stroke="#00F0FF" strokeWidth="1.5" opacity="0.6" filter="url(#glowCyan)" />

            {/* Cybernetic Implants / Nodes */}
            <circle cx="170" cy="50" r="10" fill="rgba(0,240,255,0.2)" stroke="#00F0FF" strokeWidth="2" filter="url(#glowCyan)" />
            <circle cx="230" cy="50" r="10" fill="rgba(0,240,255,0.2)" stroke="#00F0FF" strokeWidth="2" filter="url(#glowCyan)" />

            {/* Neural Data Pathways (Head to Core) */}
            <motion.path
              d="M 170 60 Q 185 100, 200 140"
              fill="none" stroke="#00F0FF" strokeWidth="3"
              strokeDasharray="10 10"
              animate={{ strokeDashoffset: [20, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              filter="url(#glowCyan)"
            />
            <motion.path
              d="M 230 60 Q 215 100, 200 140"
              fill="none" stroke="#00F0FF" strokeWidth="3"
              strokeDasharray="10 10"
              animate={{ strokeDashoffset: [20, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              filter="url(#glowCyan)"
            />
          </svg>

          {/* Softphone Core Embedded in Chest */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-[95%] max-w-[420px] mt-16 bg-[#030712]/80 rounded-none border border-corpCyan/40 p-4 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.2)]"
            style={{
              clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'
            }}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-corpCyan"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-corpCyan"></div>

            {/* Core Header */}
            <div className="flex items-center justify-between pb-3 border-b border-corpCyan/20 mb-3">
              <div className="flex items-center gap-2 text-xs text-white">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse-glow" />
                <span className="font-mono text-emerald-400 tracking-widest text-xs uppercase">{current.softphoneStatus}</span>
              </div>
              <span className="text-[9px] font-mono bg-corpCyan/10 border border-corpCyan/30 text-corpCyan px-2 py-0.5 uppercase tracking-widest">
                INTERNAL_CORE_V2
              </span>
            </div>

            {/* Audio Stream Visualizer */}
            <div className="bg-black/50 p-2.5 border border-white/5 mb-3 flex items-center justify-between relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-corpCyan/50"></div>
              <div className="flex items-center gap-3 pl-2">
                <Mic className="w-4 h-4 text-corpCyan animate-pulse" />
                <span className="text-xs font-mono text-slate-300">
                  {current.callerVoice}
                </span>
              </div>
              <div className="flex items-center gap-1 h-4 opacity-80">
                {[14, 28, 18, 34, 16, 24, 12, 20].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [8, h, 8] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                    className="w-1.5 bg-corpCyan"
                  />
                ))}
              </div>
            </div>

            {/* HUD Call Actions */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              <div className="py-1.5 bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 text-center uppercase hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                Mute_Tx
              </div>
              <div className="py-1.5 bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 text-center uppercase hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                Hold_Q
              </div>
              <div className="py-1.5 bg-white/5 border border-white/10 text-[10px] font-mono text-slate-400 text-center uppercase hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                XFER_P
              </div>
              <div className="py-1.5 bg-rose-500/20 border border-rose-500/40 text-[10px] font-mono text-rose-300 font-bold text-center uppercase shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                L_1912
              </div>
            </div>

            {/* AI HUD Resolution */}
            <AnimatePresence mode="wait">
              {current.contactReady ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-corpCyan/10 border border-corpCyan p-3 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-corpCyan/20 blur-xl"></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-corpCyan uppercase tracking-widest block mb-1">
                        &gt;&gt; INTENT_LOCKED
                      </span>
                      <span className="text-sm font-sans font-black text-white tracking-wide block">
                        Fibre Unlimited Packages
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        [SLT Fibre] [Product]
                      </span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-sm font-mono font-black text-corpCyan bg-black/50 px-2.5 py-1 border border-corpCyan/30 mb-1 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                        Rs. 4,490
                      </span>
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Auto-Generated
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="p-4 border border-white/5 bg-black/30 text-center flex items-center justify-center h-[76px]">
                  <span className="text-xs font-mono text-corpCyan/60 animate-pulse tracking-widest uppercase">
                    {current.aiState}
                  </span>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 pt-3 border-t border-corpCyan/20 flex items-center justify-between text-[11px] font-mono text-corpCyan/70 uppercase tracking-widest">
          <span>// Biometric Integration Active</span>
          <span className="flex items-center gap-2">
            Empathy: Human <span className="w-1 h-1 bg-corpCyan rounded-full"></span> Speed: Machine
          </span>
        </div>
      </div>
    </div>
  );
};

const ImplementationAnimation = ({ stepIdx }: { stepIdx: number }) => {
  return (
    <div className="h-full w-full relative flex flex-col justify-center items-center overflow-hidden bg-black/20 rounded-2xl border border-white/10 p-6 md:p-10 backdrop-blur-md shadow-2xl">
      {/* Dynamic Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`impl-bg-${stepIdx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none mix-blend-screen"
          style={{ backgroundImage: `url('/implementation/${stepIdx + 1}.jpg')` }}
        />
      </AnimatePresence>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>

      <div className="absolute top-4 left-4 text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> Implementation Phases
      </div>

      <AnimatePresence mode="wait">
        {/* Phase 1: Discover & Design */}
        {stepIdx === 0 && (
          <motion.div
            key="0"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto"
          >
            <div className="w-20 h-20 shrink-0 rounded-full border-4 border-blue-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.4)] mb-4">
              <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin" style={{ animationDuration: '4s' }}></div>
              <Brain className="w-8 h-8 text-blue-500 drop-shadow-lg" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Discover & Design</h3>
            <div className="space-y-2 w-full text-left">
              {[
                "Processes English, Sinhala & Singlish",
                "Understands conversational intent",
                "No exact keywords required"
              ].map((item, i) => (
                <div key={i} className="bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 drop-shadow-sm" />
                  <span className="text-xs md:text-sm font-bold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase 2: Build & Integrate */}
        {stepIdx === 1 && (
          <motion.div
            key="1"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto"
          >
            <div className="w-20 h-20 shrink-0 rounded-full border-4 border-corpCyan/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,229,255,0.4)] mb-4">
              <div className="absolute inset-0 rounded-full border-t-4 border-corpCyan animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
              <Layers className="w-8 h-8 text-corpCyan drop-shadow-lg" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Build & Integrate</h3>
            <div className="space-y-2 w-full text-left">
              {[
                "Integrates Active Directory",
                "Connects HRIS & Regional Branches",
                "Real-time dynamic index"
              ].map((item, i) => (
                <div key={i} className="bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-corpCyan shrink-0 drop-shadow-sm" />
                  <span className="text-xs md:text-sm font-bold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase 3: Pilot Testing */}
        {stepIdx === 2 && (
          <motion.div
            key="2"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto"
          >
            <div className="w-20 h-20 shrink-0 rounded-full border-4 border-purple-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4">
              <div className="absolute inset-0 rounded-full border-t-4 border-purple-500 animate-pulse"></div>
              <Target className="w-8 h-8 text-purple-500 drop-shadow-lg" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Pilot Testing</h3>
            <div className="space-y-2 w-full text-left">
              {[
                "Embedded in 1912 CRM",
                "Sub-second verified results",
                "Employee intranet widget"
              ].map((item, i) => (
                <div key={i} className="bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 drop-shadow-sm" />
                  <span className="text-xs md:text-sm font-bold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase 4: Enterprise Rollout */}
        {stepIdx === 3 && (
          <motion.div
            key="3"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto"
          >
            <div className="w-20 h-20 shrink-0 rounded-full border-4 border-emerald-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4">
              <div className="absolute inset-0 rounded-full border-t-4 border-emerald-500 animate-spin" style={{ animationDuration: '5s' }}></div>
              <Rocket className="w-8 h-8 text-emerald-500 drop-shadow-lg" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">Enterprise Rollout</h3>
            <div className="space-y-2 w-full text-left">
              <div className="bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-corpCyan text-black font-black flex items-center justify-center shrink-0 text-xs">1</div>
                <span className="text-xs md:text-sm font-bold text-slate-200">Phase 1: Contact Centre Pilot</span>
              </div>
              <div className="bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-400 text-white font-black flex items-center justify-center shrink-0 text-xs">2</div>
                <span className="text-xs md:text-sm font-bold text-slate-200">Phase 2: Enterprise Expansion</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4 Removed (Moved to slide 8) */}
      </AnimatePresence>
    </div>
  );
};

const BusinessROIAnimation = ({ stepIdx }: { stepIdx: number }) => {
  return (
    <div className="h-full w-full relative flex flex-col justify-center items-center overflow-hidden bg-black/20 rounded-2xl border border-white/10 p-6 md:p-10 backdrop-blur-md shadow-2xl">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>

      <div className="absolute top-4 left-4 text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live Metrics Simulation
      </div>

      <AnimatePresence mode="wait">
        {stepIdx === 0 && (
          <motion.div
            key="0"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative z-10 flex flex-col items-center text-center w-full max-w-sm"
          >
            <div className="w-20 h-20 shrink-0 rounded-full border-4 border-corpCyan/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(0,229,255,0.4)] mb-4">
              <div className="absolute inset-0 rounded-full border-t-4 border-corpCyan animate-spin" style={{ animationDuration: '3s' }}></div>
              <Zap className="w-8 h-8 text-corpCyan drop-shadow-lg" />
            </div>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-corpCyan mb-1">Search Speed Optimization</span>
            <span className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.8)] mb-4">+65%</span>

            <div className="w-full h-2 md:h-3 bg-white/10 rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                className="h-full bg-corpCyan shadow-[0_0_15px_rgba(0,229,255,0.8)]"
              />
            </div>

            <div className="space-y-2 w-full text-left">
              {[
                "Faster contact lookup",
                "Reduced employee effort",
                "Improved internal collaboration"
              ].map((item, i) => (
                <div key={i} className="bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-corpCyan shrink-0 drop-shadow-sm" />
                  <span className="text-xs md:text-sm font-bold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stepIdx === 1 && (
          <motion.div
            key="1"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative z-10 flex flex-col items-center text-center w-full max-w-sm"
          >
            <div className="w-20 h-20 shrink-0 rounded-full border-4 border-blue-400/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(59,130,246,0.4)] mb-4">
              <div className="absolute inset-0 rounded-full border-t-4 border-blue-400 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
              <HeartHandshake className="w-8 h-8 text-blue-400 drop-shadow-lg" />
            </div>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-blue-400 mb-1">Customer Satisfaction (CSAT)</span>
            <span className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] mb-4">+35%</span>

            <div className="w-full h-2 md:h-3 bg-white/10 rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                className="h-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
              />
            </div>

            <div className="space-y-2 w-full text-left">
              {[
                "Faster issue resolution",
                "Reduced customer waiting time",
                "Improved first-contact resolution"
              ].map((item, i) => (
                <div key={i} className="bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 drop-shadow-sm" />
                  <span className="text-xs md:text-sm font-bold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stepIdx === 2 && (
          <motion.div
            key="2"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative z-10 flex flex-col items-center text-center w-full max-w-sm"
          >
            <div className="w-20 h-20 shrink-0 rounded-full border-4 border-emerald-400/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-4">
              <div className="absolute inset-0 rounded-full border-t-4 border-emerald-400 animate-spin" style={{ animationDuration: '2.5s' }}></div>
              <Activity className="w-8 h-8 text-emerald-400 drop-shadow-lg" />
            </div>
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-emerald-400 mb-1">AHT / Operating Overhead</span>
            <span className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] mb-4">-40%</span>

            <div className="w-full h-2 md:h-3 bg-white/10 rounded-full overflow-hidden flex justify-end mb-6">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '40%' }}
                transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
                className="h-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
              />
            </div>

            <div className="space-y-2 w-full text-left">
              {[
                "Less time spent searching",
                "Increased workforce productivity",
                "Reduced operating cost per interaction"
              ].map((item, i) => (
                <div key={i} className="bg-black/40 p-2 md:p-3 rounded-lg border border-white/5 flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 drop-shadow-sm" />
                  <span className="text-xs md:text-sm font-bold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating particles */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 right-16 w-2 h-2 rounded-full bg-corpCyan shadow-[0_0_15px_rgba(0,229,255,1)]"
      />
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-16 left-24 w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)]"
      />
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-32 right-32 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,1)]"
      />
    </div>
  );
};

export const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [titleCentered, setTitleCentered] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setTitleCentered(true);
    const timer = setTimeout(() => setTitleCentered(false), 1200);
    return () => clearTimeout(timer);
  }, [currentSlide]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync state for Slide 1 Problem & Animation
  const [slide1StepIdx, setSlide1StepIdx] = useState(0);
  const [slide1Auto, setSlide1Auto] = useState(false);

  // Sync state for Slide 2 Proposed Solution
  const [slide2StepIdx, setSlide2StepIdx] = useState(0);
  const [slide2Auto, setSlide2Auto] = useState(false);

  // Sync state for Slide 3 Business Value
  const [slide3StepIdx, setSlide3StepIdx] = useState(0);

  // Sync state for Slide 5 Implementation
  const [slide5StepIdx, setSlide5StepIdx] = useState(0);

  useEffect(() => {
    if (currentSlide !== 1 || !slide1Auto) return;
    const t = setInterval(() => setSlide1StepIdx(p => (p + 1) % CHARACTER_SIMULATION_STEPS.length), 3000);
    return () => clearInterval(t);
  }, [currentSlide, slide1Auto]);

  useEffect(() => {
    if (currentSlide !== 2 || !slide2Auto) return;
    const t = setInterval(() => setSlide2StepIdx(p => (p + 1) % 5), 3000);
    return () => clearInterval(t);
  }, [currentSlide, slide2Auto]);

  // Demo state for interactive slide 4
  // const [demoQuery, setDemoQuery] = useState("Need contact for fiber maintenance in Kandy");
  // const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  /* const sampleQueries = [
    {
      query: "I want the number for the Bank of Ceylon, Kandy branch",
      feature: "Natural Language Search",
      match: {
        name: "Bank of Ceylon",
        role: "Primary Contact",
        dept: "Kandy Branch",
        location: "Kandy",
        phone: "Rs. 4,490",
        ext: "boc.kandy@boc.lk",
        status: "Directory Result"
      }
    },
    {
      query: "What are the prices for the unlimited data packages?",
      feature: "Smart Result Identification",
      match: {
        name: "Fibre Unlimited Packages",
        role: "Unlimited 10: Rs. 4,490 | Unlimited 25: Rs. 6,490",
        dept: "Product Match",
        location: "Islandwide Coverage",
        phone: "-",
        ext: "-",
        status: "Available"
      }
    },
    {
      query: "Can you tell me more about the unlimited Home packages?",
      feature: "Single Search: Products, Dept & Org",
      match: {
        name: "Unlimited Home Packages",
        role: "Home: Rs. 5,900 (100Mbps) | Home Plus: Rs. 9,900",
        dept: "SLT Fibre",
        location: "Nugegoda Area",
        phone: "-",
        ext: "-",
        status: "Coverage Available"
      }
    }
  ]; */

  // Fullscreen Listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else {
      document.exitFullscreen().catch(() => { });
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'Space', 'Enter', 'PageDown'].includes(e.key)) {
        nextSlide();
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        prevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const goToSlide = (index: number) => setCurrentSlide(index);

  const slideVariants: any = {
    initial: { opacity: 0, rotateY: 20, rotateX: 10, scale: 0.92, z: -200 },
    animate: { opacity: 1, rotateY: 0, rotateX: 0, scale: 1, z: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, rotateY: -20, rotateX: -10, scale: 0.92, z: -200, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-corpBlue flex flex-col justify-between select-none font-sans text-slate-100" style={{ perspective: '1200px' }}>
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-corpBlue"
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <div className="scanlines" />
            <Particles />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center z-10"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-16 h-16 rounded-2xl bg-corpCyan/20 border border-corpCyan/40 flex items-center justify-center text-corpCyan mb-6 shadow-[0_0_30px_rgba(0,229,255,0.4)]"
              >
                <Sparkles className="w-8 h-8 animate-pulse" />
              </motion.div>
              <motion.h1 
                layoutId="app-title" 
                className="text-5xl md:text-7xl font-black tracking-widest uppercase text-white flex flex-col md:flex-row items-center gap-3 md:gap-4 mb-4 drop-shadow-2xl text-center"
              >
                Smart <span className="text-gradient">PEARL</span>
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="h-1 w-48 bg-white/10 rounded-full overflow-hidden mt-4"
              >
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-corpCyan to-transparent"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="scanlines" />
      {/* Background Animated Gradient Mesh and Particles */}
      <Particles />
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #00E5FF 1px, transparent 1px), linear-gradient(to bottom, #00E5FF 1px, transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 100%)'
        }}
      />

      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[15%] -left-[10%] w-[60vw] h-[60vw] bg-blue-900/30 rounded-full blur-[130px] pointer-events-none z-0"
      />
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[65vw] h-[65vw] bg-teal-900/25 rounded-full blur-[130px] pointer-events-none z-0"
      />

      {/* TOP HEADER: Full Page Progress & Navigation Bar */}
      <header className="relative z-30 w-full px-6 md:px-12 py-3 border-b border-white/10 bg-corpLightBlue/80 backdrop-blur-xl flex items-center justify-between shrink-0 shadow-lg">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-corpCyan/20 border border-corpCyan/40 flex items-center justify-center text-corpCyan shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            {!showSplash && (
              <motion.h1 layoutId="app-title" className="font-black text-base md:text-lg tracking-wider uppercase text-white flex items-center gap-2">
                Smart <span className="text-gradient">PEARL</span>
              </motion.h1>
            )}
            {showSplash && <div className="h-6 md:h-7" />}
            <span className="text-[10px] text-corpCyan/80 font-mono tracking-widest uppercase block -mt-0.5">
              SLT Innovation Pitch 2026
            </span>
          </div>
        </div>

        {/* Center: Creative Slide Switcher Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-[#050B14]/80 p-1.5 rounded-full border border-corpCyan/20 backdrop-blur-xl shadow-[0_0_30px_rgba(0,229,255,0.1)] relative z-50">
          {SLIDES.map((slide, i) => {
            const isActive = currentSlide === i;
            return (
              <div key={slide.id} className="relative group">
                <button
                  onClick={() => {
                    if (slide.id === 4) {
                      window.open('https://slt-smart-directory-assistant-beta.vercel.app/dashboard', '_blank');
                    } else {
                      goToSlide(i);
                    }
                  }}
                  className={`relative flex items-center justify-center h-8 transition-all duration-300 ease-out cursor-pointer rounded-full ${isActive
                    ? 'px-4 lg:px-5 bg-gradient-to-r from-corpCyan to-blue-500 text-white shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'w-8 lg:w-10 bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/5'
                    }`}
                >
                  <span className={`text-[10px] lg:text-xs whitespace-nowrap ${isActive ? 'font-black tracking-wide' : 'font-bold'}`}>
                    {isActive ? slide.title : slide.tag}
                  </span>
                </button>

                {/* Tooltip for inactive slides */}
                {!isActive && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-3 py-1.5 bg-[#0A0F1C] border border-corpCyan/30 text-corpCyan text-[11px] font-bold whitespace-nowrap rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-[0_4px_20px_rgba(0,229,255,0.2)] translate-y-2 group-hover:translate-y-0 z-50">
                    {slide.title}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0A0F1C] border-t border-l border-corpCyan/30 rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Fullscreen & Progress */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300">
            Slide <span className="text-corpCyan font-extrabold text-sm">{currentSlide + 1}</span> of {TOTAL_SLIDES}
          </div>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-corpCyan/20 hover:text-corpCyan border border-white/10 text-xs font-semibold transition-all cursor-pointer"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Full' : 'Full Screen'}</span>
          </button>
        </div>

        {/* Thin top accent indicator */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-corpCyan via-blue-500 to-teal-400 w-full transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }}
        />
      </header>

      {/* MAIN VIEWPORT */}
      <main className="relative z-20 flex-1 min-h-0 w-full max-w-[1700px] mx-auto px-6 md:px-10 lg:px-16 py-3 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full flex-1 min-h-0 flex flex-col"
          >
            {/* ======================================================== */}
            {/* SLIDE 0: TITLE / HERO COVER                              */}
            {/* ======================================================== */}
            {currentSlide === 0 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto py-4">
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-corpCyan/40 bg-corpCyan/10 text-corpCyan text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                >
                  <Sparkles className="w-4 h-4" />
                  SLT Innovation Pitch 2026 • Smart AI Assistant
                </motion.div>

                <motion.h1
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight text-white leading-none drop-shadow-2xl flex flex-col gap-2"
                >
                  <span className="text-corpCyan text-3xl md:text-4xl lg:text-5xl block -mb-2 tracking-widest font-extrabold uppercase drop-shadow-none">Smart AI Assistant</span>
                  Smart PEARL
                </motion.h1>

                <motion.p
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl lg:text-3xl text-slate-200 font-light mb-8 max-w-4xl leading-relaxed"
                >
                  Use AI to transform the traditional directory into an <br className="hidden md:inline" />
                  <span className="text-corpCyan font-bold underline decoration-corpCyan/50 decoration-4 underline-offset-8">
                    intelligent search assistant
                  </span>.
                </motion.p>

                {/* Team Members List */}
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap justify-center gap-3 mb-10"
                >
                  {["Team Member 01", "Team Member 02", "Team Member 03"].map((name, idx) => (
                    <div key={idx} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold flex items-center gap-2 shadow-lg backdrop-blur-md">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-corpCyan to-blue-500 flex items-center justify-center text-[10px] text-white font-black">{idx + 1}</div>
                      {name}
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 border-t border-white/10 text-left"
                >
                  <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-corpCyan/40 transition-colors">
                    <span className="text-rose-400 text-xs font-mono font-bold uppercase tracking-wider block mb-1">
                      01 / The Challenge
                    </span>
                    <h2 className="text-white font-extrabold text-lg">Problem & Opportunity</h2>
                    <p className="text-sm text-slate-300 mt-1">Solve character-filtering hassle and search friction.</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-corpCyan/40 transition-colors">
                    <span className="text-corpCyan text-xs font-mono font-bold uppercase tracking-wider block mb-1">
                      02 / The Breakthrough
                    </span>
                    <h2 className="text-white font-extrabold text-lg">Proposed Solution</h2>
                    <p className="text-sm text-slate-300 mt-1">5 Key conversational innovations with in-system softphone.</p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-corpCyan/40 transition-colors">
                    <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider block mb-1">
                      03 / The ROI
                    </span>
                    <h2 className="text-white font-extrabold text-lg">Business Value & Benefits</h2>
                    <p className="text-sm text-slate-300 mt-1">Operational efficiency, CSAT boost & cost savings.</p>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 1: 01) PROBLEM / OPPORTUNITY                       */}
            {/* ======================================================== */}
            {currentSlide === 1 && (
              <div className="flex flex-col flex-1 min-h-0 gap-2 py-1">

                {/* ── TOP: Title + Quote ── */}
                <div className="min-h-[4rem] mb-2 relative z-50">
                  <AnimatePresence>
                    {titleCentered ? (
                      <motion.div
                        key="center"
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      >
                        <motion.div layoutId="slide1-title" className="flex items-center gap-4 scale-150 origin-center bg-black/40 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
                          <span className="px-3 py-1 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider shrink-0">
                            Section 01
                          </span>
                          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            Problem / <span className="text-gradient">Opportunity</span>
                          </h2>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="top"
                        layoutId="slide1-title"
                        className="flex items-center gap-3 shrink-0 origin-left"
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                      >
                        <span className="px-3 py-1 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider shrink-0">
                          Section 01
                        </span>
                        <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                          Problem / <span className="text-gradient">Opportunity</span>
                        </h2>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>



                {/* ── MAIN GRID: fills remaining height ── */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">

                  {/* LEFT: Problems + Why It Matters */}
                  <div className="lg:col-span-5 flex flex-col gap-2 min-h-0">

                    <span className="text-rose-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                      <XCircle className="w-3.5 h-3.5 text-rose-400" /> Problems Identified
                    </span>

                    <div className="flex flex-col gap-1.5 flex-1 min-h-[160px] relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={slide1StepIdx}
                          initial={{ opacity: 0, x: -30, scale: 0.95, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, x: 30, scale: 0.95, filter: 'blur(10px)' }}
                          transition={{ duration: 0.4, type: "spring", stiffness: 250, damping: 25 }}
                          className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md"
                          style={{
                            background: slide1StepIdx >= 2 ? 'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(10,5,21,0.9) 100%)' : 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(5,13,26,0.9) 100%)',
                            border: `1px solid ${slide1StepIdx >= 2 ? 'rgba(244,63,94,0.4)' : 'rgba(0,229,255,0.3)'}`,
                            clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                          }}
                        >
                          {/* Grid Background Overlay */}
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-50 pointer-events-none"></div>

                          {/* Decorative Corner Accents */}
                          <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${slide1StepIdx >= 2 ? 'border-rose-500' : 'border-corpCyan'}`}></div>
                          <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 ${slide1StepIdx >= 2 ? 'border-rose-500' : 'border-corpCyan'}`}></div>

                          {/* Animated Warning Stripes if Critical */}
                          {slide1StepIdx >= 2 && (
                            <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden opacity-50">
                              <motion.div
                                animate={{ x: [0, 40] }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-[200%] h-full flex"
                                style={{
                                  background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #F43F5E 10px, #F43F5E 20px)'
                                }}
                              />
                            </div>
                          )}

                          {/* Header Tag */}
                          <div className="relative z-10 flex items-center gap-2 mb-2">
                            <span className="relative flex h-2 w-2">
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${slide1StepIdx >= 2 ? 'bg-rose-500' : 'bg-corpCyan'}`}></span>
                              <span className={`relative inline-flex rounded-full h-2 w-2 ${slide1StepIdx >= 2 ? 'bg-rose-500' : 'bg-corpCyan'}`}></span>
                            </span>
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${slide1StepIdx >= 2 ? 'text-rose-400' : 'text-corpCyan'}`}>
                              {CHARACTER_SIMULATION_STEPS[slide1StepIdx].isWhyItMatters ? 'SYS_LOG // ANALYSIS: WHY IT MATTERS' : `SYS_LOG // ISSUE DETECTED_0${slide1StepIdx + 1}`}
                            </span>
                          </div>

                          {/* Problem Content */}
                          <div className="relative z-10 flex-1 flex flex-col justify-center gap-3">
                            <div className="flex items-center gap-4">
                              <span className="text-4xl md:text-5xl drop-shadow-lg shrink-0">
                                {CHARACTER_SIMULATION_STEPS[slide1StepIdx].problemIcon}
                              </span>
                              <span className="text-xl md:text-3xl font-black text-white leading-tight">
                                {CHARACTER_SIMULATION_STEPS[slide1StepIdx].problemTitle}
                              </span>
                            </div>
                            {CHARACTER_SIMULATION_STEPS[slide1StepIdx].isWhyItMatters && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                {[
                                  "Delays customer issue resolution",
                                  "Reduces employee productivity",
                                  "Increases Average Handling Time (AHT)",
                                  "Frustration during urgent contact lookup"
                                ].map((t, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                                    className="flex items-center gap-3 bg-white/5 p-2 md:p-2.5 rounded-xl border border-white/10 shadow-sm hover:bg-white/10 transition-colors"
                                  >
                                    <div className="w-1.5 h-1.5 rounded-full bg-corpCyan shadow-[0_0_8px_rgba(0,229,255,0.8)] shrink-0"></div>
                                    <span className="font-semibold text-xs md:text-sm leading-snug text-slate-200">{t}</span>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Navigation & Progress */}
                          <div className="relative z-10 flex items-center justify-between mt-4 pt-4 w-full border-t border-white/10">
                            {/* Tactical Progress Dots */}
                            <div className="flex items-center gap-2">
                              {CHARACTER_SIMULATION_STEPS.map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-1.5 transition-all duration-300 ${i === slide1StepIdx
                                    ? `w-8 ${slide1StepIdx >= 2 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]' : 'bg-corpCyan shadow-[0_0_10px_rgba(0,240,255,0.6)]'}`
                                    : 'w-2 bg-white/20'
                                    }`}
                                  style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
                                />
                              ))}
                            </div>

                            {/* Manual Controls - Tactical Buttons */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSlide1Auto(false);
                                  setSlide1StepIdx(prev => Math.max(0, prev - 1));
                                }}
                                disabled={slide1StepIdx === 0}
                                className="group relative px-3 py-1.5 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-corpCyan disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white cursor-pointer overflow-hidden flex items-center gap-1.5"
                                style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                              >
                                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider hidden sm:block">Prev</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSlide1Auto(false);
                                  setSlide1StepIdx(prev => Math.min(CHARACTER_SIMULATION_STEPS.length - 1, prev + 1));
                                }}
                                disabled={slide1StepIdx === CHARACTER_SIMULATION_STEPS.length - 1}
                                className="group relative px-3 py-1.5 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-corpCyan disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white cursor-pointer overflow-hidden flex items-center gap-1.5"
                                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                              >
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider hidden sm:block">Next</span>
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>


                  </div>

                  {/* RIGHT: Brain Animation — fills full column height */}
                  <div className="lg:col-span-7 min-h-0 flex flex-col">
                    <AgentBrainOverload stepIdx={slide1StepIdx} setStepIdx={setSlide1StepIdx} auto={slide1Auto} setAuto={setSlide1Auto} />
                  </div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 2: 02) PROPOSED SOLUTION / INNOVATION              */}
            {/* (WITH EMBEDDED SOFTPHONE AGENT ANIMATION)                */}
            {/* ======================================================== */}
            {currentSlide === 2 && (
              <div className="flex flex-col h-full justify-between py-2">
                <div className="min-h-[4rem] mb-2 relative z-50">
                  <AnimatePresence>
                    {titleCentered ? (
                      <motion.div
                        key="center"
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      >
                        <motion.div layoutId="slide2-title" className="flex flex-col items-center gap-2 scale-150 origin-center bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-md bg-corpCyan/20 text-corpCyan border border-corpCyan/30 text-xs font-bold uppercase tracking-wider">
                              Section 02
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white text-center">
                              Proposed Solution / <span className="text-gradient">Innovation</span>
                            </h2>
                          </div>
                          <div className="text-sm uppercase font-extrabold text-corpCyan tracking-wider flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" /> Key Innovations & System Processing Architecture
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="top"
                        layoutId="slide2-title"
                        className="flex flex-col shrink-0 origin-left"
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-md bg-corpCyan/20 text-corpCyan border border-corpCyan/30 text-xs font-bold uppercase tracking-wider">
                            Section 02
                          </span>
                          <h2 className="text-3xl md:text-5xl font-black text-white">
                            Proposed Solution / <span className="text-gradient">Innovation</span>
                          </h2>
                        </div>
                        <div className="text-sm uppercase font-extrabold text-corpCyan tracking-wider mb-4 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Key Innovations & System Processing Architecture
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2-Column Split: Key Innovations (Left) vs System Processing Agent Animation (Right) */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
                  {/* Left Column (5 Cols): The 5 Key Innovations from Directory.txt */}
                  <div className="lg:col-span-5 flex flex-col min-h-0">
                    <div className="flex-1 flex flex-col justify-center relative min-h-[300px]">
                      <AnimatePresence mode="wait">
                        {[
                          {
                            title: "Natural Language Search",
                            desc: "Search using simple everyday language.",
                            icon: MessageSquare,
                            color: "text-corpCyan",
                            badge: "Everyday Language",
                            border: "border-corpCyan/40",
                            bg: "rgba(0,229,255,0.05)"
                          },
                          {
                            title: "Smart Result Identification",
                            desc: "AI finds and prioritizes the most relevant contact.",
                            icon: Target,
                            color: "text-emerald-400",
                            badge: "Semantic Priority",
                            border: "border-emerald-400/40",
                            bg: "rgba(16,185,129,0.05)"
                          },
                          {
                            title: "Single Search Experience",
                            desc: "Search people, departments, locations, and organizations from one place.",
                            icon: Layers,
                            color: "text-blue-400",
                            badge: "Unified Discovery",
                            border: "border-blue-400/40",
                            bg: "rgba(59,130,246,0.05)"
                          },
                          {
                            title: "Conversational Interface",
                            desc: "Users ask questions instead of using complex filters.",
                            icon: Brain,
                            color: "text-purple-400",
                            badge: "Zero Query Complexity",
                            border: "border-purple-400/40",
                            bg: "rgba(168,85,247,0.05)"
                          },
                          {
                            title: "Faster Contact Discovery",
                            desc: "Reduces time spent searching and improves productivity.",
                            icon: Zap,
                            color: "text-amber-400",
                            badge: "Sub-Second Results",
                            border: "border-amber-400/40",
                            bg: "rgba(245,158,11,0.05)"
                          }
                        ]
                          .filter((_, idx) => idx === slide2StepIdx)
                          .map((item) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, x: -30, scale: 0.95, filter: 'blur(10px)' }}
                              animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
                              exit={{ opacity: 0, x: 30, scale: 0.95, filter: 'blur(10px)' }}
                              transition={{ duration: 0.4, type: "spring", stiffness: 250, damping: 25 }}
                              className="absolute inset-0 p-8 md:p-10 border-2 shadow-2xl backdrop-blur-md flex flex-col justify-center items-start gap-6"
                              style={{
                                borderColor: item.color.split('-')[1] ? `var(--${item.color.split('-')[1]})` : '#00E5FF',
                                background: `linear-gradient(135deg, ${item.bg} 0%, rgba(5,13,26,0.9) 100%)`,
                                clipPath: 'polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)'
                              }}
                            >
                              {/* Decorative Corner Accents */}
                              <div className={`absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 ${item.color}`}></div>
                              <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 ${item.color}`}></div>

                              <span className={`text-[12px] md:text-[14px] font-mono uppercase font-black tracking-widest px-4 py-1.5 border-2 ${item.border} ${item.color} bg-black/40 shadow-sm rounded-md`}>
                                {item.badge}
                              </span>

                              <div className={`p-4 md:p-5 rounded-2xl bg-black/40 ${item.color} border border-white/10 shadow-[0_0_30px_currentColor] shrink-0`}>
                                <item.icon className="w-12 h-12 md:w-16 md:h-16 drop-shadow-md" />
                              </div>

                              <div>
                                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                                  {item.title}
                                </h3>
                                <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>

                    {/* Navigation & Progress for Slide 3 */}
                    <div className="relative z-10 flex items-center justify-between mt-auto pt-4 w-full border-t border-white/10">
                      {/* Tactical Progress Dots */}
                      <div className="flex items-center gap-2">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 transition-all duration-300 ${i === slide2StepIdx
                              ? 'w-8 bg-corpCyan shadow-[0_0_10px_rgba(0,240,255,0.6)]'
                              : 'w-2 bg-white/20'
                              }`}
                            style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
                          />
                        ))}
                      </div>

                      {/* Manual Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlide2Auto(false);
                            setSlide2StepIdx(prev => Math.max(0, prev - 1));
                          }}
                          disabled={slide2StepIdx === 0}
                          className="group relative px-3 py-1.5 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-corpCyan disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white cursor-pointer overflow-hidden flex items-center gap-1.5"
                          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                          <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider hidden sm:block">Prev</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSlide2Auto(false);
                            setSlide2StepIdx(prev => Math.min(4, prev + 1));
                          }}
                          disabled={slide2StepIdx === 4}
                          className="group relative px-3 py-1.5 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-corpCyan disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white cursor-pointer overflow-hidden flex items-center gap-1.5"
                          style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                        >
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider hidden sm:block">Next</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (7 Cols): Innovation Visualizations */}
                  <div className="lg:col-span-7 min-h-0 flex flex-col justify-center relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#050D1A]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={slide2StepIdx}
                        initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center p-2 md:p-4"
                      >
                        {/* Blurred background to fill empty spaces nicely */}
                        <img
                          src={`/innovations/${slide2StepIdx + 1}.jpg`}
                          alt=""
                          className="absolute inset-0 w-full h-full object-cover opacity-40 blur-2xl scale-110"
                        />

                        {/* Main uncropped image */}
                        <img
                          src={`/innovations/${slide2StepIdx + 1}.jpg`}
                          alt={`Innovation ${slide2StepIdx + 1}`}
                          className="relative z-10 w-full h-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
                        />
                      </motion.div>
                    </AnimatePresence>
                    {/* Dark gradient overlay to blend seamlessly */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#050D1A] pointer-events-none opacity-30 z-20"></div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 3: 03) BUSINESS VALUE & BENEFITS                   */}
            {/* ======================================================== */}
            {currentSlide === 3 && (
              <div className="flex flex-col h-full justify-between py-2">
                <div className="min-h-[4rem] mb-2 relative z-50">
                  <AnimatePresence>
                    {titleCentered ? (
                      <motion.div
                        key="center"
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      >
                        <motion.div layoutId="slide3-title" className="flex flex-col items-center gap-2 scale-150 origin-center bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                              Section 03
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black text-white text-center">
                              Business Value & <span className="text-gradient">Benefits</span>
                            </h2>
                          </div>
                          <p className="text-sm md:text-base text-slate-300 text-center">
                            Delivering measurable ROI across organizational productivity, customer experience, and operational costs.
                          </p>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="top"
                        layoutId="slide3-title"
                        className="flex flex-col shrink-0 origin-left"
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                            Section 03
                          </span>
                          <h2 className="text-4xl md:text-5xl font-black text-white">
                            Business Value & <span className="text-gradient">Benefits</span>
                          </h2>
                        </div>
                        <p className="text-sm md:text-base text-slate-300 mb-6">
                          Delivering measurable ROI across organizational productivity, customer experience, and operational costs.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch min-h-0">
                  {/* Left Column (5 Cols): The Active Pillar Large */}
                  <div className="lg:col-span-5 flex flex-col gap-4 min-h-0">

                    <div className="flex-1 relative">
                      <AnimatePresence mode="wait">
                        {/* Pillar 1: Operational Efficiency */}
                        {slide3StepIdx === 0 && (
                          <motion.div
                            key="0"
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col justify-between shadow-2xl backdrop-blur-md overflow-hidden p-6 md:p-10"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(5,13,26,0.9) 100%)',
                              border: '1px solid rgba(0,229,255,0.4)',
                              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                          >
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-corpCyan"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-corpCyan"></div>

                            <div className="relative z-10 flex-1 flex flex-col justify-center">
                              <div className="w-20 h-20 rounded-2xl bg-corpCyan/20 text-corpCyan flex items-center justify-center mb-8 border border-corpCyan/30 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                                <Briefcase className="w-10 h-10 drop-shadow-md" />
                              </div>
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">Operational Efficiency</h3>
                              <p className="text-sm md:text-base text-corpCyan font-extrabold uppercase tracking-widest mb-10 flex items-center gap-3">
                                <span className="w-2 h-2 bg-corpCyan rounded-full animate-pulse"></span> Internal Productivity
                              </p>

                              {/* Bullet points moved to right side */}
                            </div>
                          </motion.div>
                        )}

                        {/* Pillar 2: Customer Experience */}
                        {slide3StepIdx === 1 && (
                          <motion.div
                            key="1"
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col justify-between shadow-2xl backdrop-blur-md overflow-hidden p-6 md:p-10"
                            style={{
                              background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(5,13,26,0.9) 100%)',
                              border: '1px solid rgba(59,130,246,0.4)',
                              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                          >
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400"></div>

                            <div className="relative z-10 flex-1 flex flex-col justify-center">
                              <div className="w-20 h-20 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-8 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                                <HeartHandshake className="w-10 h-10 drop-shadow-md" />
                              </div>
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">Customer Experience</h3>
                              <p className="text-sm md:text-base text-blue-400 font-extrabold uppercase tracking-widest mb-10 flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span> Customer Care & Speed
                              </p>

                              {/* Bullet points moved to right side */}
                            </div>
                          </motion.div>
                        )}

                        {/* Pillar 3: Cost Savings */}
                        {slide3StepIdx === 2 && (
                          <motion.div
                            key="2"
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col justify-between shadow-2xl backdrop-blur-md overflow-hidden p-6 md:p-10"
                            style={{
                              background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,13,26,0.9) 100%)',
                              border: '1px solid rgba(16,185,129,0.4)',
                              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                          >
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400"></div>

                            <div className="relative z-10 flex-1 flex flex-col justify-center">
                              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                                <Coins className="w-10 h-10 drop-shadow-md" />
                              </div>
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">Cost Savings</h3>
                              <p className="text-sm md:text-base text-emerald-400 font-extrabold uppercase tracking-widest mb-10 flex items-center gap-3">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Bottom-Line Impact
                              </p>

                              {/* Bullet points moved to right side */}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Progress & Controls */}
                    <div className="relative z-10 flex items-center justify-between w-full p-4 glass-card rounded-xl border border-white/10 shrink-0 mt-2">
                      <div className="flex items-center gap-2">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className={`h-2 transition-all duration-300 ${i === slide3StepIdx
                              ? `w-12 ${i === 0 ? 'bg-corpCyan shadow-[0_0_10px_rgba(0,240,255,0.6)]' :
                                i === 1 ? 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]' :
                                  'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                              }`
                              : 'w-3 bg-white/20'
                              }`}
                            style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSlide3StepIdx(prev => Math.max(0, prev - 1))}
                          disabled={slide3StepIdx === 0}
                          className="group relative px-4 py-2 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-corpCyan disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white cursor-pointer overflow-hidden flex items-center gap-1.5"
                          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">Prev</span>
                        </button>
                        <button
                          onClick={() => setSlide3StepIdx(prev => Math.min(2, prev + 1))}
                          disabled={slide3StepIdx === 2}
                          className="group relative px-4 py-2 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-corpCyan disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white cursor-pointer overflow-hidden flex items-center gap-1.5"
                          style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                        >
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">Next</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (7 Cols): Animation */}
                  <div className="lg:col-span-7 flex flex-col justify-center min-h-0">
                    <BusinessROIAnimation stepIdx={slide3StepIdx} />
                  </div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 4: LIVE INTERACTIVE DIRECTORY SEARCH DEMO          */}
            {/* ======================================================== */}
            {currentSlide === 4 && (
              <div className="w-full h-full rounded-2xl overflow-hidden border border-corpCyan/40 shadow-[0_0_30px_rgba(0,229,255,0.2)] bg-black/50 p-1 relative">
                <button onClick={() => window.open('https://slt-smart-directory-assistant-beta.vercel.app/dashboard', '_blank')} className="absolute top-4 right-4 z-50 bg-corpCyan text-black px-4 py-2 font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                  <span className="text-xl">🚀</span> Open Full Screen
                </button>
                <iframe src="https://slt-smart-directory-assistant-beta.vercel.app/dashboard" className="w-full h-full rounded-xl border-none" title="Smart PEARL Demo" />
              </div>
            )}
            {/* ======================================================== */}
            {/* SLIDE 5: ARCHITECTURE & ROLLOUT ROADMAP                  */}
            {/* ======================================================== */}
            {currentSlide === 5 && (
              <div className="flex flex-col h-full justify-between py-2">
                <div className="min-h-[4rem] mb-8 relative z-50">
                  <AnimatePresence>
                    {titleCentered ? (
                      <motion.div
                        key="center"
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      >
                        <motion.div layoutId="slide5-title" className="flex flex-col items-center gap-2 scale-150 origin-center bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
                          <span className="inline-block w-fit px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                            Section 04
                          </span>
                          <h2 className="text-4xl md:text-5xl font-black text-white text-center">
                            Architecture & <span className="text-gradient">Rollout Roadmap</span>
                          </h2>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="top"
                        layoutId="slide5-title"
                        className="flex flex-col gap-2 shrink-0 origin-left"
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                      >
                        <span className="inline-block w-fit px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                          Section 04
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                          Architecture & <span className="text-gradient">Rollout Roadmap</span>
                        </h2>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 items-stretch min-h-0">
                  {/* Left Column (5 Cols): Active Pillar Large */}
                  <div className="lg:col-span-5 flex flex-col gap-4 min-h-0">

                    <div className="flex-1 relative">
                      <AnimatePresence mode="wait">
                        {/* Step 1: Natural Language Engine */}
                        {slide5StepIdx === 0 && (
                          <motion.div
                            key="0"
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col justify-between shadow-2xl backdrop-blur-md overflow-hidden p-6 md:p-10"
                            style={{
                              background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(5,13,26,0.9) 100%)',
                              border: '1px solid rgba(59,130,246,0.4)',
                              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                          >
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400"></div>

                            <div className="relative z-10 flex-1 flex flex-col justify-center">
                              <div className="w-20 h-20 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-8 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                                <Brain className="w-10 h-10 drop-shadow-md" />
                              </div>
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">Natural Language Engine</h3>
                              <p className="text-sm md:text-base text-blue-400 font-extrabold uppercase tracking-widest mb-10 flex items-center gap-3">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span> Contextual AI
                              </p>

                              {/* Bullet points moved to right side */}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Unified Directory Graph */}
                        {slide5StepIdx === 1 && (
                          <motion.div
                            key="1"
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col justify-between shadow-2xl backdrop-blur-md overflow-hidden p-6 md:p-10"
                            style={{
                              background: 'linear-gradient(135deg, rgba(0,229,255,0.1) 0%, rgba(5,13,26,0.9) 100%)',
                              border: '1px solid rgba(0,229,255,0.4)',
                              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                          >
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-corpCyan"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-corpCyan"></div>

                            <div className="relative z-10 flex-1 flex flex-col justify-center">
                              <div className="w-20 h-20 rounded-2xl bg-corpCyan/20 text-corpCyan flex items-center justify-center mb-8 border border-corpCyan/30 shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                                <Layers className="w-10 h-10 drop-shadow-md" />
                              </div>
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">Unified Directory Graph</h3>
                              <p className="text-sm md:text-base text-corpCyan font-extrabold uppercase tracking-widest mb-10 flex items-center gap-3">
                                <span className="w-2 h-2 bg-corpCyan rounded-full animate-pulse"></span> Single Source of Truth
                              </p>

                              {/* Bullet points moved to right side */}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Agent Desktop Copilot */}
                        {slide5StepIdx === 2 && (
                          <motion.div
                            key="2"
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col justify-between shadow-2xl backdrop-blur-md overflow-hidden p-6 md:p-10"
                            style={{
                              background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(5,13,26,0.9) 100%)',
                              border: '1px solid rgba(168,85,247,0.4)',
                              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                          >
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-400"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-400"></div>

                            <div className="relative z-10 flex-1 flex flex-col justify-center">
                              <div className="w-20 h-20 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-8 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                                <Cpu className="w-10 h-10 drop-shadow-md" />
                              </div>
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">Agent Desktop Copilot</h3>
                              <p className="text-sm md:text-base text-purple-400 font-extrabold uppercase tracking-widest mb-10 flex items-center gap-3">
                                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span> Seamless Workflow
                              </p>

                              {/* Bullet points moved to right side */}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 4: Roadmap */}
                        {slide5StepIdx === 3 && (
                          <motion.div
                            key="3"
                            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: 30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col justify-between shadow-2xl backdrop-blur-md overflow-hidden p-6 md:p-10"
                            style={{
                              background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,13,26,0.9) 100%)',
                              border: '1px solid rgba(16,185,129,0.4)',
                              clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                          >
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400"></div>

                            <div className="relative z-10 flex-1 flex flex-col justify-center">
                              <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-8 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                                <Rocket className="w-10 h-10 drop-shadow-md" />
                              </div>
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">Strategic Rollout Roadmap</h3>
                              <p className="text-sm md:text-base text-emerald-400 font-extrabold uppercase tracking-widest mb-10 flex items-center gap-3">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Phased Delivery
                              </p>

                              {/* Bullet points moved to right side */}
                            </div>
                          </motion.div>
                        )}


                      </AnimatePresence>
                    </div>

                    {/* Progress & Controls */}
                    <div className="relative z-10 flex items-center justify-between w-full p-4 glass-card rounded-xl border border-white/10 shrink-0 mt-2">
                      <div className="flex items-center gap-2">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-2 transition-all duration-300 ${i === slide5StepIdx
                              ? `w-10 ${i === 0 ? 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]' :
                                i === 1 ? 'bg-corpCyan shadow-[0_0_10px_rgba(0,240,255,0.6)]' :
                                  i === 2 ? 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]' :
                                    'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                              }`
                              : 'w-3 bg-white/20'
                              }`}
                            style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSlide5StepIdx(prev => Math.max(0, prev - 1))}
                          disabled={slide5StepIdx === 0}
                          className="group relative px-4 py-2 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white cursor-pointer overflow-hidden flex items-center gap-1.5"
                          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
                        >
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">Prev</span>
                        </button>
                        <button
                          onClick={() => setSlide5StepIdx(prev => Math.min(3, prev + 1))}
                          disabled={slide5StepIdx === 3}
                          className="group relative px-4 py-2 bg-black/40 hover:bg-white/10 border border-white/20 hover:border-blue-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-white cursor-pointer overflow-hidden flex items-center gap-1.5"
                          style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
                        >
                          <span className="text-xs font-mono font-bold uppercase tracking-wider">Next</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (7 Cols): Animation */}
                  <div className="lg:col-span-7 flex flex-col justify-center min-h-0">
                    <ImplementationAnimation stepIdx={slide5StepIdx} />
                  </div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 6: MARKET / CUSTOMER POTENTIAL                     */}
            {/* ======================================================== */}
            {/* ======================================================== */}
            {/* SLIDE 6: MARKET / CUSTOMER POTENTIAL                     */}
            {/* ======================================================== */}
            {currentSlide === 6 && (
              <div className="flex flex-col h-full py-4">
                <div className="min-h-[4rem] mb-8 relative z-50">
                  <AnimatePresence>
                    {titleCentered ? (
                      <motion.div
                        key="center"
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      >
                        <motion.div layoutId="slide6-title" className="flex flex-col items-center gap-2 scale-150 origin-center bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
                          <span className="inline-block w-fit px-3 py-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                            Market & Impact
                          </span>
                          <h2 className="text-4xl md:text-5xl font-black text-white text-center">
                            Target Users & <span className="text-gradient">Potential Impact</span>
                          </h2>
                          <div className="flex items-center justify-center gap-2 text-sm font-mono text-slate-400 mt-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                            Global Organization Reach
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="top"
                        layoutId="slide6-title"
                        className="flex items-center justify-between shrink-0 origin-left w-full"
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                      >
                        <div className="flex flex-col gap-2">
                          <span className="inline-block w-fit px-3 py-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
                            Market & Impact
                          </span>
                          <h2 className="text-4xl md:text-5xl font-black text-white">
                            Target Users & <span className="text-gradient">Potential Impact</span>
                          </h2>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 text-sm font-mono text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                          Global Organization Reach
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
                  {/* Target Users (7 Cols) */}
                  <div className="lg:col-span-7 glass-card rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors duration-700 pointer-events-none"></div>

                    <div className="flex items-center gap-4 mb-8 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        <Users className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-wide">Target Audiences</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                      {[
                        { name: "Contact Centre Associates", icon: <Headphones className="w-5 h-5" />, color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-400" },
                        { name: "Technical Support Teams", icon: <Cpu className="w-5 h-5" />, color: "from-corpCyan/20 to-corpCyan/5", border: "border-corpCyan/30", text: "text-corpCyan" },
                        { name: "Field Operations Teams", icon: <Radio className="w-5 h-5" />, color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/30", text: "text-emerald-400" },
                        { name: "Regional Offices", icon: <Building2 className="w-5 h-5" />, color: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/30", text: "text-amber-400" },
                        { name: "Managers & Executives", icon: <Briefcase className="w-5 h-5" />, color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/30", text: "text-purple-400" },
                        { name: "All SLT Employees", icon: <Users className="w-5 h-5" />, color: "from-rose-500/20 to-rose-500/5", border: "border-rose-500/30", text: "text-rose-400" }
                      ].map((user, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          className={`bg-gradient-to-br ${user.color} p-4 rounded-xl border ${user.border} flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer backdrop-blur-sm`}
                        >
                          <div className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center shrink-0 border border-white/5 ${user.text}`}>
                            {user.icon}
                          </div>
                          <span className="text-slate-200 font-bold text-sm md:text-base leading-tight">{user.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Potential Impact (5 Cols) */}
                  <div className="lg:col-span-5 glass-card rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden group flex flex-col">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none"></div>

                    <div className="flex items-center gap-4 mb-8 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Activity className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-black text-white tracking-wide">Potential Impact</h3>
                    </div>

                    <div className="flex-1 flex flex-col justify-center space-y-5 relative z-10">
                      {[
                        { title: "Organization-wide productivity improvement", highlight: "Productivity", icon: <Activity className="w-6 h-6" /> },
                        { title: "Faster communication across departments", highlight: "Communication", icon: <MessageSquare className="w-6 h-6" /> },
                        { title: "Scalable AI platform for future SLT initiatives", highlight: "Scalability", icon: <Brain className="w-6 h-6" /> }
                      ].map((impact, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 + 0.3, type: "spring" }}
                          className="relative p-5 rounded-xl border border-emerald-500/20 bg-black/40 hover:bg-emerald-500/10 transition-colors overflow-hidden group/item"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500/50 group-hover/item:w-2 transition-all"></div>
                          <div className="flex items-center gap-4 pl-2">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover/item:scale-110 transition-transform">
                              {impact.icon}
                            </div>
                            <div>
                              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mb-1">{impact.highlight}</div>
                              <div className="text-sm md:text-base font-bold text-slate-200 leading-snug">{impact.title}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 7: SUPPORT REQUIRED & NEXT STEPS                   */}
            {/* ======================================================== */}
            {currentSlide === 7 && (
              <div className="flex flex-col h-full py-4">
                <div className="min-h-[4rem] mb-8 relative z-50">
                  <AnimatePresence>
                    {titleCentered ? (
                      <motion.div
                        key="center"
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                      >
                        <motion.div layoutId="slide7-title" className="flex flex-col items-center gap-2 scale-150 origin-center bg-black/40 p-5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl">
                          <span className="inline-block w-fit px-3 py-1 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
                            Requirements
                          </span>
                          <h2 className="text-4xl md:text-5xl font-black text-white text-center">
                            Support Required & <span className="text-gradient">Next Steps</span>
                          </h2>
                          <div className="flex items-center justify-center gap-2 text-sm font-mono text-slate-400 mt-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                            Resource Planning
                          </div>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="top"
                        layoutId="slide7-title"
                        className="flex items-center justify-between shrink-0 origin-left w-full"
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                      >
                        <div className="flex flex-col gap-2">
                          <span className="inline-block w-fit px-3 py-1 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
                            Requirements
                          </span>
                          <h2 className="text-4xl md:text-5xl font-black text-white">
                            Support Required & <span className="text-gradient">Next Steps</span>
                          </h2>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-sm font-mono text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                          Resource Planning
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 items-stretch">
                  {/* Technical Support */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-colors flex flex-col relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <Cpu className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-white">Technical Support</h3>
                    </div>

                    <div className="space-y-4 flex-1 relative z-10">
                      {[
                        "Access to the existing directory database",
                        "IT and Digital Services collaboration",
                        "AI development and integration support",
                        "System testing and deployment assistance"
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (i * 0.1) }}
                          className="flex items-start gap-3 bg-black/40 p-3 rounded-xl border border-white/5 hover:bg-blue-500/10 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 drop-shadow-md" />
                          <span className="text-sm md:text-base font-bold text-slate-200">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Business Support */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="glass-card rounded-2xl p-6 border border-white/10 hover:border-emerald-500/50 transition-colors flex flex-col relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-colors duration-700 pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <HeartHandshake className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-white">Business Support</h3>
                    </div>

                    <div className="space-y-4 flex-1 relative z-10">
                      {[
                        "User feedback from Contact Centre and other departments",
                        "Stakeholder sponsorship and approval",
                        "Cross-functional participation during pilot testing"
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1) }}
                          className="flex items-start gap-3 bg-black/40 p-3 rounded-xl border border-white/5 hover:bg-emerald-500/10 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 drop-shadow-md" />
                          <span className="text-sm md:text-base font-bold text-slate-200">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Resources Required */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="glass-card rounded-2xl p-6 border border-white/10 hover:border-corpCyan/50 transition-colors flex flex-col relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-corpCyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-corpCyan/20 transition-colors duration-700 pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-corpCyan/20 flex items-center justify-center text-corpCyan border border-corpCyan/30 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                        <Layers className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-white">Resources Required</h3>
                    </div>

                    <div className="space-y-4 flex-1 relative z-10">
                      {[
                        "AI platform and development tools",
                        "Directory data access and maintenance",
                        "Project team for design, development, and testing"
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + (i * 0.1) }}
                          className="flex items-start gap-3 bg-black/40 p-3 rounded-xl border border-white/5 hover:bg-corpCyan/10 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-corpCyan shrink-0 mt-0.5 drop-shadow-md" />
                          <span className="text-sm md:text-base font-bold text-slate-200">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Next Steps */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="glass-card rounded-2xl p-6 border border-white/10 hover:border-rose-500/50 transition-colors flex flex-col relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/20 transition-colors duration-700 pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-500 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                        <Search className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-white">Next Steps</h3>
                    </div>

                    <div className="space-y-4 flex-1 relative z-10">
                      {[
                        "Fault Reporting Integration (Zero-touch CX)",
                        "Knowledge Hub Integration",
                        "Billing & Troubleshooting AI Agent"
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                          className="flex items-start gap-3 bg-black/40 p-3 rounded-xl border border-white/5 hover:bg-rose-500/10 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5 drop-shadow-md" />
                          <span className="text-sm md:text-base font-bold text-slate-200">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 8: CONCLUSION & SUMMARY                            */}
            {/* ======================================================== */}
            {currentSlide === 8 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto py-4">
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  className="mb-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-corpCyan/40 bg-corpCyan/10 text-corpCyan text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                >
                  <Sparkles className="w-4 h-4" />
                  Smart PEARL • Summary & Next Steps
                </motion.div>

                <motion.h2
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight text-white leading-tight"
                >
                  Smart PEARL <br /><span className="text-gradient">Transformation</span>
                </motion.h2>

                <motion.p
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-slate-300 font-light mb-10 max-w-3xl leading-relaxed"
                >
                  From character-by-character search hassle to an <br className="hidden md:inline" />
                  <span className="text-corpCyan font-bold">Intelligent Conversational Search Assistant</span>
                </motion.p>

                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10 text-left"
                >
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-rose-400 font-mono text-xs font-bold uppercase">01 / The Problem</span>
                    <h4 className="text-white font-extrabold text-base mt-1.5">Character-Matching Frustration</h4>
                    <p className="text-sm text-slate-300 mt-1">Changing results, similar names, lost time, high AHT.</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-corpCyan font-mono text-xs font-bold uppercase">02 / The Innovation</span>
                    <h4 className="text-white font-extrabold text-base mt-1.5">AI Search Assistant</h4>
                    <p className="text-sm text-slate-300 mt-1">Natural language, smart prioritization, single search experience.</p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-emerald-400 font-mono text-xs font-bold uppercase">03 / The Value</span>
                    <h4 className="text-white font-extrabold text-base mt-1.5">Measurable Business ROI</h4>
                    <p className="text-sm text-slate-300 mt-1">Operational efficiency, customer satisfaction, cost reduction.</p>
                  </div>
                </motion.div>

                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <h3 className="text-5xl md:text-6xl font-black text-white tracking-wide">
                    Thank You.
                  </h3>
                  <p className="text-sm md:text-base text-slate-400 mt-2 font-mono">
                    Contact Center Team • Reference: ISP/S/2026/40/179
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* BOTTOM CONTROLS DOCK: Edge-to-Edge Navigation */}
      <footer className="relative z-30 w-full px-6 md:px-12 py-3 border-t border-white/10 bg-corpLightBlue/80 backdrop-blur-xl flex items-center justify-between shrink-0 shadow-2xl">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer text-xs md:text-sm font-semibold border border-white/10"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(i)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide
                ? 'bg-corpCyan w-8 shadow-[0_0_12px_#00E5FF]'
                : 'bg-white/20 hover:bg-white/40 w-2.5'
                }`}
              title={`Go to slide ${i + 1}: ${slide.title}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES - 1}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-corpCyan text-corpBlue hover:bg-corpCyan/90 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer text-xs md:text-sm font-extrabold shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:scale-105"
        >
          <span>Next Slide</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
};

export default App;
