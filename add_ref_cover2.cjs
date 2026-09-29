const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-corpCyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                </motion.div>


              </div>
            )}`;
            
const replacement = `                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-corpCyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4 }}
                  className="mt-auto mb-8 relative z-10"
                >
                  <p className="text-xs md:text-sm text-slate-500 font-mono tracking-widest uppercase bg-white/5 px-4 py-1.5 rounded-md border border-white/10 shadow-sm backdrop-blur-sm inline-block">
                    Ref: ISP/S/2026/40/179
                  </p>
                </motion.div>

              </div>
            )}`;

code = code.replace(targetStr, replacement);
fs.writeFileSync('src/App.tsx', code);
console.log("Successfully added reference number to Cover slide!");
