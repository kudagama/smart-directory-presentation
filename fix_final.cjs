const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

let before = code.length;
// Try to replace two consecutive </motion.div> with one, if they are followed by </div>
code = code.replace(/<\/motion\.div>(\r?\n\s*)<\/motion\.div>(\r?\n\s*)<\/div>(\r?\n\s*)\}\)/, '</motion.div>$2</div>$3})');

let after = code.length;
if (before !== after) {
  fs.writeFileSync('src/App.tsx', code);
  console.log("Replaced using regex!");
} else {
  console.log("No match found.");
}
