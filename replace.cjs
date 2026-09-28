const fs = require('fs');

const path = 'd:/PROJECTS/smart-directory-presentation/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replacements
content = content.replace(/Smart <span className="text-gradient">Directory<\/span>/g, 'Smart <span className="text-gradient">PEARL<\/span>');
content = content.replace(/Smart Directory <span className="text-gradient">in Action<\/span>/g, 'Smart PEARL <span className="text-gradient">in Action<\/span>');
content = content.replace(/SLT Innovation Pitch 2026 • Enterprise Directory/g, 'SLT Innovation Pitch 2026 • Enterprise Copilot');
content = content.replace(/<span className="text-corpCyan text-3xl md:text-4xl lg:text-5xl block -mb-2 tracking-widest font-extrabold uppercase drop-shadow-none">Project<\/span>\s*Smart Directory/g, '<span className="text-corpCyan text-3xl md:text-4xl lg:text-5xl block -mb-2 tracking-widest font-extrabold uppercase drop-shadow-none">Enterprise Copilot<\/span>\n                  Smart PEARL');

fs.writeFileSync(path, content);

const htmlPath = 'd:/PROJECTS/smart-directory-presentation/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/Smart Directory AI/g, 'Smart PEARL Enterprise Copilot');
fs.writeFileSync(htmlPath, html);

console.log('Update successful');
