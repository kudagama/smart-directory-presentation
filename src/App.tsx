import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Clock, Brain, Zap, Sparkles, ArrowDown,
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
  { id: 4, title: "Live Bot Demo", tag: "Demo" },
  { id: 5, title: "04) How We Will Build It", tag: "04" },
  { id: 6, title: "05) Market Potential", tag: "05" },
  { id: 7, title: "06) What We Need", tag: "06" },
  { id: 8, title: "Thank You", tag: "Thank You" }
];

const TOTAL_SLIDES = SLIDES.length;

// Section 1: Old System Problems
const CHARACTER_SIMULATION_STEPS = [
  {
    step: 1,
    char: "TRAINING",
    matchesCount: "Onboarding",
    elapsed: "00:00s",
    shiftsCount: 1,
    alertText: "New staff take too long to learn the complex systems.",
    badgeClass: "bg-purple-500/30 text-purple-300 border-purple-500/60",
    problemTitle: "Long Training Time",
    problemIcon: <Users className="w-10 h-10 md:w-12 md:h-12 text-purple-400 drop-shadow-md" />,
    rows: [
      { name: "Learning Curve", dept: "Complexity", ext: "Steep", status: "Hard to master" },
      { name: "Time to Floor", dept: "HR Metric", ext: "Delayed", status: "Slow deployment" },
      { name: "System Knowledge", dept: "Requirement", ext: "High", status: "Too many portals" },
      { name: "Training Cost", dept: "Finance", ext: "Increased", status: "Resource heavy" }
    ]
  },
  {
    step: 2,
    char: "F",
    matchesCount: "2,150 matches",
    elapsed: "00:08s",
    shiftsCount: 2,
    alertText: "Searching gives too many irrelevant results.",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    problemTitle: "Too Many Search Results",
    problemIcon: <Search className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Finance Division", dept: "Corporate", ext: "1102", status: "Not relevant" },
      { name: "Fault Reporting Unit", dept: "Customer Care", ext: "5421", status: "Wrong category" },
      { name: "Fibre Deployments", dept: "Engineering", ext: "4120", status: "Not product info" },
      { name: "Fernando, P.K.", dept: "HR Division", ext: "3310", status: "Person, not product" }
    ]
  },
  {
    step: 3,
    char: "Fibre",
    matchesCount: "430 matches",
    elapsed: "00:18s",
    shiftsCount: 3,
    alertText: "Agents waste time filtering through categories.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Hard to Find Exact Details",
    problemIcon: <Layers className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Fibre New Connections", dept: "Sales", ext: "9001", status: "General line" },
      { name: "Fibre Unlimited Packages", dept: "Products", ext: "Data...", status: "Click to open" },
      { name: "Fibre Faults (Kandy)", dept: "Support", ext: "6109", status: "Wrong branch" },
      { name: "Fibre Promotions 2025", dept: "Marketing", ext: "2201", status: "Outdated" }
    ]
  },
  {
    step: 4,
    char: "Fibre Unl...",
    matchesCount: "12 Documents",
    elapsed: "00:29s",
    shiftsCount: 4,
    alertText: "Agents must read multiple PDFs to find one price.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Data is Scattered Everywhere",
    problemIcon: <Eye className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Unlimited_10_Specs.pdf", dept: "Knowledge Base", ext: "View", status: "Reading..." },
      { name: "Unlimited_25_Pricing.xls", dept: "Knowledge Base", ext: "View", status: "Not opened" },
      { name: "Fibre_TandC.docx", dept: "Legal", ext: "View", status: "Irrelevant" },
      { name: "Old_Packages_Archive", dept: "Archive", ext: "View", status: "Risk of wrong info" }
    ]
  },
  {
    step: 5,
    char: "Found Price",
    matchesCount: "Manual Extraction",
    elapsed: "00:48s",
    shiftsCount: 5,
    alertText: "Customers wait on hold while agents search manually.",
    badgeClass: "bg-red-500/30 text-red-300 border-red-500/60 animate-pulse",
    problemTitle: "Manual Searching Causes Delays",
    problemIcon: <Timer className="w-10 h-10 md:w-12 md:h-12 text-rose-500 drop-shadow-md" />,
    rows: [
      { name: "Package: Unlimited 10", dept: "Details", ext: "Rs.4490", status: "Finally found" },
      { name: "Customer Mood", dept: "Call Status", ext: "Frustrated", status: "Negative" },
      { name: "Agent Stress", dept: "Metrics", ext: "High", status: "Cognitive load" },
      { name: "AHT Target", dept: "Metrics", ext: "Breached", status: "KPI failed" }
    ]
  },
  {
    step: 6,
    char: "ERRORS",
    matchesCount: "Costly Mistakes",
    elapsed: "01:15s",
    shiftsCount: 6,
    alertText: "Wrong entries lead to wasted money and extra work.",
    badgeClass: "bg-red-600/30 text-red-200 border-red-500/60 animate-pulse",
    problemTitle: "Costly Mistakes (Wrong Fault Entries)",
    problemIcon: <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-red-500 drop-shadow-md" />,
    rows: [
      { name: "Fault Entry", dept: "Accuracy", ext: "Incorrect", status: "Due to rushed call" },
      { name: "Resolution Time", dept: "Customer", ext: "Delayed", status: "Frustrated client" },
      { name: "Operational Cost", dept: "Finance", ext: "Increased", status: "Wasted truck roll" },
      { name: "Correction Task", dept: "Resources", ext: "Extra Officer", status: "Needed to fix error" }
    ]
  },
  {
    step: 7,
    char: "IMPACT",
    matchesCount: "Business Impact",
    elapsed: "01:20s",
    shiftsCount: 7,
    alertText: "Traditional systems waste time and hurt business.",
    badgeClass: "bg-corpCyan/20 text-corpCyan border-corpCyan/40 animate-pulse",
    problemTitle: "Why It Matters",
    problemIcon: <Clock className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Lengthy training periods", dept: "HR & Onboarding", ext: "Time", status: "Impact" },
      { name: "Delays customer issue resolution", dept: "Customer Experience", ext: "KPI", status: "Impact" },
      { name: "Reduces employee productivity", dept: "Operations", ext: "KPI", status: "Impact" },
      { name: "Increases Average Handling Time", dept: "Support", ext: "KPI", status: "Impact" },
      { name: "Frustration in urgent queries", dept: "User Experience", ext: "KPI", status: "Impact" },
      { name: "Costly fault reporting errors", dept: "Finance & QA", ext: "Cost", status: "Impact" }
    ],
    isWhyItMatters: true
  }
];

