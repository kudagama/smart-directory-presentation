const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\[\s*\{\s*name:\s*"Contact Centre Associates"[\s\S]*?\{\s*name:\s*"All SLT Employees"[\s\S]*?\]/m;

const replacement = `{[
                        { name: "SLT Customer Care Officers", icon: <Headphones className="w-5 h-5 md:w-8 md:h-8" />, color: "from-corpCyan/20 to-corpCyan/5", border: "border-corpCyan/30", text: "text-corpCyan", badge: "Immediate Target" },
                        { name: "SLT Internal Departments", icon: <Users className="w-5 h-5 md:w-8 md:h-8" />, color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-400", badge: "Internal Expansion" },
                        { name: "B2B Enterprise Clients", icon: <Building2 className="w-5 h-5 md:w-8 md:h-8" />, color: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/30", text: "text-amber-400", badge: "Productization" },
                        { name: "Any Global Organization", icon: <Rocket className="w-5 h-5 md:w-8 md:h-8" />, color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/30", text: "text-purple-400", badge: "Future SaaS Model" }
                      ]`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  
  // Need to update the map rendering to use the new 'badge' property and adjust sizing since we only have 4 cards now
  const renderRegex = /<div className=\{`w-10 h-10 rounded-full bg-black\/40 flex items-center justify-center shrink-0 border border-white\/5 \$\{user\.text\}`\}>\s*\{user\.icon\}\s*<\/div>\s*<span className="text-slate-200 font-bold text-sm md:text-base leading-tight">\{user\.name\}<\/span>/g;
  
  const renderReplacement = `<div className={\`w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/40 flex items-center justify-center shrink-0 border border-white/5 \${user.text}\`}>
                            {user.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className={\`text-[10px] font-mono uppercase tracking-widest \${user.text} mb-1 opacity-80\`}>{user.badge}</span>
                            <span className="text-white font-black text-base md:text-xl leading-tight">{user.name}</span>
                          </div>`;
                          
  code = code.replace(renderRegex, renderReplacement);
  
  fs.writeFileSync('src/App.tsx', code);
  console.log("Target Audience successfully updated!");
} else {
  console.log("Regex failed to find Target Audiences array");
}
