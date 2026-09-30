const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// The original 5 blocks that we need to reorder
let oldBlock = `const CHARACTER_SIMULATION_STEPS = [
  {
    step: 1,
    char: "Searching...",
    matchesCount: "Manual Extraction",
    elapsed: "00:00s",
    shiftsCount: 1,
    alertText: "Customers wait on hold while agents search manually.",
    badgeClass: "bg-red-500/30 text-red-300 border-red-500/60 animate-pulse",
    problemTitle: "Manual Searching Causes Delays",
    problemIcon: <Timer className="w-10 h-10 md:w-12 md:h-12 text-rose-500 drop-shadow-md" />,
    rows: [
      { name: "Package: Unlimited 10", dept: "Details", ext: "Rs.4490", status: "Finally found" },
      { name: "Customer Mood", dept: "Call Status", ext: "Frustrated", status: "Negative" },
      { name: "Agent Stress", dept: "Metrics", ext: "High", status: "Cognitive load" },
      { name: "AHT Target", dept: "Metrics", ext: "Breached", status: "KPI failed" }
    ]
  },
  {
    step: 2,
    char: "TRAINING",
    matchesCount: "Onboarding",
    elapsed: "00:08s",
    shiftsCount: 2,
    alertText: "New staff take too long to learn the complex systems.",
    badgeClass: "bg-purple-500/30 text-purple-300 border-purple-500/60",
    problemTitle: "Long Training Time",
    problemIcon: <Users className="w-10 h-10 md:w-12 md:h-12 text-purple-400 drop-shadow-md" />,
    rows: [
      { name: "Learning Curve", dept: "Complexity", ext: "Steep", status: "Hard to master" },
      { name: "Time to Floor", dept: "HR Metric", ext: "Delayed", status: "Slow deployment" },
      { name: "System Knowledge", dept: "Requirement", ext: "High", status: "Too many portals" },
      { name: "Training Cost", dept: "Finance", ext: "Increased", status: "Resource heavy" }
    ]
  },
  {
    step: 3,
    char: "F",
    matchesCount: "2,150 matches",
    elapsed: "00:15s",
    shiftsCount: 3,
    alertText: "Searching gives too many irrelevant results.",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    problemTitle: "Too Many Search Results",
    problemIcon: <Search className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Fibre Unlimited", dept: "Marketing Details", ext: "Doc", status: "Not what I want" },
      { name: "Fibre Unlimited", dept: "Technical Specs", ext: "PDF", status: "Too detailed" },
      { name: "Fibre Unlimited", dept: "Legal T&C", ext: "Docx", status: "Irrelevant" },
      { name: "Fibre Unlimited", dept: "Pricing 2024", ext: "XLS", status: "Looking for 2025" },
      { name: "Fibre Unlimited", dept: "Old Promotions", ext: "Archive", status: "Outdated" },
      { name: "Fibre Unlimited", dept: "Customer FAQs", ext: "Web", status: "Not product info" },
      { name: "Fibre Unlimited", dept: "Billing Codes", ext: "Sys", status: "Wrong section" },
      { name: "Fibre Unlimited", dept: "Support Wiki", ext: "Wiki", status: "General info" }
    ]
  },
  {
    step: 4,
    char: "Fibre",
    matchesCount: "430 matches",
    elapsed: "00:25s",
    shiftsCount: 4,
    alertText: "Agents waste time filtering through categories.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Hard to Find Exact Details",
    problemIcon: <Layers className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Fibre New Connections", dept: "Sales", ext: "9001", status: "General line" },
      { name: "Fibre Unlimited Packages", dept: "Products", ext: "Data...", status: "Click to open" },
      { name: "Fibre Faults (Kandy)", dept: "Support", ext: "6109", status: "Wrong branch" },
      { name: "Fibre Promotions 2025", dept: "Marketing", ext: "2201", status: "Outdated" }
    ]
  },
  {
    step: 5,
    char: "Fibre Unl...",
    matchesCount: "12 Documents",
    elapsed: "00:35s",
    shiftsCount: 5,
    alertText: "Agents must read multiple PDFs to find one price.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Data is Scattered Everywhere",
    problemIcon: <Eye className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Unlimited_10_Specs.pdf", dept: "Knowledge Base", ext: "View", status: "Reading..." },
      { name: "Unlimited_25_Pricing.xls", dept: "Knowledge Base", ext: "View", status: "Not opened" },
      { name: "Fibre_TandC.docx", dept: "Legal", ext: "View", status: "Irrelevant" },
      { name: "Old_Packages_Archive", dept: "Archive", ext: "View", status: "Risk of wrong info" }
    ]
  }`;