// Section 2: Human Agent with System Processing Animation Stages
const CALL_1_STAGES = [
  { id: 0, title: "1. Greeting", tag: "Quality Std: Sinhala", callerVoice: "Agent: 'ආයුබෝවන්! මම හිමාලි, මට පුළුවනි ඔබට සහය වන්න'", softphoneStatus: "Active Call", pulseRate: "pulse-fast", aiState: "Standard Greeting Detected", highlight: "audio", contactReady: false },
  { id: 1, title: "2. Holding", tag: "Quality Std: Sinhala", callerVoice: "Agent: 'කරුණාකර ඇමතුමේ රැඳී ඉන්න සර්/ මැඩම්'", softphoneStatus: "On Hold (Max 45s)", pulseRate: "pulse-normal", aiState: "Hold Timer Started...", highlight: "softphone", contactReady: false },
  { id: 2, title: "3. Pre-close", tag: "Quality Std: Sinhala", callerVoice: "Agent: 'වෙනත් යමක් දැනගැනීමට අවශ්‍යද?'", softphoneStatus: "Active Call", pulseRate: "pulse-cyan", aiState: "Pre-close Detected", highlight: "ai", contactReady: true },
  { id: 3, title: "4. Ending", tag: "Quality Std: Sinhala", callerVoice: "Agent: 'මා ලබාදුන් සේවය ඇගයීම සඳහා රැඳී සිටින්න. SLT Mobitel ඇමතුවාට ස්තුතියි. සුභ දවසක්!'", softphoneStatus: "Transfer to IVR C-Sat", pulseRate: "pulse-success", aiState: "Call Ended Correctly", highlight: "hud", contactReady: true }
];

