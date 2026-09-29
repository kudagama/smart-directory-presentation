const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. TrainingAnimation
code = code.replace(
  /w-32 md:w-36 shadow-2xl"\s*>\s*<div className="text-\[9px\] uppercase tracking-widest font-bold text-purple-400 text-center">\s*\{row\.name\}\s*<\/div>\s*<div className="text-\[10px\] md:text-xs font-black text-white leading-tight">/g,
  `w-44 md:w-52 shadow-2xl p-4">
                  <div className="text-xs md:text-sm uppercase tracking-widest font-bold text-purple-400 text-center mb-1">
                    {row.name}
                  </div>
                  <div className="text-sm md:text-base font-black text-white leading-tight text-center">`
);

// 2. ErrorChainAnimation
// Top Ticket
code = code.replace(
  /w-56 p-4 bg-red-950\/80 border-2 border-red-500 rounded-xl text-center shadow-\[0_20px_50px_rgba\(244,63,94,0\.5\)\] backdrop-blur-xl relative z-30"\s*>\s*<div className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">\s*<XCircle className="w-4 h-4 text-white" \/>\s*<\/div>\s*<div className="text-\[10px\] text-red-300 uppercase tracking-widest font-bold mb-1">Trigger Event<\/div>\s*<div className="text-lg font-black text-white">Incorrect Fault Logged<\/div>/g,
  `w-64 md:w-80 p-5 bg-red-950/80 border-2 border-red-500 rounded-xl text-center shadow-[0_20px_50px_rgba(244,63,94,0.5)] backdrop-blur-xl relative z-30">
             <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-white" />
             </div>
             <div className="text-xs md:text-sm text-red-300 uppercase tracking-widest font-bold mb-2">Trigger Event</div>
             <div className="text-xl md:text-2xl font-black text-white">Incorrect Fault Logged</div>`
);

// Cascading Tickets & Spread
code = code.replace(/const spread = 150;/g, 'const spread = 200;');
code = code.replace(
  /w-32 h-24 p-3 bg-black\/70 border border-red-500\/50 rounded-lg text-center flex flex-col justify-center items-center backdrop-blur-md shadow-\[0_10px_30px_rgba\(244,63,94,0\.4\)\]"\s*>\s*<div className="text-\[9px\] text-slate-400 uppercase tracking-wider">\{row\.dept\}<\/div>\s*<div className="text-xs md:text-sm text-red-200 font-black mt-2 leading-tight">\{row\.ext\}<\/div>/g,
  `w-44 md:w-52 h-28 md:h-32 p-4 bg-black/70 border border-red-500/50 rounded-lg text-center flex flex-col justify-center items-center backdrop-blur-md shadow-[0_10px_30px_rgba(244,63,94,0.4)]">
                   <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">{row.dept}</div>
                   <div className="text-sm md:text-base text-red-200 font-black mt-2 leading-tight">{row.ext}</div>`
);

// 3. ImpactDashboard
code = code.replace(
  /w-full h-24 md:h-28 bg-black\/60 border border-corpCyan\/40 p-3 rounded-xl flex flex-col justify-center items-center text-center shadow-\[0_15px_30px_rgba\(0,229,255,0\.25\)\] backdrop-blur-xl hover:border-corpCyan hover:bg-cyan-950\/60 transition-all cursor-default"\s*>\s*<span className="text-\[10px\] text-cyan-400 uppercase font-mono tracking-widest mb-1 opacity-80">\{row\.dept\}<\/span>\s*<span className="text-xs md:text-sm font-black text-white leading-snug">\{row\.name\}<\/span>/g,
  `w-full h-32 md:h-40 bg-black/60 border border-corpCyan/40 p-4 rounded-xl flex flex-col justify-center items-center text-center shadow-[0_15px_30px_rgba(0,229,255,0.25)] backdrop-blur-xl hover:border-corpCyan hover:bg-cyan-950/60 transition-all cursor-default">
                 <span className="text-xs md:text-sm text-cyan-400 uppercase font-mono tracking-widest mb-2 opacity-80">{row.dept}</span>
                 <span className="text-sm md:text-lg font-black text-white leading-snug">{row.name}</span>`
);

// 4. SystemOverloadNetwork
// Increase base radius to prevent overlap
code = code.replace(/const baseRadiusX = 200;/g, 'const baseRadiusX = 240;');
code = code.replace(/const baseRadiusY = 130;/g, 'const baseRadiusY = 160;');
code = code.replace(
  /w-32 md:w-36 shadow-2xl \$\{[\s\S]*?}\`\}\s*>\s*<div className=\{\`text-\[9px\] uppercase tracking-widest font-bold text-center \$\{isDanger \? 'text-red-400' : 'text-cyan-400'\}\`\}>\s*\{row\.dept\}\s*<\/div>\s*<div className="text-\[10px\] md:text-xs font-black text-white leading-tight text-center">\s*\{row\.name\}\s*<\/div>\s*<div className=\{\`mt-1\.5 text-\[9px\] font-mono py-1 px-1\.5 rounded text-center bg-black\/50 border \$\{isDanger \? 'border-red-500\/40 text-red-300' : 'border-corpCyan\/40 text-cyan-300'\}\`\}>\s*\{row\.status\}\s*<\/div>/g,
  `w-44 md:w-56 shadow-2xl p-4 \${
                 isDanger ? 'bg-red-950/80 border-red-500/60' : 'bg-cyan-950/70 border-corpCyan/50'
               }\`}>
                <div className={\`text-xs md:text-sm uppercase tracking-widest font-bold text-center mb-1 \${isDanger ? 'text-red-400' : 'text-cyan-400'}\`}>
                  {row.dept}
                </div>
                <div className="text-sm md:text-base font-black text-white leading-tight text-center mb-2">
                  {row.name}
                </div>
                <div className={\`text-xs md:text-sm font-mono py-1.5 px-2 rounded text-center bg-black/50 border \${isDanger ? 'border-red-500/40 text-red-300' : 'border-corpCyan/40 text-cyan-300'}\`}>
                  {row.status}
                </div>`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Successfully enlarged text sizes and card dimensions!");
