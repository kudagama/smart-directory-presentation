const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
const searchStr = '                  </div>\r\n                </motion.div>\r\n                </motion.div>\r\n              </div>\r\n            )}';
const replacement = '                  </div>\r\n                </motion.div>\r\n              </div>\r\n            )}';

if (code.includes(searchStr)) {
  code = code.replace(searchStr, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log('Fixed CRLF!');
} else {
  const searchStrLF = searchStr.replace(/\r\n/g, '\n');
  const replacementLF = replacement.replace(/\r\n/g, '\n');
  if (code.includes(searchStrLF)) {
    code = code.replace(searchStrLF, replacementLF);
    fs.writeFileSync('src/App.tsx', code);
    console.log('Fixed LF!');
  } else {
    console.log('Target string still not found.');
    // Let's do a more robust regex that ignores leading spaces entirely
    const regex2 = /<\/div>\s*<\/motion\.div>\s*<\/motion\.div>\s*<\/div>\s*\}\)/;
    if (regex2.test(code)) {
      code = code.replace(regex2, "</div>\n</motion.div>\n</div>\n})");
      fs.writeFileSync('src/App.tsx', code);
      console.log('Fixed with regex2!');
    }
  }
}
