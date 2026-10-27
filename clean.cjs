const fs = require('fs');

const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const newLines = [...lines.slice(0, 351), ...lines.slice(932)];

fs.writeFileSync('src/App.tsx', newLines.join('\n'));
console.log("Cleanup done!");