const CALL_2_STAGES = [
  { id: 0, title: "1. Greeting", tag: "Quality Std: Sinhala 2", callerVoice: "Agent: 'ආයුබෝවන්! මම කසුන්, මට පුළුවනි ඔබට සහය වන්න'", softphoneStatus: "Active Call", pulseRate: "pulse-fast", aiState: "Standard Greeting Detected", highlight: "audio", contactReady: false },
  { id: 1, title: "2. Retrieval", tag: "Quality Std: Sinhala 2", callerVoice: "Agent: 'රැඳීසිටියාට ස්තුතියි සර්/ මැඩම්'", softphoneStatus: "Call Retrieved", pulseRate: "pulse-normal", aiState: "Hold Retrieve Detected", highlight: "softphone", contactReady: false },
  { id: 2, title: "3. Apologize", tag: "Quality Std: Sinhala 2", callerVoice: "Agent: 'සමාවන්න සර් ප්‍රමාදයට...'", softphoneStatus: "Active Call", pulseRate: "pulse-cyan", aiState: "Apology Detected (Empathy)", highlight: "ai", contactReady: true },
  { id: 3, title: "4. Ending", tag: "Quality Std: Sinhala 2", callerVoice: "Agent: 'මා ලබාදුන් සේවය ඇගයීම සඳහා රැඳී සිටින්න. SLT Mobitel ඇමතුවාට ස්තුතියි. සුභ දවසක්!'", softphoneStatus: "Transfer to IVR C-Sat", pulseRate: "pulse-success", aiState: "Call Ended Correctly", highlight: "hud", contactReady: true }
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
const TrainingAnimation = ({ s, setStepIdx, setAuto }: any) => {
  return (
    <div className="glass-card rounded-2xl border-2 flex flex-col flex-1 min-h-0 relative overflow-hidden transition-all duration-1000 border-purple-500/40 bg-gradient-to-b from-purple-950/30 via-[#0A0515]/80 to-[#050010]/90 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
      {/* Background Pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ boxShadow: ['inset 0 0 40px rgba(168,85,247,0.05)', 'inset 0 0 60px rgba(168,85,247,0.15)', 'inset 0 0 40px rgba(168,85,247,0.05)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-purple-500/20 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-purple-400"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-purple-300">
            <Users className="w-3.5 h-3.5" />
            Onboarding Time Dilation
          </span>
        </div>
        <button onClick={() => { setStepIdx(0); setAuto(true); }} className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono text-slate-400 border border-white/10 cursor-pointer transition-colors">
          <RotateCcw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>

      {/* 3D Holographic Display */}
      <div className="flex-1 relative perspective-[1000px] flex items-center justify-center overflow-hidden z-10">
        
        {/* Isometric Grid Floor */}
        <motion.div 
          className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundImage: `linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'rotateX(70deg) rotateZ(45deg)'
          }}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* 3D Content Container */}
        <div className="relative w-full h-full flex items-center justify-center z-20" style={{ transformStyle: 'preserve-3d' }}>
           
           {/* Center Clock Core */}
           <motion.div
             animate={{ rotateY: 360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-dashed border-purple-500/50 flex items-center justify-center backdrop-blur-md shadow-[0_0_60px_rgba(168,85,247,0.3)] bg-purple-900/10"
             style={{ transformStyle: 'preserve-3d' }}
           >
              <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-400/50 relative">
                 <motion.div 
                   className="absolute w-1 h-8 bg-purple-400 origin-bottom top-2 rounded-full"
                   animate={{ rotateZ: 360 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 />
                 <Brain className="w-8 h-8 text-purple-300 drop-shadow-lg z-10" />
              </div>
           </motion.div>

           {/* Orbiting Training Data Nodes */}
           {s.rows && s.rows.map((row: any, i: number) => {
             const angle = (i / s.rows.length) * Math.PI * 2;
             const radiusX = 190;
             const radiusY = 120;
             return (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ 
                   opacity: 1, 
                   scale: 1, 
                   x: [Math.cos(angle) * radiusX, Math.cos(angle + 0.1) * radiusX, Math.cos(angle) * radiusX],
                   y: [Math.sin(angle) * radiusY, Math.sin(angle + 0.1) * radiusY, Math.sin(angle) * radiusY],
                   z: Math.sin(angle) * 80
                 }}
                 transition={{ type: "spring", bounce: 0.4, delay: i * 0.15, x: { duration: 4, repeat: Infinity, ease: "easeInOut" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                 className="absolute p-3 rounded-xl border border-purple-500/40 bg-purple-950/70 backdrop-blur-xl flex flex-col items-center gap-1 w-44 md:w-52 shadow-2xl p-4">
                  <div className="text-xs md:text-sm uppercase tracking-widest font-bold text-purple-400 text-center mb-1">
                    {row.name}
                  </div>
                  <div className="text-sm md:text-base font-black text-white leading-tight text-center">
                    {row.ext}
                  </div>
               </motion.div>
             );
           })}
        </div>
      </div>
      <div className="p-4 border-t border-purple-500/20 bg-purple-950/80 z-20 relative flex items-center justify-between">
         <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Sim Status</span>
         <span className="text-sm font-black font-mono text-purple-400">INITIALIZING ONBOARDING...</span>
      </div>
    </div>
  );
};

const ErrorChainAnimation = ({ s, setStepIdx, setAuto }: any) => {
  return (
    <div className="glass-card rounded-2xl border-2 flex flex-col flex-1 min-h-0 relative overflow-hidden transition-all duration-1000 border-red-500/40 bg-gradient-to-b from-red-950/30 via-[#0A0515]/80 to-[#050010]/90 shadow-[0_0_50px_rgba(244,63,94,0.2)]">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ boxShadow: ['inset 0 0 40px rgba(244,63,94,0.1)', 'inset 0 0 80px rgba(244,63,94,0.3)', 'inset 0 0 40px rgba(244,63,94,0.1)'] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-red-500/20 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-red-400"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-red-300">
            <AlertTriangle className="w-3.5 h-3.5" />
            Chain Reaction Analysis
          </span>
        </div>
        <button onClick={() => { setStepIdx(0); setAuto(true); }} className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono text-slate-400 border border-white/10 cursor-pointer transition-colors">
          <RotateCcw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>

      <div className="flex-1 relative perspective-[1200px] flex items-center justify-center overflow-hidden z-10">
        <motion.div 
          className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundImage: `linear-gradient(rgba(244,63,94,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'rotateX(70deg) rotateZ(45deg)'
          }}
          animate={{ backgroundPosition: ['0px 0px', '-40px -40px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative w-full h-full flex flex-col items-center justify-start pt-10 z-20" style={{ transformStyle: 'preserve-3d' }}>
           {/* Top Floating Ticket */}
           <motion.div 
             initial={{ y: -50, opacity: 0, rotateX: 30 }}
             animate={{ y: 0, opacity: 1, rotateX: 0 }}
             transition={{ type: "spring", bounce: 0.5 }}
             className="w-64 md:w-80 p-5 bg-red-950/80 border-2 border-red-500 rounded-xl text-center shadow-[0_20px_50px_rgba(244,63,94,0.5)] backdrop-blur-xl relative z-30">
             <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-white" />
             </div>
             <div className="text-xs md:text-sm text-red-300 uppercase tracking-widest font-bold mb-2">Trigger Event</div>
             <div className="text-xl md:text-2xl font-black text-white">Incorrect Fault Logged</div>
           </motion.div>

           {/* 3D Cascading Arrows and Impacts */}
           <div className="relative mt-12 flex justify-center w-full max-w-lg perspective-[800px]">
             {s.rows.slice(1).map((row: any, i: number) => {
               // Spread them widely! i is 0, 1, 2
               const spread = 200;
               return (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: -20, z: -100 }}
                 animate={{ opacity: 1, y: i * 15, z: i * 60 }}
                 transition={{ delay: 0.4 + i * 0.3, type: "spring" }}
                 className="absolute flex flex-col items-center"
                 style={{ 
                   transform: `translateX(${(i - 1) * spread}px) translateZ(${i * 60}px)` 
                 }}
               >
                 <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}>
                   <ArrowDown className="text-red-500 w-8 h-8 mb-3 drop-shadow-[0_0_10px_rgba(244,63,94,1)]" />
                 </motion.div>
                 <div className="w-44 md:w-52 h-28 md:h-32 p-4 bg-black/70 border border-red-500/50 rounded-lg text-center flex flex-col justify-center items-center backdrop-blur-md shadow-[0_10px_30px_rgba(244,63,94,0.4)]">
                   <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">{row.dept}</div>
                   <div className="text-sm md:text-base text-red-200 font-black mt-2 leading-tight">{row.ext}</div>
                 </div>
               </motion.div>
             )})}
           </div>
        </div>
      </div>
      <div className="p-4 border-t border-red-500/20 bg-red-950/80 z-20 relative flex items-center justify-between">
         <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Chaos Level</span>
         <span className="text-lg font-black font-mono text-red-400">CRITICAL</span>
      </div>
    </div>
  );
};

const ImpactDashboard = ({ s, setStepIdx, setAuto }: any) => {
  return (
    <div className="glass-card rounded-2xl border-2 flex flex-col flex-1 min-h-0 relative overflow-hidden transition-all duration-1000 border-corpCyan/40 bg-gradient-to-b from-cyan-950/30 via-[#0A0515]/80 to-[#050010]/90 shadow-[0_0_50px_rgba(0,229,255,0.15)]">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ boxShadow: ['inset 0 0 40px rgba(0,229,255,0.05)', 'inset 0 0 60px rgba(0,229,255,0.1)', 'inset 0 0 40px rgba(0,229,255,0.05)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-corpCyan/20 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-cyan-400"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-corpCyan"></span>
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-cyan-300">
            <Target className="w-3.5 h-3.5" />
            Macro Business Impact
          </span>
        </div>
        <button onClick={() => { setStepIdx(0); setAuto(true); }} className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono text-slate-400 border border-white/10 cursor-pointer transition-colors">
          <RotateCcw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>
      
      <div className="flex-1 relative perspective-[1500px] flex items-center justify-center overflow-hidden z-10 p-4">
        <motion.div 
          className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(0,229,255,0.1) 0%, transparent 70%), linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 30px 30px, 30px 30px',
            transform: 'rotateX(60deg) rotateZ(-15deg)'
          }}
          animate={{ backgroundPosition: ['0px 0px, 0px 0px, 0px 0px', '0px 0px, 30px 30px, 30px 30px'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* 3D Spaced Gallery Array */}
        <div className="relative w-full h-full grid grid-cols-2 gap-8 px-6 content-center z-20" style={{ transformStyle: 'preserve-3d' }}>
           {s.rows.map((row: any, i: number) => {
             return (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, rotateY: 30, x: i % 2 === 0 ? -50 : 50, z: -100 }}
                 animate={{ opacity: 1, rotateY: 0, x: 0, z: 0 }}
                 transition={{ delay: i * 0.15, type: "spring", bounce: 0.4 }}
                 className="w-full h-32 md:h-40 bg-black/60 border border-corpCyan/40 p-4 rounded-xl flex flex-col justify-center items-center text-center shadow-[0_15px_30px_rgba(0,229,255,0.25)] backdrop-blur-xl hover:border-corpCyan hover:bg-cyan-950/60 transition-all cursor-default">
                 <span className="text-xs md:text-sm text-cyan-400 uppercase font-mono tracking-widest mb-2 opacity-80">{row.dept}</span>
                 <span className="text-sm md:text-lg font-black text-white leading-snug">{row.name}</span>
               </motion.div>
             )
           })}
        </div>
      </div>
      <div className="p-4 border-t border-corpCyan/20 bg-cyan-950/80 z-20 relative flex items-center justify-between">
         <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Elapsed Time</span>
         <span className="text-lg font-black font-mono text-cyan-400">{s.elapsed}</span>
      </div>
    </div>
  );
};

