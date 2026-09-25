import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Clock, Headset, TrendingUp,
  Users, Ear, Brain, Zap, Sparkles, ArrowDown,
  ClipboardCheck, CheckCircle, AlertTriangle, PieChart, HeartPulse, Bell,
  Cloud, Cpu, Atom, Globe
} from 'lucide-react';

const TOTAL_SLIDES = 8;

const Particles = () => {
  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1 + 'px',
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    baseOpacity: Math.random() * 0.5 + 0.1,
    yAnim: Math.random() * -150 - 50,
    xAnim: (Math.random() - 0.5) * 50,
    targetOpacity: Math.random() * 0.8 + 0.2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 10,
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
      {/* Background Glows and Particles */}
      <Particles />
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(to right, #00E5FF 1px, transparent 1px), linear-gradient(to bottom, #00E5FF 1px, transparent 1px)',
        backgroundSize: '4rem 4rem',
        maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, #000 10%, transparent 100%)'
      }} />

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
                      <p className="text-lg text-white font-medium">Contact Center Team</p>
                    </div>
                    <div>
                      <h3 className="text-corpCyan text-sm uppercase font-bold tracking-widest mb-2">Reference</h3>
                      <p className="text-lg text-white font-medium font-mono bg-white/5 px-3 py-1 rounded inline-block border border-white/10">ISP/S/2026/40/179</p>
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

              {currentSlide === 3 && (
                <div className="flex flex-col h-full">
                  <motion.h2 variants={staggerVariants} initial="initial" animate="animate" className="text-4xl md:text-5xl font-bold mb-4">Post-Call <span className="text-gradient">Analytics & Wellness</span></motion.h2>
                  <motion.p variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="text-xl text-gray-400 mb-8">AI continues to work even after the customer hangs up.</motion.p>
                  
                  <div className="flex flex-1 gap-6">
                    {/* Quality Assurance Card */}
                    <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }} className="flex-1 glass-card p-8 flex flex-col relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -z-10 group-hover:bg-blue-500/20 transition-colors"></div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400 text-2xl border border-blue-500/30">
                          <ClipboardCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Smart Quality Assurance</h3>
                      </div>
                      <ul className="space-y-4 flex-1">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 shrink-0" />
                          <p className="text-gray-300"><strong>Instant Summary:</strong> Generates a brief text summary of the call immediately after termination.</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-1 shrink-0" />
                          <p className="text-gray-300"><strong>Error Detection:</strong> Highlights if the agent provided incorrect info or missed mandatory greetings.</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <PieChart className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                          <p className="text-gray-300"><strong>100% Coverage:</strong> Analyzes every single call instead of random manual sampling.</p>
                        </li>
                      </ul>
                    </motion.div>

                    {/* Fatigue Detection Card */}
                    <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.4 }} className="flex-1 glass-card p-8 flex flex-col relative overflow-hidden group border-corpCyan/30">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-corpCyan/10 rounded-bl-full -z-10 group-hover:bg-corpCyan/20 transition-colors"></div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-corpCyan/20 rounded-lg text-corpCyan text-2xl border border-corpCyan/30">
                          <HeartPulse className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Agent Fatigue Detection</h3>
                      </div>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        Beyond technical metrics, the AI monitors the human element. By analyzing <strong>speech patterns, voice pitch, and response latency</strong> over a shift, it detects signs of cognitive fatigue.
                      </p>
                      <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 mt-auto">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-gray-300">Agent Wellness Score</span>
                          <span className="text-sm font-bold text-yellow-400">Needs Break</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-2"><Bell className="w-3 h-3 text-yellow-500" /> Alert triggered to Team Lead to arrange a rotation.</p>
                      </div>
                    </motion.div>
                  </div>
                  <NextButton />
                </div>
              )}

              {currentSlide === 4 && (
                <div className="flex flex-col h-full">
                  <motion.h2 variants={staggerVariants} initial="initial" animate="animate" className="text-4xl md:text-5xl font-bold mb-4">Business Value & <span className="text-gradient">Benefits</span></motion.h2>
                  <motion.p variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="text-xl text-gray-400 mb-12">Quantifiable impact on operations and customer satisfaction.</motion.p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 items-center">
                    <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.2 }} className="text-center p-8 glass-card hover:bg-white/5 transition-colors group">
                      <div className="text-5xl md:text-6xl font-extrabold text-corpCyan mb-4 group-hover:scale-110 transition-transform">-40%</div>
                      <h3 className="text-xl font-bold text-white mb-2">AHT Reduction</h3>
                      <p className="text-sm text-gray-400">Zero search time drops call lengths drastically, saving immense operational costs.</p>
                    </motion.div>
                    <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }} className="text-center p-8 glass-card hover:bg-white/5 transition-colors group">
                      <div className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-4 group-hover:scale-110 transition-transform">100%</div>
                      <h3 className="text-xl font-bold text-white mb-2">Call Auditing</h3>
                      <p className="text-sm text-gray-400">Instant AI summaries and QA checks after every call ensure zero missed errors.</p>
                    </motion.div>
                    <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.4 }} className="text-center p-8 glass-card hover:bg-white/5 transition-colors group">
                      <div className="text-5xl md:text-6xl font-extrabold text-purple-400 mb-4 group-hover:scale-110 transition-transform">CSAT ↑</div>
                      <h3 className="text-xl font-bold text-white mb-2">Customer Exp</h3>
                      <p className="text-sm text-gray-400">Faster answers, zero hold music, all while maintaining the vital human touch.</p>
                    </motion.div>
                    <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.5 }} className="text-center p-8 glass-card hover:bg-white/5 transition-colors group border-b-4 border-b-green-500">
                      <div className="text-5xl md:text-6xl font-extrabold text-green-400 mb-4 group-hover:scale-110 transition-transform">ESAT ↑</div>
                      <h3 className="text-xl font-bold text-white mb-2">Agent Wellbeing</h3>
                      <p className="text-sm text-gray-400">Fatigue alerts and vastly reduced cognitive load keeps officers happier and sharper.</p>
                    </motion.div>
                  </div>
                  <NextButton />
                </div>
              )}

              {currentSlide === 5 && (
                <div className="flex flex-col h-full">
                  <motion.h2 variants={staggerVariants} initial="initial" animate="animate" className="text-4xl md:text-5xl font-bold mb-4">Implementation <span className="text-gradient">Approach</span></motion.h2>
                  <motion.p variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="text-xl text-gray-400 mb-10">Strategic rollout combining modern infrastructure and phased scaling.</motion.p>
                  
                  <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }} className="grid grid-cols-3 gap-6 mb-10">
                    <div className="glass-card p-5 text-center hover:bg-white/5">
                      <Cloud className="w-10 h-10 text-gray-300 mb-3 mx-auto" />
                      <h4 className="font-bold text-white text-lg">Cloud STT Engine</h4>
                      <p className="text-sm text-gray-400 mt-1">Mixed Sinhala/English real-time streaming audio.</p>
                    </div>
                    <div className="glass-card p-5 text-center hover:bg-white/5">
                      <Cpu className="w-10 h-10 text-gray-300 mb-3 mx-auto" />
                      <h4 className="font-bold text-white text-lg">Local/Cloud LLM</h4>
                      <p className="text-sm text-gray-400 mt-1">Secure intent extraction & call summarization logic.</p>
                    </div>
                    <div className="glass-card p-5 text-center hover:bg-white/5">
                      <Atom className="w-10 h-10 text-corpCyan mb-3 mx-auto animate-pulse" />
                      <h4 className="font-bold text-white text-lg">React Stack</h4>
                      <p className="text-sm text-gray-400 mt-1">Low-latency backend and reactive agent dashboard UI.</p>
                    </div>
                  </motion.div>

                  <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.4 }} className="relative flex-1">
                    {/* Timeline Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-corpCyan to-gray-600 -translate-x-1/2 rounded-full"></div>
                    
                    {/* Timeline Items */}
                    <div className="relative z-10 flex flex-col justify-center h-full gap-10">
                      <div className="flex flex-col md:flex-row items-center w-full group">
                        <div className="w-full md:w-1/2 md:pr-12 text-left md:text-right transition-transform group-hover:-translate-x-2">
                          <h3 className="text-2xl font-bold text-corpCyan">Phase 1: Directory Service</h3>
                          <p className="text-gray-400 mt-1 text-lg">Implement on the 1912 hotline. Instant data retrieval for high-volume inquiries.</p>
                        </div>
                        <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-corpCyan rounded-full shadow-[0_0_20px_#00E5FF] -translate-x-1/2 mt-1 md:mt-0 z-20 border-4 border-[#0A192F]"></div>
                        <div className="w-full md:w-1/2 md:pl-12 hidden md:block"></div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center w-full mt-4 md:mt-0 group">
                        <div className="w-full md:w-1/2 md:pr-12 hidden md:block"></div>
                        <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-gray-500 rounded-full border-4 border-[#0A192F] -translate-x-1/2 mt-1 md:mt-0 z-20"></div>
                        <div className="w-full md:w-1/2 md:pl-12 text-left pl-12 md:pl-12 transition-transform group-hover:translate-x-2">
                          <h3 className="text-2xl font-bold text-gray-300">Phase 2: Full Integration</h3>
                          <p className="text-gray-400 mt-1 text-lg">Expand to Faults Reporting, Products, and Billing based on voice verification.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <NextButton />
                </div>
              )}

              {currentSlide === 6 && (
                <div className="flex flex-col h-full">
                  <motion.h2 variants={staggerVariants} initial="initial" animate="animate" className="text-4xl md:text-5xl font-bold mb-4">Market <span className="text-gradient">Potential</span></motion.h2>
                  <motion.p variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="text-xl text-gray-400 mb-10">Starting at SLT, adaptable to the global BPO industry.</motion.p>
                  
                  <div className="flex flex-1 gap-8">
                    <div className="w-1/2 flex flex-col justify-center">
                      <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.3 }} className="glass-card p-8 border-l-4 border-l-corpCyan mb-6 hover:translate-x-2 transition-transform">
                        <h3 className="text-2xl font-bold text-white mb-2">Primary Target: SLT Contact Centers</h3>
                        <p className="text-gray-400 text-lg">Immediate deployment capability for directory operations, reducing operational costs internally while proving the concept at scale.</p>
                      </motion.div>
                      <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.4 }} className="glass-card p-8 border-l-4 border-l-blue-500 hover:translate-x-2 transition-transform">
                        <h3 className="text-2xl font-bold text-white mb-2">Expansion Target: BPO Ecosystem</h3>
                        <p className="text-gray-400 text-lg">The architecture is system-agnostic. Can be licensed as a SaaS plugin for banks, hospitals, and generic call centers across Sri Lanka.</p>
                      </motion.div>
                    </div>
                    <motion.div variants={staggerVariants} initial="initial" animate="animate" transition={{ delay: 0.5 }} className="w-1/2 flex items-center justify-center relative">
                      {/* Decorative visual */}
                      <div className="w-full h-full glass-card flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center bg-blend-overlay overflow-hidden group" style={{ backgroundColor: 'rgba(10, 25, 47, 0.9)' }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-corpBlue to-transparent opacity-80"></div>
                        <div className="text-center relative z-10 transform group-hover:scale-105 transition-transform duration-500">
                          <Globe className="w-20 h-20 text-corpCyan mx-auto mb-6 opacity-90 drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
                          <h3 className="text-4xl font-bold text-white">Scalable AI<br/>Infrastructure</h3>
                        </div>
                      </div>
                    </motion.div>
                  </div>
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
