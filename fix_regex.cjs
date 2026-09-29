const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Use regex to match the exact pattern ignoring whitespace variations
const regex = /<\/div>\s*<\/motion\.div>\s*<\/motion\.div>\s*<\/div>\s*\}\)/;
const replacement = `                  </div>\n                </motion.div>\n              </div>\n            )}`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Fixed successfully!");
} else {
  console.log("Regex did not match.");
}
