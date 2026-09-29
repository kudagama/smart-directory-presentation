const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const call2Regex = /const CALL_2_STAGES = \[[\s\S]*?\];/g;
code = code.replace(call2Regex, '');

fs.writeFileSync('src/App.tsx', code);
console.log("Removed CALL_2_STAGES");
