const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\[\s*"Delays customer issue resolution",\s*"Reduces employee productivity",\s*"Increases Average Handling Time \(AHT\)",\s*"Frustration during urgent contact lookup"\s*\]\.map/;

const replacement = `[
                                  "Delays customer issue resolution",
                                  "Reduces employee productivity",
                                  "Increases Average Handling Time (AHT)",
                                  "Frustration during urgent contact lookup",
                                  "Lengthy training periods for new officers",
                                  "Costly delays due to incorrect fault reporting"
                                ].map`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Replaced successfully!");
} else {
  console.log("No match found.");
}
