const fs = require('fs');
const path = 'd:/PROJECTS/smart-directory-presentation/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldHeading = 'Smart PEARL <br /><span className="text-gradient">Transformation</span>';
const newHeading = 'Thank <span className="text-gradient">You!</span>';

content = content.replace(oldHeading, newHeading);
fs.writeFileSync(path, content);
console.log('Replaced heading with Thank You');