const SystemOverloadNetwork = ({ stepIdx, setStepIdx, setAuto }: any) => {
  const steps = CHARACTER_SIMULATION_STEPS;
  const s = steps[stepIdx];
  
  if (stepIdx === 0) return <TrainingAnimation s={s} setStepIdx={setStepIdx} setAuto={setAuto} />;
  if (stepIdx === 5) return <ErrorChainAnimation s={s} setStepIdx={setStepIdx} setAuto={setAuto} />;
  if (stepIdx === 6) return <ImpactDashboard s={s} setStepIdx={setStepIdx} setAuto={setAuto} />;

  // Normalize chaos for steps 1 to 4 (so step 1 is 0% and step 4 is 100% of the overload)
  const chaos = (stepIdx - 1) / 3; 
  const isDanger = chaos > 0.4;

  return (
    <div className={`glass-card rounded-2xl border-2 flex flex-col flex-1 min-h-0 relative overflow-hidden transition-all duration-1000 ${isDanger ? 'border-red-500/40 bg-gradient-to-b from-red-950/30 via-[#0A0515]/80 to-[#050010]/90 shadow-[0_0_50px_rgba(244,63,94,0.2)]' : 'border-corpCyan/40 bg-gradient-to-b from-cyan-950/30 via-[#0A0515]/80 to-[#050010]/90 shadow-[0_0_50px_rgba(0,229,255,0.1)]'}`}>
      
      {/* Background Pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          boxShadow: isDanger
            ? ['inset 0 0 40px rgba(244,63,94,0.1)', 'inset 0 0 80px rgba(244,63,94,0.3)', 'inset 0 0 40px rgba(244,63,94,0.1)']
            : ['inset 0 0 40px rgba(0,229,255,0.05)', 'inset 0 0 60px rgba(0,229,255,0.1)', 'inset 0 0 40px rgba(0,229,255,0.05)']
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Header */}
      <div className={`flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b z-20 relative ${isDanger ? 'border-red-500/20' : 'border-corpCyan/20'}`}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
             <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDanger ? 'bg-red-400' : 'bg-corpCyan'}`}></span>
             <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isDanger ? 'bg-red-500' : 'bg-corpCyan'}`}></span>
          </span>
          <span className={`text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${isDanger ? 'text-red-300' : 'text-cyan-300'}`}>
            <Activity className="w-3.5 h-3.5" />
            System Search Status
          </span>
        </div>
        <button
          onClick={() => { setStepIdx(0); setAuto(true); }}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono text-slate-400 border border-white/10 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>

      {/* Central Holographic Display */}
      <div className="flex-1 relative perspective-[1000px] flex items-center justify-center overflow-hidden z-10">
        
        {/* Isometric Grid Floor */}
        <motion.div 
          className="absolute w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundImage: `linear-gradient(${isDanger ? 'rgba(244,63,94,0.15)' : 'rgba(0,229,255,0.15)'} 1px, transparent 1px), linear-gradient(90deg, ${isDanger ? 'rgba(244,63,94,0.15)' : 'rgba(0,229,255,0.15)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'rotateX(70deg) rotateZ(45deg)'
          }}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating Data Modules */}
        <div className="relative w-full h-full flex items-center justify-center z-20">
           {s.rows && s.rows.map((row: any, i: number) => {
             // WIDE SPREAD for Overload items
             const angle = (i / s.rows.length) * Math.PI * 2;
             const baseRadiusX = 240; 
             const baseRadiusY = 160;
             return (
             <motion.div
               key={`${stepIdx}-${i}`}
               initial={{ opacity: 0, scale: 0, y: 50 }}
               animate={{ 
                 opacity: 1, 
                 scale: 1, 
                 x: Math.cos(angle + chaos * 10) * (baseRadiusX + chaos * 40),
                 y: Math.sin(angle + chaos * 10) * (baseRadiusY + chaos * 30),
                 rotateY: chaos * 40,
                 rotateZ: (chaos > 0.5 ? Math.random() * 15 - 7 : 0)
               }}
               transition={{ type: "spring", bounce: 0.5, delay: i * 0.15 }}
               className={`absolute p-3 rounded-xl border backdrop-blur-xl flex flex-col gap-1 w-44 md:w-56 shadow-2xl p-4 ${
                 isDanger ? 'bg-red-950/80 border-red-500/60' : 'bg-cyan-950/70 border-corpCyan/50'
               }`}>
                <div className={`text-xs md:text-sm uppercase tracking-widest font-bold text-center mb-1 ${isDanger ? 'text-red-400' : 'text-cyan-400'}`}>
                  {row.dept}
                </div>
                <div className="text-sm md:text-base font-black text-white leading-tight text-center mb-2">
                  {row.name}
                </div>
                <div className={`text-xs md:text-sm font-mono py-1.5 px-2 rounded text-center bg-black/50 border ${isDanger ? 'border-red-500/40 text-red-300' : 'border-corpCyan/40 text-cyan-300'}`}>
                  {row.status}
                </div>
             </motion.div>
           )})}

           {/* Central Core */}
           <motion.div
             animate={{ 
               scale: [1, 1 + chaos * 0.3, 1],
               rotate: chaos * 180
             }}
             transition={{ duration: Math.max(0.2, 2 - chaos * 1.5), repeat: Infinity }}
             className={`absolute w-28 h-28 md:w-36 md:h-36 rounded-full border-4 flex items-center justify-center backdrop-blur-2xl ${
               isDanger ? 'border-red-500 bg-red-500/10 shadow-[0_0_80px_rgba(244,63,94,0.5)]' : 'border-corpCyan bg-corpCyan/10 shadow-[0_0_80px_rgba(0,229,255,0.5)]'
             }`}
           >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${isDanger ? 'bg-red-500 shadow-[0_0_30px_rgba(244,63,94,1)]' : 'bg-corpCyan shadow-[0_0_30px_rgba(0,229,255,1)]'}`}>
                <Layers className="w-8 h-8 md:w-10 md:h-10 text-black drop-shadow-md" />
              </div>
           </motion.div>
        </div>

        {/* Warning Overlays for High Chaos */}
        <AnimatePresence>
          {chaos > 0.6 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center z-50"
            >
              <div className="text-4xl md:text-6xl font-black text-red-500/30 tracking-tighter mix-blend-screen transform -rotate-12 whitespace-nowrap">
                SYSTEM OVERLOAD
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer Info */}
      <div className={`p-4 border-t z-20 relative ${isDanger ? 'border-red-500/20 bg-red-950/80' : 'border-corpCyan/20 bg-cyan-950/80'}`}>
         <div className="flex items-center justify-between">
           <div className="flex flex-col">
             <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Chaos Level</span>
             <span className={`text-lg font-black font-mono ${isDanger ? 'text-red-400' : 'text-cyan-400'}`}>
               {Math.round(chaos * 100)}%
             </span>
           </div>
           <div className="flex flex-col text-right">
             <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Elapsed Time</span>
             <span className={`text-lg font-black font-mono ${isDanger ? 'text-red-400' : 'text-cyan-400'}`}>
               {s.elapsed}
             </span>
           </div>
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
                "Integrates Enterprise Datasets",
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
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-corpCyan mb-1">Bot Response Optimization</span>
            <div className="flex items-end gap-2 h-16 mb-6 mt-4">
              {[0.3, 0.5, 0.7, 0.85, 1].map((scale, i) => (
                <motion.div
                  key={i}
                  initial={{ height: '20%' }}
                  animate={{ height: `${scale * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                  className="w-5 bg-corpCyan rounded-t-md shadow-[0_0_10px_rgba(0,229,255,0.8)]"
                />
              ))}
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
            <div className="flex items-end gap-2 h-16 mb-6 mt-4">
              {[0.4, 0.6, 0.75, 0.9, 1].map((scale, i) => (
                <motion.div
                  key={i}
                  initial={{ height: '20%' }}
                  animate={{ height: `${scale * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                  className="w-5 bg-blue-400 rounded-t-md shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                />
              ))}
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
            <div className="flex items-end gap-2 h-16 mb-6 mt-4">
              {[1, 0.7, 0.5, 0.35, 0.2].map((scale, i) => (
                <motion.div
                  key={i}
                  initial={{ height: '100%' }}
                  animate={{ height: `${scale * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                  className="w-5 bg-emerald-400 rounded-t-md shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                />
              ))}
            </div>

            <div className="space-y-2 w-full text-left">
              {[
                "Less time spent on lookups",
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

  // Sync state for Slide 7
  const [slide7StepIdx, setSlide7StepIdx] = useState(0);

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
      feature: "Conversational AI Bot",
      match: {
        name: "Bank of Ceylon",
        role: "Primary Contact",
        dept: "Kandy Branch",
        location: "Kandy",
        phone: "Rs. 4,490",
        ext: "boc.kandy@boc.lk",
        status: "AI Bot Response"
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
      feature: "Single Bot: Products, Dept & Org",
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
                  className="relative group mb-10 inline-flex items-center justify-center rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,229,255,0.25)] hover:shadow-[0_0_60px_rgba(0,229,255,0.4)] transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_0%,#00E5FF_50%,#00000000_100%)]" style={{ animationDuration: '4s' }} />
                  <div className="relative flex items-center gap-3 px-8 py-3 rounded-full bg-[#050A15]/90 m-[2px] backdrop-blur-2xl border border-white/5">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-corpCyan opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-corpCyan shadow-[0_0_10px_rgba(0,229,255,1)]"></span>
                    </div>
                    <span className="bg-gradient-to-r from-white via-corpCyan to-blue-200 text-transparent bg-clip-text font-black tracking-[0.25em] text-xs md:text-sm uppercase drop-shadow-md">
                      SLT Innovation Pitch 2026
                    </span>
                  </div>
                </motion.div>

                <motion.h1
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight text-white leading-none drop-shadow-2xl flex flex-col gap-2"
                >
                  Smart PEARL
                  <span className="text-corpCyan text-3xl md:text-4xl lg:text-5xl block mt-2 tracking-widest font-extrabold drop-shadow-none">A Catalyst for Digital Innovation</span>
                </motion.h1>



                {/* Team Members List */}
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap justify-center gap-4 mt-6 mb-12 max-w-5xl"
                >
                  {[
                    "Gehan Jayawardana",
                    "Sujanthi Jayarathna",
                    "R.P. Shivagar",
                    "Sanjeevani Alwis",
                    "Saveen Kudagama",
                    "O.M.D.S.K. Dissanayake"
                  ].map((name, idx) => (
                    <motion.div 
                      key={idx} 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="group relative px-5 py-2.5 rounded-xl bg-[#08101E]/80 border border-corpCyan/20 text-slate-200 text-sm md:text-base font-bold flex items-center gap-3 backdrop-blur-xl hover:border-corpCyan/60 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden cursor-default"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-corpCyan/0 via-corpCyan/10 to-corpCyan/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
                      
                      <div className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-corpCyan to-blue-600 flex items-center justify-center text-[11px] text-white font-black shadow-[0_0_15px_rgba(0,229,255,0.4)] border border-white/20 shrink-0">
                        {idx + 1}
                      </div>
                      
                      <span className="relative z-10 tracking-wide whitespace-nowrap">{name}</span>
                      
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-corpCyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-corpCyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4 }}
                  className="mt-8 mb-4 relative z-10"
                >
                  <p className="text-xs md:text-sm text-slate-500 font-mono tracking-widest uppercase bg-white/5 px-4 py-1.5 rounded-md border border-white/10 shadow-sm backdrop-blur-sm inline-block">
                    Ref: ISP/S/2026/40/179
                  </p>
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
                                  "Long training time for new agents",
                                  "Delays in solving customer issues",
                                  "Low employee productivity",
                                  "High Average Handling Time (AHT)",
                                  "Agent and customer frustration",
                                  "Wasted budget on wrong fault entries"
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
                    <SystemOverloadNetwork stepIdx={slide1StepIdx} setStepIdx={setSlide1StepIdx} auto={slide1Auto} setAuto={setSlide1Auto} />
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
            {/* SLIDE 4: LIVE INTERACTIVE AI BOT DEMO          */}
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

                        {/* Step 2: Unified Intelligence Graph */}
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
                              <h3 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">Unified Intelligence Graph</h3>
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
                        { name: "SLT Customer Care Officers", icon: <Headphones className="w-5 h-5 md:w-8 md:h-8" />, color: "from-corpCyan/20 to-corpCyan/5", border: "border-corpCyan/30", text: "text-corpCyan", badge: "Immediate Target" },
                        { name: "SLT Internal Departments", icon: <Users className="w-5 h-5 md:w-8 md:h-8" />, color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-400", badge: "Internal Expansion" },
                        { name: "B2B Enterprise Clients", icon: <Building2 className="w-5 h-5 md:w-8 md:h-8" />, color: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/30", text: "text-amber-400", badge: "Productization" },
                        { name: "Any Global Organization", icon: <Rocket className="w-5 h-5 md:w-8 md:h-8" />, color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/30", text: "text-purple-400", badge: "Future SaaS Model" }
                      ].map((user, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: i * 0.1, type: "spring" }}
                          className={`bg-gradient-to-br ${user.color} p-4 rounded-xl border ${user.border} flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer backdrop-blur-sm`}
                        >
                          <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 flex items-center justify-center shrink-0 border border-white/5 ${user.text}`}>
                            {user.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-[10px] font-mono uppercase tracking-widest ${user.text} mb-1 opacity-80`}>{user.badge}</span>
                            <span className="text-white font-black text-base md:text-xl leading-tight">{user.name}</span>
                          </div>
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

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="flex flex-col flex-1 min-h-0 w-full max-w-6xl mx-auto mb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
                    
                    {/* Left Sidebar - Navigation */}
                    <div className="lg:col-span-4 flex flex-col gap-3 relative z-10 w-full">
                      {[
                        { title: "Technical Support", subtitle: "System Integration", icon: Cpu, color: "blue", hex: "#3b82f6" },
                        { title: "Business Support", subtitle: "Stakeholder Alignment", icon: HeartHandshake, color: "emerald", hex: "#10b981" },
                        { title: "Resources Required", subtitle: "Infrastructure & Teams", icon: Layers, color: "corpCyan", hex: "#00e5ff" },
                        { title: "Next Steps", subtitle: "Roadmap to Launch", icon: Search, color: "rose", hex: "#f43f5e" }
                      ].map((tab, idx) => {
                        const Icon = tab.icon;
                        const isActive = slide7StepIdx === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => setSlide7StepIdx(idx)}
                            className={`group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 overflow-hidden text-left border ${isActive ? 'scale-[1.02] bg-[#0A1222] shadow-2xl' : 'bg-black/20 border-white/5 hover:bg-white/5'}`}
                            style={{ borderColor: isActive ? `${tab.hex}60` : undefined }}
                          >
                            {/* Hover/Active Background Glow */}
                            <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-20' : 'group-hover:opacity-10'}`} style={{ background: `linear-gradient(90deg, ${tab.hex} 0%, transparent 100%)` }} />
                            
                            {/* Active Indicator Line */}
                            {isActive && <motion.div layoutId="activeTabLine" className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: tab.hex }} />}

                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${isActive ? '' : 'border-white/10 bg-white/5 text-slate-400 group-hover:text-white'}`} style={{ backgroundColor: isActive ? `${tab.hex}20` : undefined, borderColor: isActive ? `${tab.hex}50` : undefined, color: isActive ? tab.hex : undefined }}>
                              <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                            </div>
                            
                            <div>
                              <h4 className={`font-black tracking-wide text-sm md:text-base ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{tab.title}</h4>
                              <p className={`text-xs font-mono uppercase tracking-widest mt-1 ${isActive ? '' : 'text-slate-500'}`} style={{ color: isActive ? tab.hex : undefined }}>{tab.subtitle}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Content Panel - Holographic Display */}
                    <div className="lg:col-span-8 relative h-[450px] w-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={slide7StepIdx}
                          initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                          transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                          className="absolute inset-0"
                        >
                          {/* Inner Data Container */}
                          <div className="h-full w-full rounded-3xl border flex flex-col bg-[#050B14]/80 backdrop-blur-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden group"
                               style={{ 
                                 borderColor: slide7StepIdx === 0 ? 'rgba(59,130,246,0.3)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.3)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.3)' : 'rgba(244,63,94,0.3)',
                                 boxShadow: `0 0 50px ${slide7StepIdx === 0 ? 'rgba(59,130,246,0.1)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.1)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.1)' : 'rgba(244,63,94,0.1)'}`
                               }}>
                            
                            {/* Futuristic Corner Accents */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 opacity-50 rounded-tl-3xl" style={{ borderColor: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}></div>
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 opacity-50 rounded-br-3xl" style={{ borderColor: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}></div>

                            {/* Background Ambient Glow */}
                            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}></div>

                            <div className="relative z-10 flex flex-col h-full">
                              {/* Content header */}
                              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10 shrink-0">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg shrink-0" 
                                     style={{ 
                                       backgroundColor: slide7StepIdx === 0 ? 'rgba(59,130,246,0.2)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.2)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.2)' : 'rgba(244,63,94,0.2)',
                                       borderColor: slide7StepIdx === 0 ? 'rgba(59,130,246,0.4)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.4)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.4)' : 'rgba(244,63,94,0.4)',
                                       color: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e'
                                     }}>
                                  {slide7StepIdx === 0 && <Cpu className="w-8 h-8 drop-shadow-md" />}
                                  {slide7StepIdx === 1 && <HeartHandshake className="w-8 h-8 drop-shadow-md" />}
                                  {slide7StepIdx === 2 && <Layers className="w-8 h-8 drop-shadow-md" />}
                                  {slide7StepIdx === 3 && <Search className="w-8 h-8 drop-shadow-md" />}
                                </div>
                                <div>
                                  <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                                    {slide7StepIdx === 0 && "Technical Support"}
                                    {slide7StepIdx === 1 && "Business Support"}
                                    {slide7StepIdx === 2 && "Resources Required"}
                                    {slide7StepIdx === 3 && "Next Steps"}
                                  </h2>
                                  <div className="text-xs font-mono uppercase tracking-widest mt-2 flex items-center gap-2" style={{ color: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}>
                                    <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}></span>
                                    System Initializing...
                                  </div>
                                </div>
                              </div>

                              {/* List Items */}
                              <div className={`flex-1 w-full grid gap-4 mt-2 ${slide7StepIdx === 3 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                                {(
                                  slide7StepIdx === 0 ? [
                                    { title: "Database Access", desc: "Secure access to enterprise data sources.", icon: Layers },
                                    { title: "IT Collaboration", desc: "Collaboration with Digital Services team.", icon: Users },
                                    { title: "AI Integration", desc: "API and AI model integration support.", icon: Cpu },
                                    { title: "System Testing", desc: "Assistance for deployment and UAT.", icon: CheckCircle2 }
                                  ] : slide7StepIdx === 1 ? [
                                    { title: "User Feedback", desc: "Direct input from Contact Centre agents.", icon: MessageSquare },
                                    { title: "Sponsorship", desc: "Management sponsorship and pilot approval.", icon: HeartHandshake },
                                    { title: "Cross-Functional", desc: "Participation from multiple departments.", icon: Building2 }
                                  ] : slide7StepIdx === 2 ? [
                                    { title: "AI Infrastructure", desc: "Cloud platform and development tools.", icon: Brain },
                                    { title: "Data Maintenance", desc: "Enterprise data access and cleanup.", icon: Layers },
                                    { title: "Project Team", desc: "Dedicated team for design and testing.", icon: Briefcase }
                                  ] : [
                                    { title: "Pilot Deployment", desc: "Deploy AI Bot for initial call sampling.", icon: Rocket },
                                    { title: "Evaluate & Scale", desc: "Scale to all Contact Center Officers.", icon: Maximize }
                                  ]
                                ).map((item, i, arr) => {
                                  const Icon = item.icon;
                                  return (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1), type: "spring" }}
                                    className={`group/item relative flex flex-row items-center gap-4 bg-black/40 p-5 rounded-2xl border border-white/10 hover:border-white/40 transition-all cursor-default overflow-hidden hover:-translate-y-1 ${arr.length === 3 && i === 2 ? 'md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto' : ''}`}
                                    style={{
                                      boxShadow: `0 8px 30px ${slide7StepIdx === 0 ? 'rgba(59,130,246,0.05)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.05)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.05)' : 'rgba(244,63,94,0.05)'}`
                                    }}
                                  >
                                    {/* Animated Background Gradient on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover/item:opacity-20 transition-opacity duration-500"
                                         style={{ background: `radial-gradient(circle at left, ${slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e'} 0%, transparent 60%)` }}></div>
                                         
                                    {/* Corner Brackets */}
                                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l opacity-30 group-hover/item:opacity-100 transition-opacity" style={{ borderColor: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}></div>
                                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r opacity-30 group-hover/item:opacity-100 transition-opacity" style={{ borderColor: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}></div>
                                    
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg border backdrop-blur-md relative z-10 group-hover/item:scale-110 transition-transform duration-500"
                                         style={{ 
                                           backgroundColor: slide7StepIdx === 0 ? 'rgba(59,130,246,0.15)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.15)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.15)' : 'rgba(244,63,94,0.15)',
                                           borderColor: slide7StepIdx === 0 ? 'rgba(59,130,246,0.3)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.3)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.3)' : 'rgba(244,63,94,0.3)',
                                           color: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e'
                                         }}>
                                      <Icon className="w-6 h-6 md:w-7 md:h-7" />
                                    </div>
                                    
                                    <div className="flex flex-col relative z-10 flex-1">
                                      <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase mb-1 opacity-80"
                                            style={{ color: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}>
                                        Step 0{i+1}
                                      </span>
                                      <span className="text-base md:text-lg font-black text-white leading-tight mb-1">{item.title}</span>
                                      <span className="text-xs md:text-sm font-medium text-slate-400 group-hover/item:text-slate-200 transition-colors">{item.desc}</span>
                                    </div>
                                  </motion.div>
                                )})}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 8: THANK YOU                            */}
            {/* ======================================================== */}
            {currentSlide === 8 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto py-12 relative">
                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-corpCyan/10 rounded-full blur-[120px] pointer-events-none"></div>
                
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-corpCyan/40 bg-corpCyan/10 text-corpCyan text-xs md:text-sm font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,229,255,0.25)] relative z-10"
                >
                  <Sparkles className="w-4 h-4" />
                  SLT Smart Directory Assistant
                </motion.div>

                <motion.h2
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                  className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-6 tracking-tighter text-white leading-none relative z-10"
                >
                  Thank <span className="text-gradient">You.</span>
                </motion.h2>

                <motion.p
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-3xl text-slate-300 font-light mb-16 max-w-3xl leading-relaxed relative z-10"
                >
                  Empowering <span className="text-white font-bold">SLT Contact Center</span> with <br className="hidden md:inline" />
                  Live AI Assistance.
                </motion.p>
                
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4 }}
                  className="mt-12 flex flex-col items-center gap-3 relative z-10"
                >
                  <p className="text-sm md:text-base text-corpCyan font-mono tracking-widest uppercase bg-corpCyan/10 px-4 py-1.5 rounded-md border border-corpCyan/20">
                    Any Questions?
                  </p>
                  <p className="text-xs md:text-sm text-slate-600 font-mono">
                    Reference: ISP/S/2026/40/179
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
