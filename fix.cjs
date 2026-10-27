const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace('                </motion.div>\r\n                </motion.div>\r\n              </div>', '                </motion.div>\r\n              </div>');
code = code.replace('                </motion.div>\n                </motion.div>\n              </div>', '                </motion.div>\n              </div>');
fs.writeFileSync('src/App.tsx', code);
