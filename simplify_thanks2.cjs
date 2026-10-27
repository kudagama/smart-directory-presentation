const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startIndex = code.indexOf('{/* SLIDE 8: THANK YOU');
const endIndexStr = '</AnimatePresence>';
// Find the last occurrence of </AnimatePresence> after startIndex
let endIndex = code.indexOf(endIndexStr, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find start or end index");
  process.exit(1);
}

// Adjust startIndex to include the comment block start
const actualStartIndex = code.lastIndexOf('{/* ===', startIndex);

const replacement = `{/* ======================================================== */}
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
        `;

const newCode = code.substring(0, actualStartIndex) + replacement + code.substring(endIndex);
fs.writeFileSync('src/App.tsx', newCode);
console.log("Successfully simplified Thank You slide!");
