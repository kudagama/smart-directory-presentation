const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace SLIDES array
const oldSlides = `const SLIDES = [
  { id: 0, title: "Overview", tag: "Cover" },
  { id: 1, title: "01) The Problem", tag: "01" },
  { id: 2, title: "02) Proposed Solution", tag: "02" },
  { id: 3, title: "03) Key Benefits", tag: "03" },
  { id: 4, title: "Live Bot Demo", tag: "Demo" },
  { id: 5, title: "04) How We Will Build It", tag: "04" },
  { id: 6, title: "05) Market Potential", tag: "05" },
  { id: 7, title: "06) What We Need", tag: "06" },
  { id: 8, title: "Thank You", tag: "Thank You" }
];`;

const newSlides = `const SLIDES = [
  { id: 0, title: "Overview", icon: Activity },
  { id: 1, title: "The Problem", icon: AlertTriangle },
  { id: 2, title: "Proposed Solution", icon: Zap },
  { id: 3, title: "Key Benefits", icon: CheckCircle2 },
  { id: 4, title: "Live Bot Demo", icon: Rocket },
  { id: 5, title: "How We Will Build It", icon: Cpu },
  { id: 6, title: "Market Potential", icon: Target },
  { id: 7, title: "What We Need", icon: Layers },
  { id: 8, title: "Thank You", icon: Sparkles }
];`;

code = code.replace(oldSlides, newSlides);

// Replace Nav rendering
const oldNav = `<button
                  onClick={() => {
                    if (slide.id === 4) {
                      window.open('https://slt-smart-directory-assistant-beta.vercel.app/dashboard', '_blank');
                    } else {
                      goToSlide(i);
                    }
                  }}
                  className={\`relative flex items-center justify-center h-8 transition-all duration-300 ease-out cursor-pointer rounded-full \${isActive
                    ? 'px-4 lg:px-5 bg-gradient-to-r from-corpCyan to-blue-500 text-white shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'w-8 lg:w-10 bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/5'
                    }\`}
                >
                  <span className={\`text-[10px] lg:text-xs whitespace-nowrap \${isActive ? 'font-black tracking-wide' : 'font-bold'}\`}>
                    {isActive ? slide.title : slide.tag}
                  </span>
                </button>`;
                
const newNav = `<button
                  onClick={() => {
                    if (slide.id === 4) {
                      window.open('https://slt-smart-directory-assistant-beta.vercel.app/dashboard', '_blank');
                    } else {
                      goToSlide(i);
                    }
                  }}
                  className={\`relative flex items-center justify-center h-8 md:h-10 transition-all duration-300 ease-out cursor-pointer rounded-full gap-2 \${isActive
                    ? 'px-4 lg:px-5 bg-gradient-to-r from-corpCyan to-blue-500 text-white shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'w-8 lg:w-10 md:w-10 bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white border border-white/5'
                    }\`}
                >
                  <slide.icon className={\`\${isActive ? 'w-4 h-4 md:w-4 md:h-4' : 'w-4 h-4 md:w-5 md:h-5'}\`} />
                  {isActive && (
                    <span className="text-[10px] md:text-sm whitespace-nowrap font-black tracking-wide">
                      {slide.title}
                    </span>
                  )}
                </button>`;

code = code.replace(oldNav, newNav);

fs.writeFileSync('src/App.tsx', code);
console.log("Successfully updated top navigation!");
