const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = '{/* SLIDE 1: 01) PROBLEM / OPPORTUNITY';
const startIndex = code.indexOf(targetStr);

if (startIndex !== -1) {
  // Find the exact place to insert before the SLIDE 1 block starts
  // Usually there's a </div> } ) block before it.
  
  // We'll insert it right after the Team Members list motion.div ends.
  const teamEnd = code.lastIndexOf('</motion.div>', startIndex);
  
  if (teamEnd !== -1) {
    const insertString = `
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4 }}
                  className="mt-8 mb-4 relative z-10"
                >
                  <p className="text-xs md:text-sm text-slate-500 font-mono tracking-widest uppercase bg-white/5 px-4 py-1.5 rounded-md border border-white/10 shadow-sm backdrop-blur-sm inline-block">
                    Ref: ISP/S/2026/40/179
                  </p>
                </motion.div>
    `;
    
    code = code.substring(0, teamEnd + 13) + insertString + code.substring(teamEnd + 13);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Successfully added Reference to Cover!");
  } else {
    console.log("Team end not found");
  }
} else {
  console.log("Slide 1 target not found");
}
