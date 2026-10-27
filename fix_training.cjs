const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\/\* Orbiting Training Data Nodes \*\/\}[\s\S]*?<\/div>\n      <\/div>/;

const replacement = `{/* Orbiting Training Data Nodes */}
           {s.rows && s.rows.map((row: any, i: number) => {
             const angle = (i / s.rows.length) * Math.PI * 2;
             const radiusX = 190;
             const radiusY = 120;
             return (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0 }}
                 animate={{ 
                   opacity: 1, 
                   scale: 1, 
                   x: [Math.cos(angle) * radiusX, Math.cos(angle + 0.1) * radiusX, Math.cos(angle) * radiusX],
                   y: [Math.sin(angle) * radiusY, Math.sin(angle + 0.1) * radiusY, Math.sin(angle) * radiusY],
                   z: Math.sin(angle) * 80
                 }}
                 transition={{ type: "spring", bounce: 0.4, delay: i * 0.15, x: { duration: 4, repeat: Infinity, ease: "easeInOut" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                 className="absolute p-3 rounded-xl border border-purple-500/40 bg-purple-950/70 backdrop-blur-xl flex flex-col items-center gap-1 w-32 md:w-36 shadow-2xl"
               >
                  <div className="text-[9px] uppercase tracking-widest font-bold text-purple-400 text-center">
                    {row.name}
                  </div>
                  <div className="text-[10px] md:text-xs font-black text-white leading-tight">
                    {row.ext}
                  </div>
               </motion.div>
             );
           })}
        </div>
      </div>`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Successfully fixed TrainingAnimation layout!");
} else {
  console.log("Regex didn't match.");
}
