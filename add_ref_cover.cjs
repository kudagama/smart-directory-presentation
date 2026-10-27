const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /(<\/motion\.div>\s*)(<\/div>\s*\}\)\s*\{\/\* ===+ \*\/\}\s*\{\/\* SLIDE 1)/;

const replacement = `$1
                <motion.div
                  variants={staggerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.4 }}
                  className="mt-auto mb-4"
                >
                  <p className="text-xs md:text-sm text-slate-500 font-mono tracking-widest uppercase bg-white/5 px-4 py-1.5 rounded-md border border-white/10 shadow-sm backdrop-blur-sm">
                    Ref: ISP/S/2026/40/179
                  </p>
                </motion.div>
              $2`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Successfully added reference number to Cover slide!");
} else {
  console.log("Regex failed");
}
