const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/Too Much Useless Data/g, 'Too Many Search Results');
fs.writeFileSync('src/App.tsx', code);
console.log("Updated wording!");
