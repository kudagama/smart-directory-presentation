const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexError = /const ErrorChainAnimation =[\s\S]*?const ImpactDashboard =/m;
const replacementError = `const ErrorChainAnimation = ({ s, setStepIdx, setAuto }: any) => {
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
            backgroundImage: \`linear-gradient(rgba(244,63,94,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.15) 1px, transparent 1px)\`,
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
             className="w-56 p-4 bg-red-950/80 border-2 border-red-500 rounded-xl text-center shadow-[0_20px_50px_rgba(244,63,94,0.5)] backdrop-blur-xl relative z-30"
           >
             <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <XCircle className="w-4 h-4 text-white" />
             </div>
             <div className="text-[10px] text-red-300 uppercase tracking-widest font-bold mb-1">Trigger Event</div>
             <div className="text-lg font-black text-white">Incorrect Fault Logged</div>
           </motion.div>

           {/* 3D Cascading Arrows and Impacts */}
           <div className="relative mt-12 flex justify-center w-full max-w-lg perspective-[800px]">
             {s.rows.slice(1).map((row: any, i: number) => {
               // Spread them widely! i is 0, 1, 2
               const spread = 150;
               return (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: -20, z: -100 }}
                 animate={{ opacity: 1, y: i * 15, z: i * 60 }}
                 transition={{ delay: 0.4 + i * 0.3, type: "spring" }}
                 className="absolute flex flex-col items-center"
                 style={{ 
                   transform: \`translateX(\${(i - 1) * spread}px) translateZ(\${i * 60}px)\` 
                 }}
               >
                 <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}>
                   <ArrowDown className="text-red-500 w-8 h-8 mb-3 drop-shadow-[0_0_10px_rgba(244,63,94,1)]" />
                 </motion.div>
                 <div className="w-32 h-24 p-3 bg-black/70 border border-red-500/50 rounded-lg text-center flex flex-col justify-center items-center backdrop-blur-md shadow-[0_10px_30px_rgba(244,63,94,0.4)]">
                   <div className="text-[9px] text-slate-400 uppercase tracking-wider">{row.dept}</div>
                   <div className="text-xs md:text-sm text-red-200 font-black mt-2 leading-tight">{row.ext}</div>
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

const ImpactDashboard =`;

const regexImpact = /const ImpactDashboard =[\s\S]*?const SystemOverloadNetwork =/m;
const replacementImpact = `const ImpactDashboard = ({ s, setStepIdx, setAuto }: any) => {
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
            backgroundImage: \`radial-gradient(circle at center, rgba(0,229,255,0.1) 0%, transparent 70%), linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)\`,
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
                 className="w-full h-24 md:h-28 bg-black/60 border border-corpCyan/40 p-3 rounded-xl flex flex-col justify-center items-center text-center shadow-[0_15px_30px_rgba(0,229,255,0.25)] backdrop-blur-xl hover:border-corpCyan hover:bg-cyan-950/60 transition-all cursor-default"
               >
                 <span className="text-[10px] text-cyan-400 uppercase font-mono tracking-widest mb-1 opacity-80">{row.dept}</span>
                 <span className="text-xs md:text-sm font-black text-white leading-snug">{row.name}</span>
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

const SystemOverloadNetwork =`;

const regexOverload = /\{\/\* Floating Data Modules \*\/\}[\s\S]*?\{\/\* Central Core \*\/\}/m;
const replacementOverload = `{/* Floating Data Modules */}
        <div className="relative w-full h-full flex items-center justify-center z-20">
           {s.rows && s.rows.map((row: any, i: number) => {
             // WIDE SPREAD for Overload items
             const angle = (i / s.rows.length) * Math.PI * 2;
             const baseRadiusX = 200; 
             const baseRadiusY = 130;
             return (
             <motion.div
               key={\`\${stepIdx}-\${i}\`}
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
               className={\`absolute p-3 rounded-xl border backdrop-blur-xl flex flex-col gap-1 w-32 md:w-36 shadow-2xl \${
                 isDanger ? 'bg-red-950/80 border-red-500/60' : 'bg-cyan-950/70 border-corpCyan/50'
               }\`}
             >
                <div className={\`text-[9px] uppercase tracking-widest font-bold text-center \${isDanger ? 'text-red-400' : 'text-cyan-400'}\`}>
                  {row.dept}
                </div>
                <div className="text-[10px] md:text-xs font-black text-white leading-tight text-center">
                  {row.name}
                </div>
                <div className={\`mt-1.5 text-[9px] font-mono py-1 px-1.5 rounded text-center bg-black/50 border \${isDanger ? 'border-red-500/40 text-red-300' : 'border-corpCyan/40 text-cyan-300'}\`}>
                  {row.status}
                </div>
             </motion.div>
           )})}

           {/* Central Core */}`;

if (regexError.test(code)) {
  code = code.replace(regexError, replacementError);
} else {
  console.log("ErrorChain regex failed");
}

if (regexImpact.test(code)) {
  code = code.replace(regexImpact, replacementImpact);
} else {
  console.log("ImpactDashboard regex failed");
}

if (regexOverload.test(code)) {
  code = code.replace(regexOverload, replacementOverload);
} else {
  console.log("Overload regex failed");
}

fs.writeFileSync('src/App.tsx', code);
console.log("Successfully fixed all layout clumps!");
