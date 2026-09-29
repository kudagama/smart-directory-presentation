const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

const startString = '<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="flex flex-col flex-1 min-h-0 w-full max-w-5xl mx-auto mb-10">';
const startIndex = content.indexOf(startString);

const endString1 = '                </motion.div>\r\n              </div>\r\n            )}\r\n\r\n            {/* ======================================================== */}\r\n            {/* SLIDE 8';
const endString2 = '                </motion.div>\n              </div>\n            )}\n\n            {/* ======================================================== */}\n            {/* SLIDE 8';

let endIndex = content.indexOf(endString1);
if (endIndex === -1) endIndex = content.indexOf(endString2);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} className="flex flex-col flex-1 min-h-0 w-full max-w-6xl mx-auto mb-4">
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
                            className={\`group relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 overflow-hidden text-left border \${isActive ? 'scale-[1.02] bg-[#0A1222] shadow-2xl' : 'bg-black/20 border-white/5 hover:bg-white/5'}\`}
                            style={{ borderColor: isActive ? \`\${tab.hex}60\` : undefined }}
                          >
                            {/* Hover/Active Background Glow */}
                            <div className={\`absolute inset-0 opacity-0 transition-opacity duration-500 \${isActive ? 'opacity-20' : 'group-hover:opacity-10'}\`} style={{ background: \`linear-gradient(90deg, \${tab.hex} 0%, transparent 100%)\` }} />
                            
                            {/* Active Indicator Line */}
                            {isActive && <motion.div layoutId="activeTabLine" className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: tab.hex }} />}

                            <div className={\`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors \${isActive ? '' : 'border-white/10 bg-white/5 text-slate-400 group-hover:text-white'}\`} style={{ backgroundColor: isActive ? \`\${tab.hex}20\` : undefined, borderColor: isActive ? \`\${tab.hex}50\` : undefined, color: isActive ? tab.hex : undefined }}>
                              <Icon className={\`w-6 h-6 \${isActive ? 'animate-pulse' : ''}\`} />
                            </div>
                            
                            <div>
                              <h4 className={\`font-black tracking-wide text-sm md:text-base \${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}\`}>{tab.title}</h4>
                              <p className={\`text-xs font-mono uppercase tracking-widest mt-1 \${isActive ? '' : 'text-slate-500'}\`} style={{ color: isActive ? tab.hex : undefined }}>{tab.subtitle}</p>
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
                                 boxShadow: \`0 0 50px \${slide7StepIdx === 0 ? 'rgba(59,130,246,0.1)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.1)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.1)' : 'rgba(244,63,94,0.1)'}\`
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
                              <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                                {(
                                  slide7StepIdx === 0 ? [
                                    "Access to the existing enterprise database",
                                    "IT and Digital Services collaboration",
                                    "AI development and integration support",
                                    "System testing and deployment assistance"
                                  ] : slide7StepIdx === 1 ? [
                                    "User feedback from Contact Centre and other departments",
                                    "Stakeholder sponsorship and approval",
                                    "Cross-functional participation during pilot testing"
                                  ] : slide7StepIdx === 2 ? [
                                    "AI platform and development tools",
                                    "Enterprise data access and maintenance",
                                    "Project team for design, development, and testing"
                                  ] : [
                                    "Deploy AI Bot for every call handled by Contact Center Officers",
                                    "Fault Reporting Integration (Zero-touch CX)",
                                    "Knowledge Hub Integration",
                                    "Billing & Troubleshooting AI Agent"
                                  ]
                                ).map((item, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="group/item relative flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-default overflow-hidden"
                                  >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg border"
                                         style={{ 
                                           backgroundColor: slide7StepIdx === 0 ? 'rgba(59,130,246,0.1)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.1)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.1)' : 'rgba(244,63,94,0.1)',
                                           borderColor: slide7StepIdx === 0 ? 'rgba(59,130,246,0.3)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.3)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.3)' : 'rgba(244,63,94,0.3)',
                                         }}>
                                      <span className="text-xs font-black font-mono" style={{ color: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}>0{i+1}</span>
                                    </div>
                                    <span className="text-sm md:text-base font-semibold text-slate-300 group-hover/item:text-white transition-colors">{item}</span>
                                    
                                    {/* Animated scanline on hover */}
                                    <div className="absolute left-0 w-1 h-full opacity-0 group-hover/item:opacity-100 transition-opacity scale-y-0 group-hover/item:scale-y-100 origin-top duration-300"
                                         style={{ backgroundColor: slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e' }}></div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                  </div>
                </motion.div>
`;
  const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
  fs.writeFileSync(file, newContent);
  console.log("Replacement success!");
} else {
  console.log("Indices not found:", startIndex, endIndex);
}
