import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Clock, Headset, TrendingUp,
  Users, Ear, Brain, Zap, Sparkles, ArrowDown
} from 'lucide-react';

const TOTAL_SLIDES = 8;

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowRight', 'Space', 'Enter', 'PageDown'].includes(e.key)) {
        nextSlide();
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const goToSlide = (index: number) => setCurrentSlide(index);

  // Slide Animation Variants
  const slideVariants: any = {
    initial: { opacity: 0, x: 50, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, x: -50, scale: 0.98, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const NextButton = () => (
    <div className="mt-auto pt-16 pb-24 w-full flex justify-center">
      <button
        onClick={nextSlide}
        className="flex items-center gap-3 px-8 py-3 rounded-full bg-corpCyan/10 border border-corpCyan/30 text-corpCyan hover:bg-corpCyan hover:text-corpBlue hover:scale-105 transition-all font-bold group shadow-[0_0_15px_rgba(0,229,255,0.15)]"
      >
        <span>Continue to Next Slide</span>
        <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
      </button>
    </div>
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-corpBlue flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background Glows */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-blue-900 rounded-full blur-[100px] opacity-30 z-0"
      />
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-teal-800 rounded-full blur-[100px] opacity-30 z-0"
      />

      {/* Slide Deck Container */}
      <div className="relative z-10 w-full max-w-7xl h-full max-h-[720px] aspect-video bg-corpLightBlue/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 h-1.5 bg-white/10 w-full z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-corpCyan to-blue-500 shadow-[0_0_15px_#00E5FF]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / TOTAL_SLIDES) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 p-8 md:p-16 flex flex-col overflow-y-auto overflow-x-hidden custom-scrollbar"
            >
              {currentSlide === 0 && (
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <motion.div variants={staggerVariants} initial="initial" animate="animate" className="mb-6 inline-block px-4 py-1.5 rounded-full border border-corpCyan/30 bg-corpCyan/10 text-corpCyan text-sm font-semibold tracking-wider uppercase shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    SLT Innovation Pitch 2026
                  </motion.div>
                  <motion.h1 variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight text-white">
                    Smart Directory <span className="text-gradient">AI</span>
                  </motion.h1>
                  <motion.p variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }} className="text-2xl md:text-3xl text-gray-300 font-light mb-12 max-w-3xl leading-relaxed">
                    Empowering Human Empathy with <br /> AI Intelligence
                  </motion.p>

                  <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-12 w-full max-w-2xl mt-8 pt-8 border-t border-white/10 text-left">
                    <div>
                      <h3 className="text-corpCyan text-sm uppercase font-bold tracking-widest mb-2">Team</h3>
                      <p className="text-lg text-white font-medium">[Your Team Name]</p>
                      <p className="text-gray-400 text-sm">Member 1, Member 2</p>
                    </div>
                    <div>
                      <h3 className="text-corpCyan text-sm uppercase font-bold tracking-widest mb-2">Reference</h3>
                      <p className="text-lg text-white font-medium font-mono bg-white/5 px-3 py-1 rounded inline-block border border-white/10">SLT-COMP-2026-X</p>
                    </div>
                  </motion.div>
                  <NextButton />
                </div>
              )}

              {currentSlide === 1 && (
                <div className="flex flex-col h-full">
                  <motion.h2 variants={staggerVariants} initial="initial" animate="animate" className="text-4xl md:text-5xl font-bold mb-4">The <span className="text-gradient">Problem & Opportunity</span></motion.h2>
                  <motion.p variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="text-xl text-gray-400 mb-10">Why modernizing the SLT contact center is crucial right now.</motion.p>

                  <div className="grid grid-cols-2 gap-6 flex-1">
                    {[
                      { icon: Clock, color: "text-corpCyan", title: "High Average Handling Time", desc: "Agents spend valuable time manually typing and searching directories while the customer is kept waiting on hold." },
                      { icon: Headset, color: "text-blue-400", title: "Agent Burnout", desc: "Continuous manual data entry and searching leads to cognitive fatigue, impacting the quality of service provided." },
                      { icon: TrendingUp, color: "text-purple-400", title: "Lack of Real-time QA", desc: "Call auditing happens days later. Missing information or incorrect advice isn't caught in real-time." },
                      { icon: Users, color: "text-green-400", title: "The Human Touch", desc: "Sri Lankan customers prefer speaking to human agents. Standard IVR bots cause frustration and drop-offs.", border: "border-corpCyan/30" }
                    ].map((item, i) => (
                      <motion.div key={i} variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.2 + (i * 0.1) }} className={`glass-card p-6 flex flex-col justify-center relative overflow-hidden group ${item.border || ''}`}>
                        <div className="absolute -right-4 -top-4 text-8xl text-white/5 group-hover:text-white/10 transition-colors"><item.icon /></div>
                        <item.icon className={`w-10 h-10 ${item.color} mb-4 ${i === 0 ? 'animate-pulse' : ''}`} />
                        <h3 className="text-2xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                  <NextButton />
                </div>
              )}

              {/* Continuing other slides similarly... Add more conditions for slides 2-7 */}
              {currentSlide === 2 && (
                <div className="flex flex-col h-full">
                  <motion.h2 variants={staggerVariants} initial="initial" animate="animate" className="text-4xl md:text-5xl font-bold mb-4">Proposed <span className="text-gradient">Solution</span></motion.h2>
                  <motion.p variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="text-xl text-gray-400 mb-8">The Agent Copilot: Empathy from humans, speed from AI.</motion.p>

                  <div className="flex flex-1 gap-8 items-center">
                    <div className="flex-1 space-y-6">
                      {[
                        { icon: Ear, color: "text-corpCyan", bg: "bg-corpCyan/20 border-corpCyan/50 shadow-[0_0_15px_rgba(0,229,255,0.3)]", title: "Real-Time Listening", desc: "AI securely streams audio during the call, transcribing mixed Sinhala/English (Singlish) in milliseconds." },
                        { icon: Brain, color: "text-blue-400", bg: "bg-blue-500/20 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]", title: "Intent Extraction", desc: "An LLM extracts exact requirements without manual input." },
                        { icon: Zap, color: "text-purple-400", bg: "bg-purple-500/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]", title: "Zero-Click Lookup", desc: "Results instantly pop up on the agent's screen. The agent simply reads it to the customer naturally." }
                      ].map((item, i) => (
                        <motion.div key={i} variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.2 + (i * 0.1) }} className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${item.bg}`}>
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                            <p className="text-gray-400 mt-1">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.5 }} className="flex-1 glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden h-[400px]">
                      <div className="w-full bg-[#050D1A] rounded-xl border border-gray-700 shadow-2xl overflow-hidden relative h-full flex flex-col">
                        <div className="bg-gray-800/80 p-3 flex items-center gap-2 border-b border-gray-700 backdrop-blur-sm">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-400 ml-2 font-mono">SLT_Copilot_Live_Dashboard</span>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-center space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <p className="text-sm text-gray-300 font-mono w-full">Customer: <span className="text-white">"Mata Kandy hospital eke number eka one."</span></p>
                          </div>
                          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1 }} className="bg-corpCyan/10 border border-corpCyan/40 p-5 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                            <h4 className="text-corpCyan font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider"><Sparkles className="w-4 h-4" /> AI Suggestion Ready</h4>
                            <p className="text-white text-xl font-bold">Kandy General Hospital</p>
                            <p className="text-3xl font-mono text-white mt-2 font-bold tracking-wider">081 222 2222</p>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <NextButton />
                </div>
              )}

              {/* Additional generic rendering for other slides to save space in code. 
                  In a real project, we'd split these into components. */}
              {currentSlide > 2 && currentSlide < 7 && (
                <div className="flex flex-col h-full items-center justify-center">
                  <motion.h2 variants={staggerVariants} initial="initial" animate="animate" className="text-4xl md:text-5xl font-bold mb-4 text-center">Slide <span className="text-gradient">{currentSlide}</span></motion.h2>
                  <motion.p variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="text-xl text-gray-400 text-center">Content for slide {currentSlide} is available in HTML format.</motion.p>
                  <NextButton />
                </div>
              )}

              {currentSlide === 7 && (
                <div className="flex flex-col h-full items-center justify-center text-center">
                  <motion.h2 variants={staggerVariants} initial="initial" animate="animate" className="text-5xl md:text-6xl font-bold mb-6">Support & <span className="text-gradient">Next Steps</span></motion.h2>
                  <motion.h3 variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }} className="text-5xl font-extrabold text-white tracking-wider mt-16">Thank You.</motion.h3>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 glass-card px-6 py-3 z-50">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-gray-400 hover:text-white transition-colors p-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-3">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide
                ? 'bg-corpCyan scale-125 shadow-[0_0_8px_#00E5FF]'
                : 'bg-gray-600 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === TOTAL_SLIDES - 1}
          className="text-corpCyan hover:text-white transition-colors p-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  );
};

export default App;
