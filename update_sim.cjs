const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /const CHARACTER_SIMULATION_STEPS = \[([\s\S]*?)isWhyItMatters: true\r?\n\s*\}\r?\n\];/;

const newArray = `const CHARACTER_SIMULATION_STEPS = [
  {
    step: 1,
    char: "F",
    matchesCount: "2,150 matches",
    elapsed: "00:08s",
    shiftsCount: 1,
    alertText: "System fetches all records starting with F.",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    problemTitle: "Broad queries return too much unstructured data",
    problemIcon: <Search className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Finance Division", dept: "Corporate", ext: "1102", status: "Not relevant" },
      { name: "Fault Reporting Unit", dept: "Customer Care", ext: "5421", status: "Wrong category" },
      { name: "Fibre Deployments", dept: "Engineering", ext: "4120", status: "Not product info" },
      { name: "Fernando, P.K.", dept: "HR Division", ext: "3310", status: "Person, not product" }
    ]
  },
  {
    step: 2,
    char: "Fibre",
    matchesCount: "430 matches",
    elapsed: "00:18s",
    shiftsCount: 2,
    alertText: "Still too many categories. Agent must filter manually.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Agent struggles to locate exact product details",
    problemIcon: <Layers className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Fibre New Connections", dept: "Sales", ext: "9001", status: "General line" },
      { name: "Fibre Unlimited Packages", dept: "Products", ext: "Data...", status: "Click to open" },
      { name: "Fibre Faults (Kandy)", dept: "Support", ext: "6109", status: "Wrong branch" },
      { name: "Fibre Promotions 2025", dept: "Marketing", ext: "2201", status: "Outdated" }
    ]
  },
  {
    step: 3,
    char: "Fibre Unl...",
    matchesCount: "12 Documents",
    elapsed: "00:29s",
    shiftsCount: 3,
    alertText: "Agent opens multiple documents to find the price.",
    badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    problemTitle: "Scattered data requires reading through documents",
    problemIcon: <Eye className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Unlimited_10_Specs.pdf", dept: "Knowledge Base", ext: "View", status: "Reading..." },
      { name: "Unlimited_25_Pricing.xls", dept: "Knowledge Base", ext: "View", status: "Not opened" },
      { name: "Fibre_TandC.docx", dept: "Legal", ext: "View", status: "Irrelevant" },
      { name: "Old_Packages_Archive", dept: "Archive", ext: "View", status: "Risk of wrong info" }
    ]
  },
  {
    step: 4,
    char: "Found Price",
    matchesCount: "Manual Extraction",
    elapsed: "00:48s",
    shiftsCount: 4,
    alertText: "Customer has been waiting on hold for almost a minute.",
    badgeClass: "bg-red-500/30 text-red-300 border-red-500/60 animate-pulse",
    problemTitle: "Manual data retrieval causes severe delays",
    problemIcon: <Timer className="w-10 h-10 md:w-12 md:h-12 text-rose-500 drop-shadow-md" />,
    rows: [
      { name: "Package: Unlimited 10", dept: "Details", ext: "Rs.4490", status: "Finally found" },
      { name: "Customer Mood", dept: "Call Status", ext: "Frustrated", status: "Negative" },
      { name: "Agent Stress", dept: "Metrics", ext: "High", status: "Cognitive load" },
      { name: "AHT Target", dept: "Metrics", ext: "Breached", status: "KPI failed" }
    ]
  },
  {
    step: 5,
    char: "OVERLOAD",
    matchesCount: "Officer Burnout",
    elapsed: "01:05s",
    shiftsCount: 5,
    alertText: "Lack of initial support leads to high search times and burnout.",
    badgeClass: "bg-amber-500/30 text-amber-300 border-amber-500/60",
    problemTitle: "Officers face burnout and lengthy training periods",
    problemIcon: <Activity className="w-10 h-10 md:w-12 md:h-12 text-amber-500 drop-shadow-md" />,
    rows: [
      { name: "Data Search Effort", dept: "Workload", ext: "Too High", status: "Agent exhausted" },
      { name: "Initial Guidance", dept: "Support", ext: "Minimal", status: "Struggling alone" },
      { name: "Training Period", dept: "HR Metric", ext: "Very Long", status: "Slow onboarding" },
      { name: "Turnover Risk", dept: "HR Metric", ext: "High", status: "Due to frustration" }
    ]
  },
  {
    step: 6,
    char: "ERRORS",
    matchesCount: "Costly Mistakes",
    elapsed: "01:15s",
    shiftsCount: 6,
    alertText: "Incorrect fault entries create chain reactions of operational costs.",
    badgeClass: "bg-red-600/30 text-red-200 border-red-500/60 animate-pulse",
    problemTitle: "Incorrect fault reporting wastes time and budget",
    problemIcon: <AlertTriangle className="w-10 h-10 md:w-12 md:h-12 text-red-500 drop-shadow-md" />,
    rows: [
      { name: "Fault Entry", dept: "Accuracy", ext: "Incorrect", status: "Due to rushed call" },
      { name: "Resolution Time", dept: "Customer", ext: "Delayed", status: "Frustrated client" },
      { name: "Operational Cost", dept: "Finance", ext: "Increased", status: "Wasted truck roll" },
      { name: "Correction Task", dept: "Resources", ext: "Extra Officer", status: "Needed to fix error" }
    ]
  },
  {
    step: 7,
    char: "IMPACT",
    matchesCount: "Business Impact",
    elapsed: "01:20s",
    shiftsCount: 7,
    alertText: "Traditional systems waste time and hurt business.",
    badgeClass: "bg-corpCyan/20 text-corpCyan border-corpCyan/40 animate-pulse",
    problemTitle: "Why It Matters",
    problemIcon: <Clock className="w-10 h-10 md:w-12 md:h-12 text-corpCyan drop-shadow-md" />,
    rows: [
      { name: "Delays customer issue resolution", dept: "Customer Experience", ext: "KPI", status: "Impact" },
      { name: "Reduces employee productivity", dept: "Operations", ext: "KPI", status: "Impact" },
      { name: "Increases Average Handling Time", dept: "Support", ext: "KPI", status: "Impact" },
      { name: "Frustration in urgent queries", dept: "User Experience", ext: "KPI", status: "Impact" }
    ],
    isWhyItMatters: true
  }
];`;

if (regex.test(code)) {
  code = code.replace(regex, newArray);
  fs.writeFileSync('src/App.tsx', code);
  console.log("Replaced simulation array successfully!");
} else {
  console.log("Could not find the array using regex.");
}
