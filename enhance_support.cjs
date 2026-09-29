const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\(\s*slide7StepIdx === 0 \? \[\s*"Access to the existing enterprise database"[\s\S]*?<\span className="text-sm md:text-base font-bold text-slate-300 group-hover\/item:text-white transition-colors relative z-10">\{item\}<\/span>\s*<\/motion\.div>\s*\)\)\}/m;

const replacement = `{(
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
                                    className={\`group/item relative flex flex-row items-center gap-4 bg-black/40 p-5 rounded-2xl border border-white/10 hover:border-white/40 transition-all cursor-default overflow-hidden hover:-translate-y-1 \${arr.length === 3 && i === 2 ? 'md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto' : ''}\`}
                                    style={{
                                      boxShadow: \`0 8px 30px \${slide7StepIdx === 0 ? 'rgba(59,130,246,0.05)' : slide7StepIdx === 1 ? 'rgba(16,185,129,0.05)' : slide7StepIdx === 2 ? 'rgba(0,229,255,0.05)' : 'rgba(244,63,94,0.05)'}\`
                                    }}
                                  >
                                    {/* Animated Background Gradient on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover/item:opacity-20 transition-opacity duration-500"
                                         style={{ background: \`radial-gradient(circle at left, \${slide7StepIdx === 0 ? '#3b82f6' : slide7StepIdx === 1 ? '#10b981' : slide7StepIdx === 2 ? '#00e5ff' : '#f43f5e'} 0%, transparent 60%)\` }}></div>
                                         
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
                                )})}`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Successfully enhanced Support Required UI!");
} else {
  console.log("Regex failed");
}
