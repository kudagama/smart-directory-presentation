const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the array on the left pane (around line 1136)
const leftPaneRegex = /\{\[\s*"Lengthy training periods for new officers",\s*"Delays customer issue resolution",\s*"Reduces employee productivity",\s*"Increases Average Handling Time \(AHT\)",\s*"Frustration during urgent contact lookup",\s*"Costly delays due to incorrect fault reporting"\s*\]\.map/m;
const leftPaneReplacement = `{[
                                  "Long training time for new agents",
                                  "Delays in solving customer issues",
                                  "Low employee productivity",
                                  "High Average Handling Time (AHT)",
                                  "Agent and customer frustration",
                                  "Wasted budget on wrong fault entries"
                                ].map`;
if (leftPaneRegex.test(code)) {
  code = code.replace(leftPaneRegex, leftPaneReplacement);
} else {
  console.log("Left pane regex failed");
}

// Replace step 1
code = code.replace('alertText: "New officers require extensive time to learn scattered systems."', 'alertText: "New staff take too long to learn the complex systems."');
code = code.replace('problemTitle: "Lengthy training periods for new officers"', 'problemTitle: "Long Training Time"');

// Replace step 2
code = code.replace('alertText: "System fetches all records starting with F."', 'alertText: "Searching gives too many irrelevant results."');
code = code.replace('problemTitle: "Broad queries return too much unstructured data"', 'problemTitle: "Too Much Useless Data"');

// Replace step 3
code = code.replace('alertText: "Still too many categories. Agent must filter manually."', 'alertText: "Agents waste time filtering through categories."');
code = code.replace('problemTitle: "Agent struggles to locate exact product details"', 'problemTitle: "Hard to Find Exact Details"');

// Replace step 4
code = code.replace('alertText: "Agent opens multiple documents to find the price."', 'alertText: "Agents must read multiple PDFs to find one price."');
code = code.replace('problemTitle: "Scattered data requires reading through documents"', 'problemTitle: "Data is Scattered Everywhere"');

// Replace step 5
code = code.replace('alertText: "Customer has been waiting on hold for almost a minute."', 'alertText: "Customers wait on hold while agents search manually."');
code = code.replace('problemTitle: "Manual data retrieval causes severe delays"', 'problemTitle: "Manual Searching Causes Delays"');

// Replace step 6
code = code.replace('alertText: "Incorrect fault entries create chain reactions of operational costs."', 'alertText: "Wrong entries lead to wasted money and extra work."');
code = code.replace('problemTitle: "Incorrect fault reporting wastes time and budget"', 'problemTitle: "Costly Mistakes (Wrong Fault Entries)"');

fs.writeFileSync('src/App.tsx', code);
console.log("Replaced text with Simple English successfully!");
