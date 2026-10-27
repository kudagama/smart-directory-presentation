const fs = require('fs');

const path = 'd:/PROJECTS/smart-directory-presentation/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');
let oldContent = content;

// Use precise replacements without Regex flags that might fail
content = content.split('Smart <span className="text-gradient">Directory</span>').join('Smart <span className="text-gradient">PEARL</span>');
content = content.split('Smart Directory <span className="text-gradient">in Action</span>').join('Smart PEARL <span className="text-gradient">in Action</span>');
content = content.split('Enterprise Directory').join('Enterprise Copilot');
content = content.split('Smart Directory').join('Smart PEARL');
content = content.split('>Project<').join('>Enterprise Copilot<');

fs.writeFileSync(path, content);
console.log('Changes made:', content !== oldContent);
