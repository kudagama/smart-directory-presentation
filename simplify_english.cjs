const fs = require('fs');
const path = 'd:/PROJECTS/smart-directory-presentation/src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
  // Slide Titles
  '01) Problem / Opportunity': '01) The Problem',
  '03) Business Value & Benefits': '03) Key Benefits',
  '04) Implementation Approach': '04) How We Will Build It',
  '05) Market / Customer Potential': '05) Market Potential',
  '06) Support Required & Next Steps': '06) What We Need',

  // Slide 1 - Problem
  'Traditional Search Jitter Simulation Steps': 'Old Search System Problems',
  'Search results continuously change while users type': 'Results change while typing, causing confusion',
  'UI Shift #1: Entire table updates. Massive unfiltered list.': 'Screen updates too fast. Too many results.',
  'UI Shift #2: Screen jolts! Previous names disappear, new ones flood in.': 'Screen jumps! Hard to read the names.',
  'Similar names generate multiple results, flooding the view': 'Too many similar names make it hard to choose',
  'UI Shift #3: List jumps again! Agent loses previously spotted row.': 'Screen jumps again! Agent loses track.',
  'Difficult to identify the correct contact quickly due to UI jitter': 'Hard to find the right person quickly',
  'CRITICAL OVERLOAD: 48 similar names! Zero context on responsible personnel.': 'Too many similar names! Hard to find the correct person.',
  'Time wasted searching for personnel, increasing overall AHT': 'Searching takes too much time, making customers wait',
  'SYSTEM INEFFICIENCY: Manual search delays impact core business metrics.': 'Manual searching wastes time and hurts business.',
  'Agent Cognitive Overload — Brain Under Siege': 'Agent is confused and stressed',
  
  // Slide - Animation
  'Voice Inbound': 'Incoming Call',
  'Headset Audio Stream': 'Listening to Customer',
  'Embedded Softphone': 'System Processing',
  'Core Telephony Processing': 'Audio Processing',
  "Voice decoded inside agent's system...": 'System hears the voice...',
  'Intent Extracted': 'Understanding Customer',
  'Bio-Digital Intelligence': 'AI Processing',
  'Zero manual typing required • Product data fetched': 'No typing needed • AI gets the data',
  'Zero manual typing required • Query synthesized': 'No typing needed • AI finds the answer',
  'Zero-Click HUD': 'Instant Answer',
  'Instant Resolution': 'Problem Solved',
  "Product pricing delivered right to agent's visual field!": 'Answer is shown directly on screen!',
  "Contact delivered right to agent's visual field!": 'Answer is shown directly on screen!',

  // Other jargon
  'Conversational Interface Output': 'AI Search Results',
  'Unified Search Across People, Departments, Locations & Organizations': 'Search for People, Departments, or Products all in one place',
  'Eliminates character-by-character search hassle': 'No more slow manual typing',
  'users speak or type natural questions and receive single, verified contact cards in 0.8s': 'Just speak or type naturally to get the exact answer instantly',
  'Directory & Product Copilot': 'Smart AI Assistant'
};

for (const [oldText, newText] of Object.entries(replacements)) {
  content = content.split(oldText).join(newText);
}

fs.writeFileSync(path, content);
console.log('Simple English replacements completed');