let newBlock = `const CHARACTER_SIMULATION_STEPS = [
  {
    step: 1,
    char: "Searching...",
    matchesCount: "Manual Extraction",
    elapsed: "00:00s",
    shiftsCount: 1,
    alertText: "Customers wait on hold while agents search manually.",
    badgeClass: "bg-red-500/30 text-red-300 border-red-500/60 animate-pulse",
    problemTitle: "Manual Searching Causes Delays",
    problemIcon: <Timer className="w-10 h-10 md:w-12 md:h-12 text-rose-500 drop-shadow-md" />,
    rows: [
      { name: "Package: Unlimited 10", dept: "Details", ext: "Rs.4490", status: "Finally found" },
      { name: "Customer Mood", dept: "Call Status", ext: "Frustrated", status: "Negative" },
      { name: "Agent Stress", dept: "Metrics", ext: "High", status: "Cognitive load" },
      { name: "AHT Target", dept: "Metrics", ext: "Breached", status: "KPI failed" }
    ]
  },
  {
    step: 2,
    char: "F",
    matchesCount: "2,150 matches",
    elapsed: "00:08s",
    shiftsCount: 2,
    alertText: "Searching gives too many irrelevant results.",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    problemTitle: "Too Many Search Results",
    problemIcon: <Search className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Fibre Unlimited", dept: "Marketing Details", ext: "Doc", status: "Not what I want" },
      { name: "Fibre Unlimited", dept: "Technical Specs", ext: "PDF", status: "Too detailed" },
      { name: "Fibre Unlimited", dept: "Legal T&C", ext: "Docx", status: "Irrelevant" },
      { name: "Fibre Unlimited", dept: "Pricing 2024", ext: "XLS", status: "Looking for 2025" },
      { name: "Fibre Unlimited", dept: "Old Promotions", ext: "Archive", status: "Outdated" },
      { name: "Fibre Unlimited", dept: "Customer FAQs", ext: "Web", status: "Not product info" },
      { name: "Fibre Unlimited", dept: "Billing Codes", ext: "Sys", status: "Wrong section" },
      { name: "Fibre Unlimited", dept: "Support Wiki", ext: "Wiki", status: "General info" }
    ]
  },
  {
    step: 3,
    char: "Fibre",
    matchesCount: "430 matches",
    elapsed: "00:15s",
    shiftsCount: 3,
    alertText: "Agents waste time filtering through categories.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Hard to Find Exact Details",
    problemIcon: <Layers className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Fibre New Connections", dept: "Sales", ext: "9001", status: "General line" },
      { name: "Fibre Unlimited Packages", dept: "Products", ext: "Data...", status: "Click to open" },
      { name: "Fibre Faults (Kandy)", dept: "Support", ext: "6109", status: "Wrong branch" },
      { name: "Fibre Promotions 2025", dept: "Marketing", ext: "2201", status: "Outdated" }
    ]
  },
  {
    step: 4,
    char: "Fibre Unl...",
    matchesCount: "12 Documents",
    elapsed: "00:25s",
    shiftsCount: 4,
    alertText: "Agents must read multiple PDFs to find one price.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Data is Scattered Everywhere",
    problemIcon: <Eye className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Unlimited_10_Specs.pdf", dept: "Knowledge Base", ext: "View", status: "Reading..." },
      { name: "Unlimited_25_Pricing.xls", dept: "Knowledge Base", ext: "View", status: "Not opened" },
      { name: "Fibre_TandC.docx", dept: "Legal", ext: "View", status: "Irrelevant" },
      { name: "Old_Packages_Archive", dept: "Archive", ext: "View", status: "Risk of wrong info" }
    ]
  },
  {
    step: 5,
    char: "TRAINING",
    matchesCount: "Onboarding",
    elapsed: "00:35s",
    shiftsCount: 5,
    alertText: "New staff take too long to learn the complex systems.",
    badgeClass: "bg-purple-500/30 text-purple-300 border-purple-500/60",
    problemTitle: "Long Training Time",
    problemIcon: <Users className="w-10 h-10 md:w-12 md:h-12 text-purple-400 drop-shadow-md" />,
    rows: [
      { name: "Learning Curve", dept: "Complexity", ext: "Steep", status: "Hard to master" },
      { name: "Time to Floor", dept: "HR Metric", ext: "Delayed", status: "Slow deployment" },
      { name: "System Knowledge", dept: "Requirement", ext: "High", status: "Too many portals" },
      { name: "Training Cost", dept: "Finance", ext: "Increased", status: "Resource heavy" }
    ]
  }`;

let crlfOldBlock = oldBlock.split('\n').join('\r\n');
let lfOldBlock = oldBlock;

if (code.includes(crlfOldBlock)) {
    code = code.replace(crlfOldBlock, newBlock.split('\n').join('\r\n'));
    console.log('Replaced using CRLF');
} else if (code.includes(lfOldBlock)) {
    code = code.replace(lfOldBlock, newBlock);
    console.log('Replaced using LF');
} else {
    console.error("Block not found! It might have been modified by prettier or something else.");
}

fs.writeFileSync('src/App.tsx', code);
