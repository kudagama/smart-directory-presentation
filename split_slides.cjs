const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

let s9Idx = code.indexOf('{currentSlide === 9 && (');
if (s9Idx === -1) {
  console.log('Cannot find slide 9');
} else {
  let endIdx = code.indexOf('</AnimatePresence>', s9Idx);
  let oldBlock = code.substring(s9Idx, endIdx);
  
  let newBlock = `{currentSlide === 9 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto py-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-black mb-12 tracking-widest uppercase text-corpCyan/80">
                  Our Vision
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative z-10 max-w-5xl w-full px-4">
                  <div className="relative p-8 md:p-12 rounded-3xl bg-black/40 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-corpCyan/40 transition-colors duration-500">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-corpCyan to-blue-500 rounded-l-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <h3 className="text-2xl md:text-3xl text-slate-300 font-light leading-relaxed text-center relative z-10 flex flex-col gap-4 md:gap-6">
                      <span>Our vision is <span className="text-rose-400 font-bold border-b-2 border-rose-400/50 pb-1">not</span> to replace our contact center agents with AI.</span>
                      <span className="text-3xl md:text-5xl text-white font-extrabold tracking-tight">
                        Our vision is to make <br className="md:hidden"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-corpCyan to-blue-400 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">every contact center agent better</span> <br className="md:hidden"/> with AI
                      </span>
                    </h3>
                  </div>
                </motion.div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SLIDE 10: THANK YOU                            */}
            {/* ======================================================== */}
            {currentSlide === 10 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto py-12 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-corpCyan/10 rounded-full blur-[120px] pointer-events-none"></div>
                
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-6 tracking-tighter text-white leading-none relative z-10">
                  Thank <span className="text-gradient">You.</span>
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-12 flex flex-col items-center gap-3 relative z-10">
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
        `;

  code = code.replace(oldBlock, newBlock);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Splitting done via substring replace!');
}
