const fs = require('fs');
const path = 'd:/PROJECTS/smart-directory-presentation/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const startMarker = '{currentSlide === 4 && (';
const endMarker = '{/* SLIDE 5: ARCHITECTURE';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const before = content.slice(0, startIndex);
  const after = content.slice(endIndex);
  
  const newSlide4 = `{currentSlide === 4 && (
              <div className="w-full h-full rounded-2xl overflow-hidden border border-corpCyan/40 shadow-[0_0_30px_rgba(0,229,255,0.2)] bg-black/50 p-1 relative">
                <button onClick={() => window.open('http://localhost:3000', '_blank')} className="absolute top-4 right-4 z-50 bg-corpCyan text-black px-4 py-2 font-bold rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                  <span className="text-xl">🚀</span> Open Full Screen
                </button>
                <iframe src="http://localhost:3000" className="w-full h-full rounded-xl border-none" title="Smart PEARL Demo" />
              </div>
            )}
            {/* ======================================================== */}
            `;
            
  content = before + newSlide4 + after;
  fs.writeFileSync(path, content);
  console.log('Replaced slide 4 with iframe successfully');
} else {
  console.log('Markers not found');
}
