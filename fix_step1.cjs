const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /\{\s*step: 1,\s*char: "OVERLOAD",[\s\S]*?\}\n    \]\s*\}/;
const replacement = `{
    step: 1,
    char: "TRAINING",
    matchesCount: "Onboarding",
    elapsed: "00:00s",
    shiftsCount: 1,
    alertText: "New officers require extensive time to learn scattered systems.",
    badgeClass: "bg-purple-500/30 text-purple-300 border-purple-500/60",
    problemTitle: "Lengthy training periods for new officers",
    problemIcon: <Users className="w-10 h-10 md:w-12 md:h-12 text-purple-400 drop-shadow-md" />,
    rows: [
      { name: "Learning Curve", dept: "Complexity", ext: "Steep", status: "Hard to master" },
      { name: "Time to Floor", dept: "HR Metric", ext: "Delayed", status: "Slow deployment" },
      { name: "System Knowledge", dept: "Requirement", ext: "High", status: "Too many portals" },
      { name: "Training Cost", dept: "Finance", ext: "Increased", status: "Resource heavy" }
    ]
  }`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Successfully replaced step 1!");
} else {
  console.log("Regex didn't match.");
}
