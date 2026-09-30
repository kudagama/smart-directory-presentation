const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the condition for Live Bot Demo from 5 to 6
// And for How We Will Build It from 6 to 5

// We can uniquely identify them:
// 1. Live Interactive Demo
let demoMatch = code.indexOf('{currentSlide === 5 && (\\n              <div className="w-full h-full rounded-2xl');
if (demoMatch === -1) demoMatch = code.indexOf('{currentSlide === 5 && (\\r\\n              <div className="w-full h-full rounded-2xl');

// 2. Architecture / Rollout
let archMatch = code.indexOf('{currentSlide === 6 && (\\n              <div className="flex flex-col h-full');
if (archMatch === -1) archMatch = code.indexOf('{currentSlide === 6 && (\\r\\n              <div className="flex flex-col h-full');

if (code.includes('currentSlide === 5') && code.includes('currentSlide === 6')) {
    // Swap 5 and 6
    code = code.replace(/\{currentSlide === 5 && \(/g, '{currentSlide === TEMP && (');
    code = code.replace(/\{currentSlide === 6 && \(/g, '{currentSlide === 5 && (');
    code = code.replace(/\{currentSlide === TEMP && \(/g, '{currentSlide === 6 && (');

    // Swap the comments if they exist
    code = code.replace('SLIDE 5: LIVE INTERACTIVE AI BOT DEMO', 'SLIDE 6: LIVE INTERACTIVE AI BOT DEMO');
    code = code.replace('SLIDE 6: ARCHITECTURE & ROLLOUT ROADMAP', 'SLIDE 5: ARCHITECTURE & ROLLOUT ROADMAP');
}

fs.writeFileSync('src/App.tsx', code);
console.log('Swapped correctly!');
