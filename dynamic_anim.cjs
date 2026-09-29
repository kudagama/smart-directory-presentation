const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const startTag = 'const SystemOverloadNetwork = ({ stepIdx, setStepIdx, setAuto }: any) => {';
const endTag = 'const ImplementationAnimation = ({ stepIdx }: { stepIdx: number }) => {';

const startIndex = code.indexOf(startTag);
const endIndex = code.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find start or end bounds.");
  process.exit(1);
}

const replacementComponent = `const TrainingAnimation = ({ s, setStepIdx, setAuto }: any) => {
  return (
    <div className="glass-card rounded-2xl border-2 border-purple-500/30 bg-gradient-to-b from-purple-950/40 via-[#0A0515]/80 to-[#050010]/90 flex flex-col flex-1 min-h-0 relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-purple-500/20 z-20">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-purple-300">
          <Users className="w-3.5 h-3.5" />
          Onboarding Process Status
        </div>
        <button onClick={() => { setStepIdx(0); setAuto(true); }} className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono text-slate-400 border border-white/10 transition-colors">
          <RotateCcw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 gap-8 z-10">
        {/* Animated Calendar / Clock */}
        <motion.div 
          className="relative flex items-center justify-center w-32 h-32 rounded-full border-4 border-purple-500/30 bg-purple-500/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <motion.div 
            className="absolute w-1 h-12 bg-purple-400 origin-bottom rounded-full top-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-black text-purple-200">Months</span>
          </div>
        </motion.div>

        {/* Floating Training Modules */}
        <div className="w-full flex justify-between px-4">
          {s.rows.map((row: any, i: number) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: [0, -10, 0] }}
               transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
               className="flex flex-col items-center bg-black/40 p-3 rounded-xl border border-purple-500/30 w-24 text-center shadow-lg backdrop-blur-md"
             >
               <span className="text-[9px] uppercase text-purple-400 font-bold mb-1">{row.name}</span>
               <span className="text-xs text-white font-black">{row.ext}</span>
             </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ErrorChainAnimation = ({ s, setStepIdx, setAuto }: any) => {
  return (
    <div className="glass-card rounded-2xl border-2 border-red-500/40 bg-gradient-to-b from-red-950/40 via-[#0A0515]/80 to-[#050010]/90 flex flex-col flex-1 min-h-0 relative overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.2)]">
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-red-500/20 z-20">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-red-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          Fault Reporting Analysis
        </div>
        <button onClick={() => { setStepIdx(0); setAuto(true); }} className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono text-slate-400 border border-white/10 transition-colors">
          <RotateCcw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>
      
      <div className="flex-1 relative flex flex-col items-center justify-center p-4 z-10 gap-6">
         {/* Initial Ticket */}
         <motion.div 
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="w-48 p-3 bg-red-950/80 border-2 border-red-500 rounded-lg text-center shadow-[0_0_30px_rgba(244,63,94,0.4)]"
         >
           <div className="text-[10px] text-red-300 uppercase tracking-widest font-bold">Incorrect Fault Logged</div>
           <div className="text-xl font-black text-white mt-1">Ticket #49221</div>
         </motion.div>

         {/* Chain Reaction Arrows */}
         <div className="flex gap-4">
           {s.rows.slice(1).map((row: any, i: number) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 + i * 0.4 }}
               className="flex flex-col items-center gap-2"
             >
               <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                 <ArrowDown className="text-red-500 w-5 h-5" />
               </motion.div>
               <div className="w-28 p-2 bg-black/60 border border-red-500/30 rounded text-center">
                 <div className="text-[9px] text-slate-400 uppercase">{row.dept}</div>
                 <div className="text-xs text-red-200 font-bold mt-0.5">{row.ext}</div>
               </div>
             </motion.div>
           ))}
         </div>
      </div>
    </div>
  );
};

const ImpactDashboard = ({ s, setStepIdx, setAuto }: any) => {
  return (
    <div className="glass-card rounded-2xl border-2 border-corpCyan/40 bg-gradient-to-b from-cyan-950/30 via-[#0A0515]/80 to-[#050010]/90 flex flex-col flex-1 min-h-0 relative overflow-hidden shadow-[0_0_50px_rgba(0,229,255,0.1)]">
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-corpCyan/20 z-20">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-cyan-300">
          <Clock className="w-3.5 h-3.5" />
          Business Impact Summary
        </div>
        <button onClick={() => { setStepIdx(0); setAuto(true); }} className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/15 text-[10px] font-mono text-slate-400 border border-white/10 transition-colors">
          <RotateCcw className="w-2.5 h-2.5" /> Reset
        </button>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-3 p-4 items-center">
         {s.rows.map((row: any, i: number) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: i * 0.1 }}
             className="bg-black/30 border border-corpCyan/20 p-3 rounded-xl flex flex-col justify-center h-full"
           >
             <span className="text-[10px] text-cyan-400 uppercase font-mono tracking-wider">{row.dept}</span>
             <span className="text-sm font-bold text-white mt-1 leading-tight">{row.name}</span>
           </motion.div>
         ))}
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
    <div className={\`glass-card rounded-2xl border-2 flex flex-col flex-1 min-h-0 relative overflow-hidden transition-all duration-1000 \${isDanger ? 'border-red-500/40 bg-gradient-to-b from-red-950/30 via-[#0A0515]/80 to-[#050010]/90 shadow-[0_0_50px_rgba(244,63,94,0.2)]' : 'border-corpCyan/40 bg-gradient-to-b from-cyan-950/30 via-[#0A0515]/80 to-[#050010]/90 shadow-[0_0_50px_rgba(0,229,255,0.1)]'}\`}>
      
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
      <div className={\`flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b z-20 relative \${isDanger ? 'border-red-500/20' : 'border-corpCyan/20'}\`}>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
             <span className={\`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 \${isDanger ? 'bg-red-400' : 'bg-corpCyan'}\`}></span>
             <span className={\`relative inline-flex rounded-full h-2.5 w-2.5 \${isDanger ? 'bg-red-500' : 'bg-corpCyan'}\`}></span>
          </span>
          <span className={\`text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 \${isDanger ? 'text-red-300' : 'text-cyan-300'}\`}>
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
            backgroundImage: \`linear-gradient(\${isDanger ? 'rgba(244,63,94,0.15)' : 'rgba(0,229,255,0.15)'} 1px, transparent 1px), linear-gradient(90deg, \${isDanger ? 'rgba(244,63,94,0.15)' : 'rgba(0,229,255,0.15)'} 1px, transparent 1px)\`,
            backgroundSize: '40px 40px',
            transform: 'rotateX(70deg) rotateZ(45deg)'
          }}
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating Data Modules */}
        <div className="relative w-full h-full flex items-center justify-center z-20">
           {s.rows && s.rows.map((row: any, i: number) => (
             <motion.div
               key={\`\${stepIdx}-\${i}\`}
               initial={{ opacity: 0, scale: 0, y: 50 }}
               animate={{ 
                 opacity: 1, 
                 scale: 1, 
                 y: Math.sin(i * 2 + chaos * 20) * (60 + chaos * 80),
                 x: Math.cos(i * 2 + chaos * 20) * (100 + chaos * 120),
                 rotateY: chaos * 30,
                 rotateZ: (chaos > 0.5 ? Math.random() * 10 - 5 : 0)
               }}
               transition={{ type: "spring", bounce: 0.5, delay: i * 0.1 }}
               className={\`absolute p-3 rounded-xl border backdrop-blur-xl flex flex-col gap-1 w-48 shadow-2xl \${
                 isDanger ? 'bg-red-950/60 border-red-500/50' : 'bg-cyan-950/60 border-corpCyan/50'
               }\`}
             >
                <div className={\`text-[9px] uppercase tracking-widest font-bold \${isDanger ? 'text-red-400' : 'text-cyan-400'}\`}>
                  {row.dept}
                </div>
                <div className="text-xs md:text-sm font-bold text-white leading-tight">
                  {row.name}
                </div>
                <div className={\`mt-1.5 text-[10px] font-mono py-1 px-2 rounded bg-black/40 border \${isDanger ? 'border-red-500/30 text-red-300' : 'border-corpCyan/30 text-cyan-300'}\`}>
                  {row.status}
                </div>
             </motion.div>
           ))}

           {/* Central Core */}
           <motion.div
             animate={{ 
               scale: [1, 1 + chaos * 0.3, 1],
               rotate: chaos * 180
             }}
             transition={{ duration: Math.max(0.2, 2 - chaos * 1.5), repeat: Infinity }}
             className={\`absolute w-28 h-28 md:w-36 md:h-36 rounded-full border-4 flex items-center justify-center backdrop-blur-2xl \${
               isDanger ? 'border-red-500 bg-red-500/10 shadow-[0_0_80px_rgba(244,63,94,0.5)]' : 'border-corpCyan bg-corpCyan/10 shadow-[0_0_80px_rgba(0,229,255,0.5)]'
             }\`}
           >
              <div className={\`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center \${isDanger ? 'bg-red-500 shadow-[0_0_30px_rgba(244,63,94,1)]' : 'bg-corpCyan shadow-[0_0_30px_rgba(0,229,255,1)]'}\`}>
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
      <div className={\`p-4 border-t z-20 relative \${isDanger ? 'border-red-500/20 bg-red-950/80' : 'border-corpCyan/20 bg-cyan-950/80'}\`}>
         <div className="flex items-center justify-between">
           <div className="flex flex-col">
             <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Chaos Level</span>
             <span className={\`text-lg font-black font-mono \${isDanger ? 'text-red-400' : 'text-cyan-400'}\`}>
               {Math.round(chaos * 100)}%
             </span>
           </div>
           <div className="flex flex-col text-right">
             <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Elapsed Time</span>
             <span className={\`text-lg font-black font-mono \${isDanger ? 'text-red-400' : 'text-cyan-400'}\`}>
               {s.elapsed}
             </span>
           </div>
         </div>
      </div>
    </div>
  );
};
\n`;

const newCode = code.substring(0, startIndex) + replacementComponent + code.substring(endIndex);

fs.writeFileSync('src/App.tsx', newCode);
console.log("Replaced with dynamic animations!");
