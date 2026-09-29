const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const call1Regex = /const CALL_1_STAGES = \[[\s\S]*?\];/g;
code = code.replace(call1Regex, '');

fs.writeFileSync('src/App.tsx', code);
console.log("Removed CALL_1_STAGES");
